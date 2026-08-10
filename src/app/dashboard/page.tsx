import TopAppBar from '@/components/TopAppBar';
import type { Property } from '@/types/property';
import { properties } from '@/lib/data/properties';
import { userSummary, upcomingAppointments, quickActions } from '@/lib/data/dashboard';

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[1rem] bg-white p-5 shadow-soft border border-outline-variant">
      <p className="text-label-sm text-on-surface-variant">{title}</p>
      <p className="mt-3 text-headline-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

function PropertyPreview({ property }: { property: Property }) {
  return (
    <div className="rounded-[1rem] bg-white p-5 shadow-soft border border-outline-variant">
      <div className="flex items-start gap-4">
        <img src={property.image} alt={property.title} className="h-24 w-24 rounded-3xl object-cover" />
        <div className="min-w-0">
          <p className="text-label-sm text-on-surface-variant">Upcoming visit</p>
          <h3 className="text-headline-sm font-semibold text-on-surface">{property.title}</h3>
          <p className="text-body-sm text-on-surface-variant">{property.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <TopAppBar title="Welcome back, Alex" showProfile={false} />
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <section className="mb-stack-lg">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-headline-lg font-bold text-primary">Welcome back, {userSummary.name}</h2>
              <p className="text-body-md text-on-surface-variant">Here's what's happening with your student housing search.</p>
            </div>
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-3 mb-stack-lg">
          {quickActions.map((action) => (
            <SummaryCard key={action.label} title={action.label} value={action.value} />
          ))}
        </section>
        <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4 rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">Applications</p>
                <h3 className="text-headline-md font-semibold text-primary">Active today</h3>
              </div>
              <span className="rounded-full bg-secondary-container px-3 py-1 text-label-sm font-semibold text-on-secondary-container">{userSummary.role}</span>
            </div>
            <div className="grid gap-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.property} className="rounded-[1.25rem] bg-surface p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-body-md font-semibold text-on-surface">{appointment.property}</p>
                      <p className="text-body-sm text-on-surface-variant">{appointment.date} · {appointment.time}</p>
                    </div>
                    <span className="rounded-full bg-primary text-white px-3 py-1 text-label-sm font-semibold">{appointment.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">Saved homes</p>
                <h3 className="text-headline-md font-semibold text-primary">Keep exploring</h3>
              </div>
            </div>
            <div className="grid gap-4">
              {properties.slice(0, 2).map((property) => (
                <PropertyPreview key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
