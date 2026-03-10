import { useState, useCallback, useId } from "@wordpress/element";
import he from "he";
import {
  Button,
  Card,
  CardBody,
  __experimentalHStack as HStack,
  __experimentalVStack as VStack,
  __experimentalHeading as Heading,
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
import { CSS } from "@dnd-kit/utilities";
import Field from "./Field";
import { shouldRenderField } from "../utils/fieldVisibility";

const SortableRow = ({
  rowId,
  rowIndex,
  rowValue,
  fields,
  canRemove,
  onRemove,
  onFieldChange,
  values,
  settingsOption,
  settingsId,
  sections,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rowId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card size="small" className="mtphrSettings__repeater-row">
        <CardBody style={{ padding: "12px" }}>
          <VStack spacing={3}>
            <HStack alignment="center" justify="space-between">
              <HStack spacing={2} alignment="center">
                <Button
                  ref={setActivatorNodeRef}
                  icon={dragHandle}
                  label="Drag to reorder"
                  size="small"
                  className="mtphrSettings__repeater-drag-handle"
                  {...attributes}
                  {...listeners}
                />
                <span className="mtphrSettings__repeater-row-number">
                  {rowIndex + 1}
                </span>
              </HStack>
              <Button
                icon={trash}
                label="Remove"
                size="small"
                isDestructive
                disabled={!canRemove}
                onClick={() => onRemove(rowIndex)}
              />
            </HStack>
            {fields.map((subField, fieldIdx) => {
              const fieldValue = subField.id
                ? rowValue[subField.id]
                : rowValue;

              if (!shouldRenderField(subField, values)) return null;

              return (
                <Field
                  key={`repeater-${rowIndex}-${fieldIdx}-${subField.id || "field"}`}
                  field={subField}
                  value={fieldValue}
                  onChange={(data) =>
                    onFieldChange(rowIndex, data.id, data.value)
                  }
                  values={values}
                  settingsOption={settingsOption}
                  settingsId={settingsId}
                  sections={sections}
                />
              );
            })}
          </VStack>
        </CardBody>
      </Card>
    </div>
  );
};

const RepeaterField = ({
  field,
  value,
  onChange,
  values,
  settingsOption,
  settingsId,
  sections,
}) => {
  const { id, fields = [], min = 0, max = Infinity, label } = field;
  const dndId = useId();

  const rows = Array.isArray(value) ? value : [];

  const [rowKeys] = useState(() =>
    rows.map((_, i) => `row-${Date.now()}-${i}`)
  );

  const ensureRowKeys = useCallback(
    (count) => {
      while (rowKeys.length < count) {
        rowKeys.push(`row-${Date.now()}-${rowKeys.length}-${Math.random()}`);
      }
    },
    [rowKeys]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const buildDefaultRow = useCallback(() => {
    const row = {};
    fields.forEach((f) => {
      if (f.id) {
        row[f.id] = f.default !== undefined ? f.default : "";
      }
    });
    return row;
  }, [fields]);

  const handleAdd = useCallback(() => {
    if (rows.length >= max) return;
    const newRows = [...rows, buildDefaultRow()];
    ensureRowKeys(newRows.length);
    onChange({ id, value: newRows, settingsOption });
  }, [rows, max, buildDefaultRow, ensureRowKeys, onChange, id, settingsOption]);

  const handleRemove = useCallback(
    (index) => {
      if (rows.length <= min) return;
      const newRows = rows.filter((_, i) => i !== index);
      rowKeys.splice(index, 1);
      onChange({ id, value: newRows, settingsOption });
    },
    [rows, min, rowKeys, onChange, id, settingsOption]
  );

  const handleFieldChange = useCallback(
    (rowIndex, subFieldId, newValue) => {
      const newRows = rows.map((row, i) =>
        i === rowIndex ? { ...row, [subFieldId]: newValue } : row
      );
      onChange({ id, value: newRows, settingsOption });
    },
    [rows, onChange, id, settingsOption]
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = rowKeys.indexOf(active.id);
      const newIndex = rowKeys.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const newRows = arrayMove([...rows], oldIndex, newIndex);
      const newKeys = arrayMove([...rowKeys], oldIndex, newIndex);
      rowKeys.length = 0;
      newKeys.forEach((k) => rowKeys.push(k));

      onChange({ id, value: newRows, settingsOption });
    },
    [rows, rowKeys, onChange, id, settingsOption]
  );

  ensureRowKeys(rows.length);
  const activeKeys = rowKeys.slice(0, rows.length);
  const canAdd = rows.length < max;
  const canRemove = rows.length > min;

  return (
    <VStack spacing={3} className="mtphrSettings__repeater">
      {rows.length > 0 && (
        <DndContext
          id={dndId}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={activeKeys}
            strategy={verticalListSortingStrategy}
          >
            <VStack spacing={2}>
              {rows.map((row, index) => (
                <SortableRow
                  key={activeKeys[index]}
                  rowId={activeKeys[index]}
                  rowIndex={index}
                  rowValue={row}
                  fields={fields}
                  canRemove={canRemove}
                  onRemove={handleRemove}
                  onFieldChange={handleFieldChange}
                  values={values}
                  settingsOption={settingsOption}
                  settingsId={settingsId}
                  sections={sections}
                />
              ))}
            </VStack>
          </SortableContext>
        </DndContext>
      )}
      <Button
        variant="secondary"
        icon={plus}
        disabled={!canAdd}
        onClick={handleAdd}
        size="compact"
      >
        {label ? `Add ${he.decode(label)}` : "Add Row"}
      </Button>
    </VStack>
  );
};

export default RepeaterField;
