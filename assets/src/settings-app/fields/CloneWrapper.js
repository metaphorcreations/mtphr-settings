import he from "he";
import classNames from "classnames";
import { useState, useCallback, useId } from "@wordpress/element";
import {
  BaseControl,
  Button,
  Card,
  CardBody,
  useBaseControlProps,
  __experimentalHStack as HStack,
} from "@wordpress/components";
import { plus, trash, dragHandle } from "@wordpress/icons";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

const { getComponent } = window.mtphrSettingsRegistry || {};

const SortableCloneItem = ({
  itemId,
  itemValue,
  index,
  canRemove,
  sortable,
  onRemove,
  onChangeItem,
  field,
  settingsOption,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
    zIndex: isDragging ? 10 : "auto",
  };

  const Component = getComponent(field.type);
  const strippedField = { ...field, label: null, help: null, id: field.id };

  const handleChange = (data) => {
    onChangeItem(index, data.value);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <HStack alignment="center" spacing={1}>
        {sortable && (
          <Button
            ref={setActivatorNodeRef}
            icon={dragHandle}
            label="Drag to reorder"
            size="small"
            style={{ cursor: "grab", flexShrink: 0 }}
            {...attributes}
            {...listeners}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {Component && (
            <Component
              field={strippedField}
              value={itemValue}
              onChange={handleChange}
              settingsOption={settingsOption}
            />
          )}
        </div>
        <Button
          icon={trash}
          label="Remove"
          size="small"
          isDestructive
          disabled={!canRemove}
          onClick={() => onRemove(index)}
          style={{ flexShrink: 0 }}
        />
      </HStack>
    </div>
  );
};

const CloneWrapper = ({ field, value, settingsOption, onChange }) => {
  const {
    id,
    label,
    help,
    clone_default: cloneDefault = "",
    sort_clone: sortClone = true,
    min_clone: minClone = 0,
    max_clone: maxClone = Infinity,
    add_button: addButton,
  } = field;

  const dndId = useId();
  // Stable key for slot 0 — shared between phantom and real first item so
  // React never unmounts/remounts the input on the phantom→real transition.
  const slot0Key = useId();

  const items = Array.isArray(value) ? value : value ? [value] : [];

  // Always show at least one input — phantom when items is empty.
  const displayItems = items.length > 0 ? items : [cloneDefault];
  const isPhantom = items.length === 0;

  // itemKeys tracks keys for real items. Slot 0 always uses slot0Key so the
  // DOM node survives the phantom→real flip without losing focus.
  const [itemKeys, setItemKeys] = useState(() =>
    items.map((_, i) => (i === 0 ? slot0Key : `clone-init-${i}`))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAdd = useCallback(() => {
    if (displayItems.length >= maxClone) return;
    // Append to displayItems (not items) so clicking Add while phantom creates
    // a genuine second slot rather than just promoting the phantom.
    const newItems = [...displayItems, cloneDefault];
    const newKeys = newItems.map((_, i) =>
      i === 0 ? slot0Key : itemKeys[i] || `clone-${Date.now()}-${i}-${Math.random()}`
    );
    setItemKeys(newKeys);
    onChange({ id, value: newItems, settingsOption });
  }, [displayItems, itemKeys, maxClone, cloneDefault, slot0Key, onChange, id, settingsOption]);

  const handleRemove = useCallback(
    (index) => {
      // Never remove below 1 visible item.
      if (items.length <= Math.max(minClone, 1)) return;
      const newItems = items.filter((_, i) => i !== index);
      setItemKeys((prev) => {
        const next = prev.filter((_, i) => i !== index);
        // Single remaining item gets stable key so the input doesn't remount.
        if (next.length === 1) next[0] = slot0Key;
        return next;
      });
      onChange({ id, value: newItems, settingsOption });
    },
    [items, minClone, slot0Key, onChange, id, settingsOption]
  );

  const handleChangeItem = useCallback(
    (index, newValue) => {
      const base = displayItems;
      const newItems = base.map((v, i) => (i === index ? newValue : v));
      if (isPhantom) {
        // Promote phantom to real; use slot0Key so the input isn't remounted.
        setItemKeys([slot0Key]);
      }
      onChange({ id, value: newItems, settingsOption });
    },
    [displayItems, isPhantom, slot0Key, onChange, id, settingsOption]
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = itemKeys.indexOf(active.id);
      const newIndex = itemKeys.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const newItems = arrayMove([...items], oldIndex, newIndex);
      // Keep keys with their items so each sortable keeps a unique id.
      const newKeys = arrayMove([...itemKeys], oldIndex, newIndex);
      setItemKeys(newKeys);
      onChange({ id, value: newItems, settingsOption });
    },
    [items, itemKeys, onChange, id, settingsOption]
  );

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: label ? he.decode(label) : label,
    help: help ? he.decode(help) : help,
  });

  // Single item (or phantom): use stable slot0Key so input doesn't remount. Multiple items: use itemKeys so each row has a unique id for sortable.
  const displayKeys =
    items.length <= 1
      ? [slot0Key]
      : displayItems.map((_, i) => itemKeys[i] || `clone-fb-${i}`);

  // Sort handles and trash only appear when there are 2+ real items.
  const canAdd = displayItems.length < maxClone;
  const canRemove = items.length > Math.max(minClone, 1);
  const showSort = sortClone && items.length > 1;

  // DnD needs the real item keys (not display keys) to track positions.
  const sortableKeys = itemKeys.slice(0, items.length);

  const defaultAddLabel = label ? `Add ${he.decode(label)}` : "Add Item";

  const itemList = (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {displayItems.map((itemValue, index) => (
        <SortableCloneItem
          key={displayKeys[index]}
          itemId={displayKeys[index]}
          itemValue={itemValue}
          index={index}
          canRemove={canRemove}
          sortable={showSort}
          onRemove={handleRemove}
          onChangeItem={handleChangeItem}
          field={field}
          settingsOption={settingsOption}
        />
      ))}
    </div>
  );

  const cardClassName = classNames(
    "mtphrSettings__field",
    `mtphrSettings__field--text`,
    `mtphrSettings__field--clone`,
    field.class
  );

  return (
    <Card
      className={cardClassName}
      isRounded={false}
      size="small"
      style={{ flex: 1 }}
    >
      <CardBody className="mtphrSettings__field__input-wrapper">
        <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {showSort ? (
              <DndContext
                id={dndId}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={sortableKeys}
                  strategy={verticalListSortingStrategy}
                >
                  {itemList}
                </SortableContext>
              </DndContext>
            ) : (
              itemList
            )}
            <div>
              <Button
                variant="secondary"
                icon={plus}
                size="compact"
                disabled={!canAdd}
                onClick={handleAdd}
              >
                {addButton ? he.decode(addButton) : defaultAddLabel}
              </Button>
            </div>
          </div>
        </BaseControl>
      </CardBody>
    </Card>
  );
};

export default CloneWrapper;
