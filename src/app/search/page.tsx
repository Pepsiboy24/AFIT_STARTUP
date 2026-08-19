import { getProperties } from '@/lib/api/properties';
import PropertyGrid from '@/components/PropertyGrid';
import type { PropertyRecord } from '@/app/actions/property';

export default async function SearchPage() {
  let properties: PropertyRecord[] = [];
  try {
    properties = await getProperties();
  } catch {
    // properties stays empty — grid will show the empty state
  }

  return <PropertyGrid properties={properties} />;
}
