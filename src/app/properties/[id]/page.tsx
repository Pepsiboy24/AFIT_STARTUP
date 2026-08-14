import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Property } from '@/types/property';
import { getPropertyById } from '@/lib/data/properties';
import StudentNavbar from '@/components/StudentNavbar';
import BottomNav from '@/components/BottomNav';
import Button from '@/components/Button';

interface PropertyPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const resolvedParams = await params;
  const property = getPropertyById(resolvedParams.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-on-background pb-24 md:pb-12">
      {/* Student Portal Navigation Bar */}
      <StudentNavbar />

      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center gap-2 text-label-sm text-on-surface-variant">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Student Portal
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/search" className="hover:text-primary transition-colors">
            Search
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-semibold text-primary truncate max-w-[200px]">{property.title}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-5">
            {/* Property Image & Badges */}
            <div className="relative rounded-[1.5rem] overflow-hidden shadow-soft border border-outline-variant/60 bg-white">
              <img
                src={property.image}
                alt={property.title}
                className="h-[360px] md:h-[420px] w-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {property.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1 text-label-sm font-semibold text-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Verified Student Property
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-3.5 py-1 text-label-sm font-semibold text-on-secondary-container shadow-md">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  {property.nearCampus}
                </span>
              </div>
            </div>

            {/* Title, Location, and Core Specs */}
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-label-sm uppercase tracking-[0.2em] font-semibold text-secondary">
                    {property.location}
                  </p>
                  <h1 className="text-headline-lg font-bold text-primary mt-1">{property.title}</h1>
                  <p className="text-body-md text-on-surface-variant mt-0.5">{property.subtitle}</p>
                </div>
                <div>
                  <p className="text-headline-lg font-extrabold text-primary">{property.price}</p>
                  <p className="text-label-sm text-on-surface-variant text-right">Bills included</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 grid-cols-3">
                <div className="rounded-xl bg-surface p-4 text-center border border-outline-variant/40">
                  <span className="material-symbols-outlined text-primary text-[24px]">bed</span>
                  <p className="text-label-sm text-on-surface-variant mt-1">Bedrooms</p>
                  <p className="text-headline-sm font-bold text-on-surface">{property.bedrooms}</p>
                </div>
                <div className="rounded-xl bg-surface p-4 text-center border border-outline-variant/40">
                  <span className="material-symbols-outlined text-secondary text-[24px]">shower</span>
                  <p className="text-label-sm text-on-surface-variant mt-1">Bathrooms</p>
                  <p className="text-headline-sm font-bold text-on-surface">{property.bathrooms}</p>
                </div>
                <div className="rounded-xl bg-surface p-4 text-center border border-outline-variant/40">
                  <span className="material-symbols-outlined text-tertiary text-[24px]">square_foot</span>
                  <p className="text-label-sm text-on-surface-variant mt-1">Area</p>
                  <p className="text-headline-sm font-bold text-on-surface">{property.area}</p>
                </div>
              </div>
            </div>

            {/* Description & Amenities */}
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60 space-y-6">
              <div>
                <h2 className="text-headline-md font-bold text-primary">About this Abode</h2>
                <p className="mt-3 text-body-md text-on-surface-variant leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-label-lg font-bold text-on-surface mb-3">Key Highlights</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {property.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-2 rounded-xl bg-surface p-3.5 text-body-sm font-semibold text-on-surface border border-outline-variant/40"
                    >
                      <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-label-lg font-bold text-on-surface mb-3">Included Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-secondary-container/50 px-4 py-1.5 text-label-sm font-semibold text-on-secondary-container"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right Sidebar: Landlord Profile & Booking CTA */}
          <aside className="space-y-6">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60 space-y-5">
              <div className="flex items-center gap-3 border-b border-outline-variant/40 pb-4">
                <img
                  src={property.hostAvatar}
                  alt={property.hostName}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <span className="text-label-sm font-semibold text-secondary uppercase tracking-wider">
                    Verified Landlord
                  </span>
                  <p className="text-body-lg font-bold text-on-surface">{property.hostName}</p>
                  <p className="text-label-sm text-on-surface-variant">Response rate: 98% • Usually responds in 1hr</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl bg-surface p-3.5 border border-outline-variant/40">
                  <p className="text-label-sm text-on-surface-variant font-medium">Campus Proximity</p>
                  <p className="text-body-md font-bold text-primary flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                    {property.nearCampus}
                  </p>
                </div>
                <div className="rounded-xl bg-surface p-3.5 border border-outline-variant/40">
                  <p className="text-label-sm text-on-surface-variant font-medium">Location</p>
                  <p className="text-body-md font-semibold text-on-surface flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    {property.location}
                  </p>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  href="/dashboard?tab=applications"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-body-md font-semibold text-white shadow-soft transition-all hover:bg-primary-container active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Apply for this Abode</span>
                </Link>
                <Link
                  href="/dashboard?tab=messages"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-white px-4 py-3 text-body-md font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Message {property.hostName}</span>
                </Link>
              </div>
            </div>

            {/* Student Safety Promise Card */}
            <div className="rounded-[1.5rem] bg-surface-container-low p-5 border border-outline-variant/50">
              <div className="flex items-center gap-2 text-primary font-bold text-label-md mb-1">
                <span className="material-symbols-outlined text-[20px]">security</span>
                <span>Academic Abodes Guarantee</span>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                All student listings undergo identity validation and lease check before listing to ensure zero rental fraud.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Bottom Floating Navigation for Mobile */}
      <BottomNav />
    </div>
  );
}
