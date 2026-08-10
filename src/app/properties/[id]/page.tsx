import { notFound } from 'next/navigation';
import type { Property } from '@/types/property';
import { getPropertyById } from '@/lib/data/properties';
import Button from '@/components/Button';

interface PropertyPageProps {
  params: { id: string };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-5">
            <div className="rounded-[1.5rem] overflow-hidden shadow-soft border border-outline-variant">
              <img src={property.image} alt={property.title} className="h-[420px] w-full object-cover" />
            </div>
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">{property.location}</p>
                  <h1 className="text-headline-lg font-bold text-primary">{property.title}</h1>
                </div>
                <p className="text-headline-sm font-semibold text-primary">{property.price}</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1rem] bg-surface p-4 text-center">
                  <p className="text-label-sm text-on-surface-variant">Bedrooms</p>
                  <p className="text-headline-sm font-semibold text-on-surface">{property.bedrooms}</p>
                </div>
                <div className="rounded-[1rem] bg-surface p-4 text-center">
                  <p className="text-label-sm text-on-surface-variant">Bathrooms</p>
                  <p className="text-headline-sm font-semibold text-on-surface">{property.bathrooms}</p>
                </div>
                <div className="rounded-[1rem] bg-surface p-4 text-center">
                  <p className="text-label-sm text-on-surface-variant">Area</p>
                  <p className="text-headline-sm font-semibold text-on-surface">{property.area}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant">
              <h2 className="text-headline-md font-semibold text-primary">Property details</h2>
              <p className="mt-4 text-body-md text-on-surface-variant">{property.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {property.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-[1rem] bg-surface p-4 text-body-sm text-on-surface">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <aside className="space-y-4">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant">
              <div className="flex items-center gap-3">
                <img src={property.hostAvatar} alt={property.hostName} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="text-label-sm text-on-surface-variant">Hosted by</p>
                  <p className="text-body-lg font-semibold text-on-surface">{property.hostName}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="rounded-[1rem] bg-surface p-4">
                  <p className="text-label-sm text-on-surface-variant">Location</p>
                  <p className="text-body-md text-on-surface">{property.location}</p>
                </div>
                <div className="rounded-[1rem] bg-surface p-4">
                  <p className="text-label-sm text-on-surface-variant">Near campus</p>
                  <p className="text-body-md text-on-surface">{property.nearCampus}</p>
                </div>
              </div>
              <Button className="mt-6 w-full">Book Viewing</Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
