import Link from 'next/link';
import type { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group overflow-hidden rounded-[1rem] border border-outline-variant bg-white shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden">
        <img src={property.image} alt={property.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {property.verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-label-sm font-semibold text-white">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Verified
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-label-sm font-semibold text-on-secondary-container">
            <span className="material-symbols-outlined text-[16px]">school</span>
            {property.nearCampus}
          </span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-headline-sm font-semibold text-on-surface">{property.title}</h2>
            <p className="text-body-sm text-on-surface-variant">{property.location}</p>
          </div>
          <p className="text-headline-sm font-bold text-primary">{property.price}</p>
        </div>
        <p className="text-body-md text-on-surface-variant">{property.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-full bg-surface-container-high px-3 py-1 text-label-sm text-on-surface-variant">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
