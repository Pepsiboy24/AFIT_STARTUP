import Link from 'next/link';
import TopAppBar from '@/components/TopAppBar';
import BottomNav from '@/components/BottomNav';
import { upcomingAppointments } from '@/lib/data/dashboard';

interface MockBooking {
  property: { title: string; location: string; image: string };
  status: string;
  rent: string;
  nextDue: string;
}

const mockBooking: MockBooking | null = null;

export default function DashboardPage() {
  if (!mockBooking) {
    return (
      <div className="min-h-screen bg-background text-on-background pb-20">
        <TopAppBar title="My Booking" showProfile={false} />
        <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-[1.5rem] border border-outline-variant bg-white p-10 text-center shadow-soft">
            <span className="material-symbols-outlined text-[56px] text-on-surface-variant">home</span>
            <h2 className="mt-4 text-headline-md font-semibold text-on-surface">You haven&apos;t booked a home yet</h2>
            <p className="mt-2 max-w-sm text-body-md text-on-surface-variant">
              Browse available student residences and book your perfect room.
            </p>
            <Link
              href="/search"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-body-md font-semibold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="material-symbols-outlined text-base">explore</span> Browse homes
            </Link>
          </div>
        </main>
        <BottomNav activePath="/dashboard" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background pb-20">
      <TopAppBar title="My Booking" showProfile={false} />
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <section className="space-y-6">
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <img
                src={mockBooking.property.image}
                alt={mockBooking.property.title}
                className="h-40 w-40 rounded-3xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">Booked property</p>
                <h2 className="mt-1 text-headline-md font-bold text-primary">{mockBooking.property.title}</h2>
                <p className="text-body-md text-on-surface-variant">{mockBooking.property.location}</p>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-label-sm font-semibold text-on-secondary-container">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  {mockBooking.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1rem] bg-white p-5 shadow-soft border border-outline-variant">
              <p className="text-label-sm text-on-surface-variant">Monthly rent</p>
              <p className="mt-3 text-headline-sm font-semibold text-primary">{mockBooking.rent}</p>
            </div>
            <div className="rounded-[1rem] bg-white p-5 shadow-soft border border-outline-variant">
              <p className="text-label-sm text-on-surface-variant">Next due date</p>
              <p className="mt-3 text-headline-sm font-semibold text-primary">{mockBooking.nextDue}</p>
            </div>
            <div className="rounded-[1rem] bg-white p-5 shadow-soft border border-outline-variant">
              <p className="text-label-sm text-on-surface-variant">Lease status</p>
              <p className="mt-3 text-headline-sm font-semibold text-primary">{mockBooking.status}</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant">
            <p className="text-label-sm uppercase tracking-[0.25em] text-on-surface-variant">Upcoming appointments</p>
            <h3 className="mt-2 text-headline-md font-semibold text-primary">Scheduled viewings</h3>
            <div className="mt-4 space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.property} className="flex items-center justify-between gap-3 rounded-[1rem] bg-surface p-4">
                  <div>
                    <p className="text-body-md font-semibold text-on-surface">{appointment.property}</p>
                    <p className="text-body-sm text-on-surface-variant">{appointment.date} &middot; {appointment.time}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-primary text-white px-3 py-1 text-label-sm font-semibold">
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <BottomNav activePath="/dashboard" />
    </div>
  );
}
