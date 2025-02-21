import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

enum Color {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

// Define the form schema using Zod
const itemSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  price: z.number().min(0, 'Price must be at least 0').max(1000000, 'Price cannot exceed 1,000,000').optional(),
  color: z.nativeEnum(Color).nullable().optional(),
});

// Infer the type from the schema
type ItemFormData = z.infer<typeof itemSchema>;

interface ItemFormProps {
  onSubmit: (data: ItemFormData) => void;
  initialData?: ItemFormData;
}

export function ItemForm({ onSubmit, initialData }: ItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: initialData
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          rows={4}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register('price', {
            setValueAs: (value) => value === "" ? undefined : parseFloat(value)
          })}
          aria-invalid={!!errors.price}
        />
        {errors.price && (
          <p className="text-sm text-destructive">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <Select
          {...register('color')}
          value={watch('color') ?? undefined}
          onValueChange={(value) => {
            setValue('color', value as Color)
          }}
          aria-invalid={!!errors.color}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Color).map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.color && (
          <p className="text-sm text-destructive">{errors.color.message}</p>
        )}
      </div>
      <Button type="submit">
        {initialData ? 'Update' : 'Create'}
      </Button>
    </form>
  );
}
