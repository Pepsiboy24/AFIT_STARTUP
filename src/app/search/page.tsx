'use client';

import { useMemo, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Chip from '@/components/Chip';
import { properties } from '@/lib/data/properties';

const filters = ['Price', 'Distance', 'Rooms', 'Amenities'];

export default function SearchPage() {
  const [activeFilter, setActiveFilter] = useState('Price');
  const [search, setSearch] = useState('');

  const filteredProperties = useMemo(
    () =>
      properties.filter((property) =>
        property.title.toLowerCase().includes(search.toLowerCase()) || property.location.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="min-h-screen bg-background text-on-background">
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-headline-lg font-bold text-primary">Search homes near campus</h1>
              <p className="text-body-md text-on-surface-variant">Find your next student residence with filters tailored for academic living.</p>
            </div>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search near your campus..."
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-12 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Chip key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                {filter}
              </Chip>
            ))}
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </section>
      </main>
    </div>
  );
}
