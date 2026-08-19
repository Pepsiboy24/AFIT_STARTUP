'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '');

  useEffect(() => {
    setLocation(searchParams.get('location') ?? '');
    setMinPrice(searchParams.get('minPrice') ?? '');
    setMaxPrice(searchParams.get('maxPrice') ?? '');
  }, [searchParams]);

  const pushFilters = (nextLocation: string, nextMin: string, nextMax: string) => {
    const params = new URLSearchParams();
    if (nextLocation.trim()) params.set('location', nextLocation.trim());
    if (nextMin) params.set('minPrice', nextMin);
    if (nextMax) params.set('maxPrice', nextMax);

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    pushFilters(location, minPrice, maxPrice);
  };

  const handleClear = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    router.replace(pathname);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-outline-variant bg-white p-6 shadow-soft">
      <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">Search &amp; filter</p>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <label className="space-y-2 text-body-md text-on-surface md:col-span-2">
          <span className="text-label-md font-semibold text-on-surface-variant">Location</span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
            <input
              type="text"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                pushFilters(event.target.value, minPrice, maxPrice);
              }}
              placeholder="e.g., Mando, Kaduna"
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-3 pl-12 pr-4 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>
        </label>
        <label className="space-y-2 text-body-md text-on-surface">
          <span className="text-label-md font-semibold text-on-surface-variant">Min Price (₦)</span>
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={(event) => {
              setMinPrice(event.target.value);
              pushFilters(location, event.target.value, maxPrice);
            }}
            placeholder="0"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="space-y-2 text-body-md text-on-surface">
          <span className="text-label-md font-semibold text-on-surface-variant">Max Price (₦)</span>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(event.target.value);
              pushFilters(location, minPrice, event.target.value);
            }}
            placeholder="150000"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </label>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-label-md font-semibold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span className="material-symbols-outlined text-base">search</span> Apply filters
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant bg-white px-5 py-2.5 text-label-md font-semibold text-on-surface-variant transition hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span className="material-symbols-outlined text-base">close</span> Clear
        </button>
      </div>
    </form>
  );
}
