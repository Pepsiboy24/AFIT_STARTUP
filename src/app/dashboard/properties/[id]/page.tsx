import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ContactLandlord from '@/components/ContactLandlord';

interface PropertyWithLandlord {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  distance_from_campus: number | null;
  amenities: string[];
  images: string[];
  created_at?: string;
  landlord: {
    full_name: string | null;
    email: string | null;
    phone_number: string | null;
  } | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: property } = await supabase
    .from('properties')
    .select('*, landlord:users(full_name, email, phone_number)')
    .eq('id', id)
    .maybeSingle<PropertyWithLandlord>();

  if (!property) {
    notFound();
  }

  const images = property.images ?? [];
  const hero = images[0];
  const rest = images.slice(1);
  const landlord = property.landlord;
  const landlordName = landlord?.full_name ?? 'Property Manager';
  const landlordInitial = (landlordName || 'P').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-on-background">
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="mb-stack-md flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/search"
              className="inline-flex items-center gap-1 text-label-md font-semibold text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to search
            </Link>
            <h1 className="mt-3 text-headline-lg font-bold text-primary">{property.title}</h1>
            <p className="text-body-md text-on-surface-variant">{property.location}</p>
          </div>
          <p className="text-headline-lg font-bold text-primary">₦{Number(property.price).toLocaleString()}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <section className="space-y-4">
              {hero ? (
                <img src={hero} alt={property.title} className="h-[420px] w-full rounded-[1.5rem] border border-outline-variant object-cover shadow-soft" />
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center rounded-[1.5rem] border border-outline-variant bg-surface-container-low text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl">image_not_supported</span>
                </div>
              )}
              {rest.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {rest.map((image, index) => (
                    <img key={index} src={image} alt={`${property.title} image ${index + 2}`} className="h-28 w-full rounded-xl border border-outline-variant object-cover" />
                  ))}
                </div>
              ) : null}
            </section>

            <section className="rounded-[1.5rem] border border-outline-variant bg-white p-6 shadow-soft">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="inline-flex items-center gap-2 text-body-md text-on-surface">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  {property.location}
                </span>
                {typeof property.distance_from_campus === 'number' ? (
                  <span className="inline-flex items-center gap-2 text-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary">school</span>
                    {property.distance_from_campus} km from campus
                  </span>
                ) : null}
              </div>
              <div className="mt-6">
                <h2 className="text-headline-sm font-semibold text-primary">About this property</h2>
                <p className="mt-3 text-body-md text-on-surface-variant">
                  {property.description || 'No description provided by the landlord yet.'}
                </p>
              </div>
              <div className="mt-6">
                <ContactLandlord
                  landlordName={landlordName}
                  landlordPhone={landlord?.phone_number ?? ''}
                  propertyTitle={property.title}
                  landlordEmail={landlord?.email ?? ''}
                />
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-outline-variant bg-white p-6 shadow-soft">
              <h2 className="text-headline-sm font-semibold text-primary">Amenities</h2>
              {property.amenities && property.amenities.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-4 py-2 text-label-md text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-body-sm text-on-surface-variant">No amenities listed.</p>
              )}
            </section>
          </div>

          <aside>
            <div className="lg:sticky lg:top-6 rounded-[1.5rem] bg-primary p-6 text-white shadow-soft">
              <p className="text-label-sm uppercase tracking-[0.25em] text-white/70">Landlord</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 text-headline-sm font-bold">
                  {landlordInitial}
                </span>
                <div>
                  <h3 className="text-headline-sm font-semibold text-white">{landlordName}</h3>
                  <p className="inline-flex items-center gap-1 text-body-sm text-white/80">
                    <span className="material-symbols-outlined text-base">verified</span>
                    Verified landlord
                  </p>
                </div>
              </div>
              <p className="mt-5 text-body-sm text-white/80">
                Interested in this home? Book a room now or contact the landlord to schedule a viewing.
              </p>
              <button
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-body-md font-semibold text-primary transition hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="material-symbols-outlined text-base">home_work</span>
                Book this room
              </button>
              {landlord?.email ? (
                <a
                  href={`mailto:${landlord.email}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-body-md font-semibold text-primary transition hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="material-symbols-outlined text-base">mail</span>
                  {landlord.email}
                </a>
              ) : (
                <p className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-body-sm text-white/80">
                  Contact information unavailable.
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
