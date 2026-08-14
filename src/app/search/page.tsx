'use client';

import { useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import StudentNavbar from '@/components/StudentNavbar';
import BottomNav from '@/components/BottomNav';
import PropertyCard from '@/components/PropertyCard';
import Chip from '@/components/Chip';
import LogoutModal from '@/components/LogoutModal';
import { properties } from '@/lib/data/properties';

const filters = ['All Abodes', 'Verified Only', 'Under £1,700', 'Near UCL', 'Private Studio', 'Shared Flat'];

function SearchContent() {
  const [activeFilter, setActiveFilter] = useState('All Abodes');
  const [search, setSearch] = useState('');
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase()) ||
        property.nearCampus.toLowerCase().includes(search.toLowerCase()) ||
        property.amenities.some((a) => a.toLowerCase().includes(search.toLowerCase()));

      if (!matchesSearch) return false;

      if (activeFilter === 'Verified Only') return property.verified;
      if (activeFilter === 'Under £1,700') {
        const priceNum = parseInt(property.price.replace(/[^0-9]/g, ''), 10);
        return priceNum < 1700;
      }
      if (activeFilter === 'Near UCL') return property.nearCampus.includes('UCL');
      if (activeFilter === 'Private Studio') return property.bedrooms === 1;
      if (activeFilter === 'Shared Flat') return property.bedrooms > 1;

      return true;
    });
  }, [search, activeFilter]);

  return (
    <div className="min-h-screen bg-background text-on-background pb-24 md:pb-12">
      {/* Student Portal Navigation Bar */}
      <StudentNavbar />

      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        {/* Header Section */}
        <section className="space-y-4 mb-stack-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-label-sm font-semibold text-secondary mb-1">
                <span className="material-symbols-outlined text-[16px]">location_city</span>
                <span>London Student Housing Network</span>
              </div>
              <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-primary">
                Find Your Ideal Student Abode
              </h1>
              <p className="text-body-md text-on-surface-variant">
                Verified, campus-proximate housing tailored for academic focus and student life.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-outline-variant bg-white px-4 py-2.5 text-label-md font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span>My Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[22px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by university, neighborhood, amenities, or street (e.g. UCL, Bloomsbury, WiFi)..."
              className="w-full rounded-2xl border border-outline-variant bg-white py-3.5 pl-12 pr-10 text-body-md shadow-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Chip
                key={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </div>
        </section>

        {/* Results Counter & Sorting */}
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3 mb-6">
          <p className="text-label-md font-semibold text-on-surface">
            Showing <span className="text-primary font-bold">{filteredProperties.length}</span> available student abodes
          </p>
          <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Sorted by Proximity to Campus</span>
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </section>
        ) : (
          <div className="rounded-[1.5rem] bg-white p-12 text-center shadow-soft border border-outline-variant">
            <span className="material-symbols-outlined text-outline text-[48px]">search_off</span>
            <h3 className="mt-3 text-headline-sm font-bold text-on-surface">No matching abodes found</h3>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Try adjusting your search criteria or resetting the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveFilter('All Abodes');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-label-md font-semibold text-white hover:bg-primary-container transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Bottom Floating Navigation for Mobile */}
      <BottomNav />

      {/* Logout Modal */}
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background p-8 text-center">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
