import { z } from 'zod';

const amenitiesSchema = z.union([
  z.array(z.string()),
  z
    .string()
    .transform((value) =>
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    ),
]);

const optionalNumber = z.preprocess(
  (value) => (value === '' || value === null || value === undefined ? undefined : value),
  z.coerce.number().optional()
);

export const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().optional(),
  price: z.coerce.number().positive('Price must be a positive number'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  distance_from_campus: optionalNumber,
  amenities: amenitiesSchema,
});

export type PropertyInput = z.infer<typeof propertySchema>;
