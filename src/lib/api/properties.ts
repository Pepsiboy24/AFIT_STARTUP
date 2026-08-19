import { createClient } from '@/lib/supabase/server';
import type { PropertyRecord } from '@/app/actions/property';

export interface PropertySearchParams {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
}

export async function getProperties(
  searchParams: PropertySearchParams = {}
): Promise<PropertyRecord[]> {
  const supabase = await createClient();

  let query = supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  const { location, minPrice, maxPrice } = searchParams;

  if (location && location.trim()) {
    query = query.ilike('location', `%${location.trim()}%`);
  }

  const min = Number(minPrice);
  if (minPrice && !Number.isNaN(min)) {
    query = query.gte('price', min);
  }

  const max = Number(maxPrice);
  if (maxPrice && !Number.isNaN(max)) {
    query = query.lte('price', max);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PropertyRecord[];
}
