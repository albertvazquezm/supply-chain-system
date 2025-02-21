import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

enum EventType {
  LOCATION = 'location',
  CUSTODY = 'custody',
}

const eventTypes = [
  { label: 'Location', value: EventType.LOCATION },
  { label: 'Custody', value: EventType.CUSTODY },
];

const itemEventAttributeSchema = z.object({
  key: z.string()
    .min(1, 'Key must be at least 1 character')
    .max(50, 'Key cannot exceed 50 characters'),
  value: z.string()
    .min(1, 'Value must be at least 1 character')
    .max(500, 'Value cannot exceed 500 characters'),
});

const itemEventSchema = z.object({
  eventType: z.nativeEnum(EventType),
  attributes: z.array(itemEventAttributeSchema),
});

// Infer the type from the schema
type ItemEventFormData = z.infer<typeof itemEventSchema>;

interface ItemEventFormProps {
  onSubmit: (data: ItemEventFormData) => void;
}

export function ItemEventForm({ onSubmit }: ItemEventFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ItemEventFormData>({
    resolver: zodResolver(itemEventSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Event type</Label>
        <Select
          {...register('eventType')}
          onValueChange={(value) => {
            setValue('eventType', value as EventType)
          }}
          aria-invalid={!!errors.eventType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {
              eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        {errors.eventType && (
          <p className="text-sm text-destructive">{errors.eventType.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Attributes</Label>
          <Button size="sm" variant="ghost" type="button" onClick={() => append({ key: '', value: '' })}><Plus className="h-4 w-4" /> Add attribute</Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <Label>Key</Label>
              <Input
                {...register(`attributes.${index}.key`)}
                placeholder="Enter attribute key"
                aria-invalid={!!errors.attributes?.[index]?.key}
              />
              {errors.attributes?.[index]?.key && (
                <p className="text-sm text-destructive">{errors.attributes[index].key?.message}</p>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Label>Value</Label>
              <Input
                {...register(`attributes.${index}.value`)}
                placeholder="Enter attribute value"
                aria-invalid={!!errors.attributes?.[index]?.value}
              />
              {errors.attributes?.[index]?.value && (
                <p className="text-sm text-destructive">{errors.attributes[index].value?.message}</p>
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="mt-8"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

      </div>

      <Button type="submit" disabled={isSubmitting}>
        Create event
      </Button>
    </form>
  );
}
