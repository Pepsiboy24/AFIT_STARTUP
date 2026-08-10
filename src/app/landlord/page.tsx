import TopAppBar from '@/components/TopAppBar';
import Button from '@/components/Button';
import type { Property } from '@/types/property';
import { properties } from '@/lib/data/properties';

const menuItems = ['Dashboard', 'My Listings', 'Inquiries', 'Account'];

function ListingCard({ property }: { property: Property }) {
  return (
    <div className="rounded-[1.5rem] border border-outline-variant bg-white p-5 shadow-soft">
      <img src={property.image} alt={property.title} className="h-48 w-full rounded-3xl object-cover" />
      <div className="mt-4">
        <h3 className="text-headline-sm font-semibold text-on-surface">{property.title}</h3>
        <p className="text-body-sm text-on-surface-variant">{property.location}</p>
        <p className="mt-2 text-body-md font-semibold text-primary">{property.price}</p>
      </div>
    </div>
  );
}

export default function LandlordPage() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <TopAppBar title="Landlord Portal" showProfile={false} showNotifications />
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4 rounded-[1.5rem] border border-outline-variant bg-white p-5 shadow-soft">
            <div className="space-y-1">
              <p className="text-label-sm uppercase tracking-[0.3em] text-on-surface-variant">Navigation</p>
              {menuItems.map((item, index) => (
                <button key={item} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-body-md transition ${index === 0 ? 'bg-secondary text-white' : 'text-on-surface hover:bg-surface-container-low'}`}>
                  <span>{item}</span>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              ))}
            </div>
          </aside>
          <section className="space-y-6">
            <div className="rounded-[1.5rem] border border-outline-variant bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">Landlord dashboard</p>
                  <h2 className="text-headline-lg font-bold text-primary">Your listings at a glance</h2>
                </div>
                <Button variant="secondary">Create new listing</Button>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {properties.map((property) => (
                <ListingCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
