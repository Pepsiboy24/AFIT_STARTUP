'use client';

import { useMemo, useState } from 'react';
import BottomNav from '@/components/BottomNav';
import SearchPropertyCard from '@/components/SearchPropertyCard';
import type { PropertyRecord } from '@/app/actions/property';

interface PropertyGridProps {
  properties: PropertyRecord[];
}

const filterOptions = ['Price', 'Distance', 'Amenities'] as const;
type FilterKey = (typeof filterOptions)[number];

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAmenities = useMemo(() => {
    const set = new Set<string>();
    for (const p of properties) {
      for (const a of p.amenities ?? []) {
        set.add(a);
      }
    }
    return Array.from(set).sort();
  }, [properties]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const q = search.toLowerCase().trim();
      if (q) {
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchLocation = p.location.toLowerCase().includes(q);
        if (!matchTitle && !matchLocation) return false;
      }

      const min = Number(priceMin);
      if (priceMin && !Number.isNaN(min)) {
        if (p.price < min) return false;
      }
      const max = Number(priceMax);
      if (priceMax && !Number.isNaN(max)) {
        if (p.price > max) return false;
      }

      const dist = Number(maxDistance);
      if (maxDistance && !Number.isNaN(dist)) {
        if (p.distance_from_campus == null || p.distance_from_campus > dist) return false;
      }

      if (selectedAmenities.length > 0) {
        const pAmenities = p.amenities ?? [];
        if (!selectedAmenities.every((a) => pAmenities.includes(a))) return false;
      }

      return true;
    });
  }, [properties, search, priceMin, priceMax, maxDistance, selectedAmenities]);

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity],
    );
  }

  function clearFilters() {
    setPriceMin('');
    setPriceMax('');
    setMaxDistance('');
    setSelectedAmenities([]);
    setActiveFilter(null);
  }

  const hasActiveFilters = priceMin !== '' || priceMax !== '' || maxDistance !== '' || selectedAmenities.length > 0;

  return (
    <div className="min-h-screen bg-background text-on-background pb-20">
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <section className="space-y-4">
          <div>
            <h1 className="text-headline-lg font-bold text-primary">Browse homes</h1>
            <p className="text-body-md text-on-surface-variant">
              Find your next student residence with filters tailored for academic living.
            </p>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or location..."
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-12 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {filterOptions.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(activeFilter === f ? null : f)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-label-md font-medium transition-all ${
                  activeFilter === f
                    ? 'bg-tertiary text-white shadow-soft'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-base">{f === 'Price' ? 'payments' : f === 'Distance' ? 'distance' : 'tune'}</span>
                {f}
                {(f === 'Price' && (priceMin || priceMax)) ||
                (f === 'Distance' && maxDistance) ||
                (f === 'Amenities' && selectedAmenities.length > 0) ? (
                  <span className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
                    {(f === 'Price' ? (priceMin ? 1 : 0) + (priceMax ? 1 : 0) : f === 'Distance' ? (maxDistance ? 1 : 0) : selectedAmenities.length)}
                  </span>
                ) : null}
              </button>
            ))}
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-full border border-outline-variant px-3 py-2 text-label-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">close</span>
                Clear
              </button>
            ) : null}
          </div>

          {activeFilter === 'Price' ? (
            <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-outline-variant bg-white p-4 shadow-soft">
              <label className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant">Min price (₦)</span>
                <input
                  type="number"
                  min={0}
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="0"
                  className="w-32 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant">Max price (₦)</span>
                <input
                  type="number"
                  min={0}
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Any"
                  className="w-32 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                />
              </label>
            </div>
          ) : null}

          {activeFilter === 'Distance' ? (
            <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-outline-variant bg-white p-4 shadow-soft">
              <label className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant">Max distance from campus (km)</span>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  placeholder="Any"
                  className="w-40 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                />
              </label>
            </div>
          ) : null}

          {activeFilter === 'Amenities' ? (
            <div className="rounded-2xl border border-outline-variant bg-white p-4 shadow-soft">
              <p className="text-label-sm text-on-surface-variant mb-3">Select amenities to filter by</p>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-label-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {isSelected ? <span className="material-symbols-outlined text-sm">check</span> : null}
                      {amenity}
                    </button>
                  );
                })}
                {allAmenities.length === 0 ? (
                  <p className="text-body-sm text-on-surface-variant">No amenities available.</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>

        <section className="mt-stack-md">
          {filtered.length === 0 ? (
            <div className="rounded-[1.5rem] border border-outline-variant bg-white p-10 text-center shadow-soft">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant">search_off</span>
              <p className="mt-3 text-headline-sm font-semibold text-on-surface">No properties found</p>
              <p className="mt-1 text-body-sm text-on-surface-variant">
                {hasActiveFilters
                  ? 'Try adjusting your filters or search term.'
                  : 'No listings available yet. Check back later.'}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-body-sm font-semibold text-white transition hover:bg-primary-container"
                >
                  <span className="material-symbols-outlined text-base">refresh</span>
                  Clear all filters
                </button>
              ) : null}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <SearchPropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </main>
      <BottomNav activePath="/search" />
    </div>
  );
}
