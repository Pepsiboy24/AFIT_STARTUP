'use client';

import { useCallback, useEffect, useState } from 'react';
import TopAppBar from '@/components/TopAppBar';
import CreatePropertyForm from '@/components/CreatePropertyForm';
import { getLandlordProperties, type PropertyRecord } from '@/app/actions/property';
import type { Property } from '@/types/property';
import { properties } from '@/lib/data/properties';

type View = 'dashboard' | 'listings' | 'inquiries' | 'account';

const menuItems: { id: View; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'listings', label: 'My Listings', icon: 'home_work' },
  { id: 'inquiries', label: 'Inquiries', icon: 'mail' },
  { id: 'account', label: 'Account', icon: 'person' },
];

const viewHeaders: Record<View, { eyebrow: string; title: string; subtitle: string }> = {
  dashboard: {
    eyebrow: 'Landlord dashboard',
    title: 'Your listings at a glance',
    subtitle: 'Manage your properties, inquiries and bookings from one place.',
  },
  listings: {
    eyebrow: 'My listings',
    title: 'Properties you manage',
    subtitle: 'Edit or remove your active rental listings.',
  },
  inquiries: {
    eyebrow: 'Inquiries',
    title: 'Messages from students',
    subtitle: 'Respond to students interested in your properties.',
  },
  account: {
    eyebrow: 'Account',
    title: 'Profile & settings',
    subtitle: 'Keep your landlord details up to date.',
  },
};

interface Inquiry {
  id: number;
  property: string;
  name: string;
  message: string;
  date: string;
  responded: boolean;
}

const initialInquiries: Inquiry[] = [
  { id: 1, property: 'The Scholars Residence', name: 'Mary Johnson', message: 'Is this still available for the fall semester?', date: 'Aug 10', responded: false },
  { id: 2, property: 'Harbor Halls', name: 'Tunde Bakare', message: 'Can I book a viewing this Friday?', date: 'Aug 9', responded: false },
  { id: 3, property: 'Campus View Apartments', name: 'Amara Obi', message: 'Does the monthly rent include utilities?', date: 'Aug 7', responded: true },
];

function StatsCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[1rem] border border-outline-variant bg-white p-5 shadow-soft">
      <span className="material-symbols-outlined grid h-11 w-11 place-items-center rounded-full bg-primary-container text-on-primary-container">
        {icon}
      </span>
      <div>
        <p className="text-headline-sm font-semibold text-primary">{value}</p>
        <p className="text-body-sm text-on-surface-variant">{label}</p>
      </div>
    </div>
  );
}

function ListingCard({ property, onDelete }: { property: Property; onDelete: () => void }) {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="rounded-[1.5rem] border border-outline-variant bg-white p-5 shadow-soft">
      <img src={property.image} alt={property.title} className="h-48 w-full rounded-3xl object-cover" />
      <div className="mt-4">
        <h3 className="text-headline-sm font-semibold text-on-surface">{property.title}</h3>
        <p className="text-body-sm text-on-surface-variant">{property.location}</p>
        <p className="mt-2 text-body-md font-semibold text-primary">{property.price}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setNotice('Editing is coming soon.')}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-primary bg-white px-3 py-2 text-label-md font-semibold text-primary transition hover:bg-surface-container-low"
        >
          <span className="material-symbols-outlined text-base">edit</span> Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-error bg-white px-3 py-2 text-label-md font-semibold text-error transition hover:bg-error-container"
        >
          <span className="material-symbols-outlined text-base">delete</span> Delete
        </button>
      </div>
      {notice ? (
        <p role="status" className="mt-3 rounded-xl bg-secondary-container px-3 py-2 text-body-sm font-medium text-on-secondary-container">
          {notice}
        </p>
      ) : null}
    </div>
  );
}

function InquiryCard({ inquiry, onRespond }: { inquiry: Inquiry; onRespond: () => void }) {
  return (
    <div className="rounded-[1.5rem] border border-outline-variant bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-body-md font-semibold text-on-surface">{inquiry.name}</h3>
            <span className={`rounded-full px-2 py-0.5 text-label-sm font-semibold ${inquiry.responded ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface'}`}>
              {inquiry.responded ? 'Responded' : 'New'}
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant">{inquiry.property} · {inquiry.date}</p>
        </div>
      </div>
      <p className="mt-3 rounded-2xl bg-surface p-3 text-body-sm text-on-surface">{inquiry.message}</p>
      {!inquiry.responded ? (
        <button
          type="button"
          onClick={onRespond}
          className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-primary px-3 py-2 text-label-md font-semibold text-white transition hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-base">reply</span> Mark as responded
        </button>
      ) : null}
    </div>
  );
}

function AccountForm() {
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="max-w-2xl space-y-stack-md rounded-[1.5rem] border border-outline-variant bg-white p-6 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
    >
      {saved ? (
        <p role="status" className="rounded-xl bg-secondary-container px-4 py-3 text-body-sm font-medium text-on-secondary-container">
          Profile updated successfully!
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-body-md text-on-surface">
          <span className="text-label-md font-semibold text-on-surface-variant">Full Name or Company</span>
          <input defaultValue="Acme Rentals" className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary" />
        </label>
        <label className="space-y-2 text-body-md text-on-surface">
          <span className="text-label-md font-semibold text-on-surface-variant">Business Email</span>
          <input type="email" defaultValue="contact@acmerentals.com" className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary" />
        </label>
      </div>
      <label className="space-y-2 text-body-md text-on-surface">
        <span className="text-label-md font-semibold text-on-surface-variant">Phone</span>
        <input type="tel" defaultValue="+234 800 000 0000" className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary" />
      </label>
      <button type="submit" className="rounded-xl bg-primary px-6 py-3 text-body-md font-semibold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary">
        Save changes
      </button>
    </form>
  );
}

function toProperty(record: PropertyRecord): Property {
  return {
    id: record.id,
    title: record.title,
    subtitle: record.description ?? record.location,
    location: record.location,
    price: `$${Number(record.price).toLocaleString()}/mo`,
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    image: record.images?.[0] ?? '/images/property-1.svg',
    verified: false,
    nearCampus: record.distance_from_campus ? `${record.distance_from_campus} km from campus` : '',
    amenities: record.amenities ?? [],
    description: record.description ?? '',
    highlights: [],
    hostName: '',
    hostAvatar: '',
  };
}

export default function LandlordPage() {
  const [view, setView] = useState<View>('dashboard');
  const [listings, setListings] = useState<Property[]>(properties);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);

  const header = viewHeaders[view];

  const handleCreated = useCallback((record: PropertyRecord) => {
    setListings((current) => [toProperty(record), ...current]);
    setView('listings');
  }, []);

  useEffect(() => {
    let active = true;
    getLandlordProperties().then((result) => {
      if (!active) return;
      if (result.error) return;
      if (result.properties && result.properties.length > 0) {
        setListings(result.properties.map(toProperty));
      } else {
        setListings([]);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleDelete = (id: string) => {
    setListings((current) => current.filter((property) => property.id !== id));
  };

  const handleRespond = (id: number) => {
    setInquiries((current) =>
      current.map((inquiry) => (inquiry.id === id ? { ...inquiry, responded: true } : inquiry))
    );
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <TopAppBar title="Landlord Portal" showProfile={false} showNotifications />
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4 rounded-[1.5rem] border border-outline-variant bg-white p-5 shadow-soft">
            <div className="space-y-1">
              <p className="text-label-sm uppercase tracking-[0.3em] text-on-surface-variant">Navigation</p>
              {menuItems.map((item) => {
                const active = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setView(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-body-md transition ${
                      active ? 'bg-secondary text-white shadow-sm' : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined">{item.icon}</span>
                      {item.label}
                    </span>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                );
              })}
            </div>
          </aside>
          <section className="space-y-6">
            <div className="rounded-[1.5rem] border border-outline-variant bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">{header.eyebrow}</p>
                  <h2 className="text-headline-lg font-bold text-primary">{header.title}</h2>
                  <p className="mt-1 text-body-sm text-on-surface-variant">{header.subtitle}</p>
                </div>
                {view === 'dashboard' ? (
                  <a
                    href="#create-listing"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-body-md font-semibold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <span className="material-symbols-outlined text-base">add</span> Create new listing
                  </a>
                ) : null}
              </div>
            </div>

            {view === 'dashboard' ? (
              <>
                <div className="grid gap-4 sm:grid-cols-3">
                  <StatsCard label="Active listings" value={listings.length} icon="home_work" />
                  <StatsCard label="Inquiries" value={inquiries.filter((inquiry) => !inquiry.responded).length} icon="mail" />
                  <StatsCard label="Messages" value={inquiries.length} icon="forum" />
                </div>
                <div id="create-listing" className="scroll-mt-24 rounded-[1.5rem] border border-outline-variant bg-white p-6 shadow-soft">
                  <div className="mb-stack-md">
                    <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">New listing</p>
                    <h3 className="text-headline-md font-semibold text-primary">Publish a property</h3>
                  </div>
                  <CreatePropertyForm onCreated={handleCreated} />
                </div>
              </>
            ) : null}

            {view === 'listings' ? (
              listings.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  {listings.map((property) => (
                    <ListingCard key={property.id} property={property} onDelete={() => handleDelete(property.id)} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-outline-variant bg-white p-10 text-center shadow-soft">
                  <p className="text-headline-sm font-semibold text-on-surface">No listings yet</p>
                  <p className="mt-1 text-body-sm text-on-surface-variant">Create your first listing from the dashboard.</p>
                </div>
              )
            ) : null}

            {view === 'inquiries' ? (
              inquiries.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  {inquiries.map((inquiry) => (
                    <InquiryCard key={inquiry.id} inquiry={inquiry} onRespond={() => handleRespond(inquiry.id)} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-outline-variant bg-white p-10 text-center shadow-soft">
                  <p className="text-headline-sm font-semibold text-on-surface">No inquiries</p>
                  <p className="mt-1 text-body-sm text-on-surface-variant">Messages from students will appear here.</p>
                </div>
              )
            ) : null}

            {view === 'account' ? <AccountForm /> : null}
          </section>
        </div>
      </main>
    </div>
  );
}
