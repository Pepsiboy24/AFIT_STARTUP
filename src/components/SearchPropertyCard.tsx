import Link from 'next/link';
import type { PropertyRecord } from '@/app/actions/property';

interface SearchPropertyCardProps {
  property: PropertyRecord;
}

export default function SearchPropertyCard({ property }: SearchPropertyCardProps) {
  const amenities = property.amenities ?? [];
  const hero = property.images?.[0];

  return (
    <Link
      href={`/dashboard/properties/${property.id}`}
      className="group overflow-hidden rounded-[1rem] border border-outline-variant bg-white shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-56 overflow-hidden">
        {hero ? (
          <img
            src={hero}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-container-low text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl">image_not_supported</span>
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {property.is_verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-label-sm font-semibold text-white">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Verified
            </span>
          ) : null}
          {typeof property.distance_from_campus === 'number' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-label-sm font-semibold text-on-secondary-container">
              <span className="material-symbols-outlined text-[16px]">school</span>
              {property.distance_from_campus} km
            </span>
          ) : null}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-headline-sm font-semibold text-on-surface">{property.title}</h2>
            <p className="truncate text-body-sm text-on-surface-variant">{property.location}</p>
          </div>
          <p className="whitespace-nowrap text-headline-sm font-bold text-primary">
            ₦{Number(property.price).toLocaleString()}
          </p>
        </div>
        {property.description ? (
          <p className="line-clamp-2 text-body-sm text-on-surface-variant">{property.description}</p>
        ) : null}
        {amenities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="rounded-full bg-surface-container-high px-3 py-1 text-label-sm text-on-surface-variant">
                {amenity}
              </span>
            ))}
            {amenities.length > 3 ? (
              <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-sm text-on-surface-variant">
                +{amenities.length - 3}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
