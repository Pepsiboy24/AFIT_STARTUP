'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { propertySchema } from '@/lib/validations/property';

export interface PropertyRecord {
  id: string;
  landlord_id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  distance_from_campus: number | null;
  amenities: string[];
  images: string[];
  is_verified?: boolean;
  created_at?: string;
}

export type PropertyActionState =
  | { success?: boolean; error?: string; property?: PropertyRecord }
  | undefined;

export async function getLandlordProperties(): Promise<{
  properties?: PropertyRecord[];
  error?: string;
}> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: 'You must be logged in.' };
    }

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('landlord_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return { error: error.message };
    }

    return { properties: (data ?? []) as PropertyRecord[] };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong.' };
  }
}

export async function createProperty(formData: FormData): Promise<PropertyActionState> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: 'You must be logged in to create a property.' };
    }

    const imageFiles = formData
      .getAll('images')
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, file, { contentType: file.type, upsert: false });

      if (uploadError) {
        return { error: `Failed to upload ${file.name}: ${uploadError.message}` };
      }

      const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
      imageUrls.push(data.publicUrl);
    }

    const amenitiesEntries = formData.getAll('amenities');
    const amenitiesInput =
      amenitiesEntries.length === 1 ? amenitiesEntries[0] : amenitiesEntries;

    const parsed = propertySchema.safeParse({
      title: formData.get('title'),
      description: formData.get('description') || undefined,
      price: formData.get('price'),
      location: formData.get('location'),
      distance_from_campus: formData.get('distance_from_campus'),
      amenities: amenitiesInput,
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? 'Invalid property data.' };
    }

    const { data: property, error: insertError } = await supabase
      .from('properties')
      .insert({
        landlord_id: user.id,
        title: parsed.data.title,
        description: parsed.data.description ?? null,
        price: parsed.data.price,
        location: parsed.data.location,
        distance_from_campus: parsed.data.distance_from_campus ?? null,
        amenities: parsed.data.amenities,
        images: imageUrls,
      })
      .select()
      .single();

    if (insertError) {
      return { error: insertError.message };
    }

    revalidatePath('/landlord');
    return { success: true, property };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong.' };
  }
}
