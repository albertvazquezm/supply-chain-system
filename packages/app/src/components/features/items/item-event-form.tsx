import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const eventTypes = [
  { label: 'Custody', value: 'custody' },
  { label: 'Transfer', value: 'transfer' },
  { label: 'Sale', value: 'sale' },
  { label: 'Purchase', value: 'purchase' },
  { label: 'Other', value: 'other' },
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
  eventType: z.enum(eventTypes.map(type => type.value) as [string, ...string[]]),
  attributes: z.array(itemEventAttributeSchema),
});

// Infer the type from the schema
type ItemEventFormData = z.infer<typeof itemEventSchema>;

interface ItemEventFormProps {
  onSubmit: (data: ItemEventFormData) => void;
  initialData?: ItemEventFormData;
}

export function ItemEventForm({ onSubmit, initialData }: ItemEventFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ItemEventFormData>({
    resolver: zodResolver(itemEventSchema),
    defaultValues: initialData
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Event type</Label>
        <Select
          {...register('eventType')}
          onValueChange={(value) => {
            setValue('eventType', value)
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
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </form>
  );
}
