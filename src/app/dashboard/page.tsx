'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import StudentNavbar from '@/components/StudentNavbar';
import BottomNav from '@/components/BottomNav';
import PropertyCard from '@/components/PropertyCard';
import LogoutModal from '@/components/LogoutModal';
import type { Property } from '@/types/property';
import { properties } from '@/lib/data/properties';
import { userSummary, upcomingAppointments, quickActions } from '@/lib/data/dashboard';

function DashboardContent() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  return (
    <div className="min-h-screen bg-background text-on-background pb-20 md:pb-12">
      {/* Student Portal Navigation Bar */}
      <StudentNavbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        {/* Welcome Section */}
        <section className="mb-stack-md flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-label-sm font-semibold text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Verified Student Account
              </span>
              <span className="text-outline-variant">•</span>
              <span className="text-label-sm text-on-surface-variant">University College London</span>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-primary mt-1">
              Welcome back, {userSummary.name}
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Manage your applications, upcoming viewings, and campus housing preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-label-md font-semibold text-white shadow-soft transition-all hover:bg-primary-container active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              <span>Find New Abode</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-error/30 bg-white px-3.5 py-2.5 text-label-md font-semibold text-error hover:bg-error-container/30 transition-all active:scale-95"
              title="Sign out of account"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </section>

        {/* Tab Selector Pill Bar */}
        <div className="mb-stack-md flex gap-2 overflow-x-auto border-b border-outline-variant/40 pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: 'dashboard' },
            { id: 'saved', label: `Saved Homes (${userSummary.savedProperties})`, icon: 'bookmark' },
            { id: 'applications', label: `Applications (${userSummary.activeApplications})`, icon: 'description' },
            { id: 'messages', label: 'Messages (5)', icon: 'chat' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-label-md font-semibold transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ================= TABS CONTENT ================= */}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-stack-md">
            {/* Quick Metrics Cards */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[1.25rem] bg-white p-5 shadow-soft border border-outline-variant/60 flex items-center justify-between">
                <div>
                  <p className="text-label-sm font-medium text-on-surface-variant">Active Applications</p>
                  <p className="mt-1 text-headline-md font-bold text-primary">{userSummary.activeApplications}</p>
                  <p className="text-[12px] text-secondary font-medium mt-1">1 Approved • 3 Under Review</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[26px]">description</span>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white p-5 shadow-soft border border-outline-variant/60 flex items-center justify-between">
                <div>
                  <p className="text-label-sm font-medium text-on-surface-variant">Saved Abodes</p>
                  <p className="mt-1 text-headline-md font-bold text-primary">{userSummary.savedProperties}</p>
                  <p className="text-[12px] text-secondary font-medium mt-1">Near UCL campus</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined text-[26px]">bookmark</span>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white p-5 shadow-soft border border-outline-variant/60 flex items-center justify-between">
                <div>
                  <p className="text-label-sm font-medium text-on-surface-variant">Upcoming Viewings</p>
                  <p className="mt-1 text-headline-md font-bold text-primary">2</p>
                  <p className="text-[12px] text-primary font-medium mt-1">Next: Tomorrow 2:30 PM</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-on-primary-fixed">
                  <span className="material-symbols-outlined text-[26px]">calendar_month</span>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white p-5 shadow-soft border border-outline-variant/60 flex items-center justify-between">
                <div>
                  <p className="text-label-sm font-medium text-on-surface-variant">Verification Status</p>
                  <p className="mt-1 text-headline-sm font-bold text-secondary">100% Verified</p>
                  <p className="text-[12px] text-on-surface-variant mt-1">Student status confirmed</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                  <span className="material-symbols-outlined text-[26px]">verified_user</span>
                </div>
              </div>
            </section>

            {/* Main Content Grid: Applications + Viewings & Saved */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left Column (8 cols): Applications & Saved */}
              <div className="lg:col-span-8 space-y-6">
                {/* Active Applications Card */}
                <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-headline-sm font-bold text-primary">Active Rental Applications</h3>
                      <p className="text-body-sm text-on-surface-variant">Track your application approvals and landlord responses.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-label-md font-semibold text-secondary hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* App 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-outline-variant/50 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/property-1.svg"
                          alt="The Ivy Suites"
                          className="h-16 w-20 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-label-md font-bold text-on-surface">The Ivy Suites - Studio B</h4>
                          <p className="text-body-sm text-on-surface-variant">Bloomsbury • Applied 2 days ago</p>
                          <p className="text-[12px] font-semibold text-primary">£1,820/mo</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1.5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-semibold">
                          <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                          Under Review
                        </span>
                        <div className="w-full sm:w-28 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="bg-secondary h-full w-[65%]"></div>
                        </div>
                      </div>
                    </div>

                    {/* App 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-outline-variant/50 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/property-2.svg"
                          alt="Cambridge Heights"
                          className="h-16 w-20 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-label-md font-bold text-on-surface">Cambridge Heights - 4 Bed Share</h4>
                          <p className="text-body-sm text-on-surface-variant">Soho • Applied 1 week ago</p>
                          <p className="text-[12px] font-semibold text-primary">£1,680/mo</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1.5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-label-sm font-semibold">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Approved
                        </span>
                        <div className="w-full sm:w-28 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="bg-primary h-full w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Saved Homes Preview */}
                <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-headline-sm font-bold text-primary">Saved Homes</h3>
                      <p className="text-body-sm text-on-surface-variant">Abodes you bookmarked for consideration.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('saved')}
                      className="text-label-md font-semibold text-secondary hover:underline"
                    >
                      See All ({userSummary.savedProperties})
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {properties.slice(0, 2).map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Appointments, Verification & Logout Card */}
              <div className="lg:col-span-4 space-y-6">
                {/* Upcoming Viewings */}
                <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-headline-sm font-bold text-primary">Upcoming Viewings</h3>
                    <span className="material-symbols-outlined text-primary">event</span>
                  </div>

                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.property}
                        className="rounded-xl border-l-4 border-secondary bg-surface p-3.5 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-label-md font-bold text-on-surface">{appointment.property}</p>
                            <p className="text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                              <span className="material-symbols-outlined text-[14px]">schedule</span>
                              {appointment.date} • {appointment.time}
                            </p>
                          </div>
                          <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-bold text-on-secondary-container">
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Identity Verified Badge Banner */}
                <div className="rounded-[1.5rem] bg-primary p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-container text-[28px]">verified_user</span>
                      <span className="text-label-md font-bold tracking-wide uppercase text-primary-fixed">Verified Student</span>
                    </div>
                    <h4 className="text-headline-sm font-bold">Identity Confirmed</h4>
                    <p className="text-body-sm text-white/80">
                      Your UCL student status is confirmed. Verified students are 3x more likely to be accepted by landlords.
                    </p>
                  </div>
                  <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[140px]">school</span>
                  </div>
                </div>

                {/* Student Session & Logout Card */}
                <div className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-low text-primary font-bold text-lg">
                      AS
                    </div>
                    <div>
                      <p className="text-body-md font-bold text-on-surface">{userSummary.name} Smith</p>
                      <p className="text-label-sm text-on-surface-variant">alex@university.edu</p>
                    </div>
                  </div>
                  <div className="border-t border-outline-variant/40 pt-4 flex flex-col gap-2">
                    <Link
                      href="/landlord"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-label-md text-secondary hover:bg-secondary/10 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                        Switch to Landlord Portal
                      </span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsLogoutModalOpen(true)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-label-md font-semibold text-error hover:bg-error-container/40 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Sign Out of Session
                      </span>
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SAVED HOMES */}
        {activeTab === 'saved' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-headline-md font-bold text-primary">Your Saved Abodes</h2>
                <p className="text-body-md text-on-surface-variant">
                  Properties you have bookmarked for quick comparison and viewing requests.
                </p>
              </div>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-label-md font-semibold text-white hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                Explore More
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-headline-md font-bold text-primary">Student Applications</h2>
              <p className="text-body-md text-on-surface-variant">
                Check real-time status, upload requested documents, and message landlords.
              </p>
            </div>

            <div className="space-y-4">
              {properties.map((property, idx) => (
                <div
                  key={property.id}
                  className="rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="h-20 w-24 rounded-2xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-headline-sm font-bold text-on-surface">{property.title}</h3>
                          <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-bold text-on-secondary-container">
                            {idx === 0 ? 'Under Review' : idx === 1 ? 'Approved' : 'Documents Requested'}
                          </span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant">{property.location} • {property.nearCampus}</p>
                        <p className="text-body-md font-bold text-primary mt-1">{property.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/properties/${property.id}`}
                        className="rounded-xl border border-outline-variant bg-surface px-4 py-2 text-label-md font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        View Listing
                      </Link>
                      <button
                        type="button"
                        onClick={() => setActiveTab('messages')}
                        className="rounded-xl bg-primary px-4 py-2 text-label-md font-semibold text-white hover:bg-primary-container transition-colors"
                      >
                        Message Landlord
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-headline-md font-bold text-primary">Landlord Inquiries & Messages</h2>
              <p className="text-body-md text-on-surface-variant">
                Direct chat with property managers and landlords about rent, bills, and move-in dates.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white p-4 shadow-soft border border-outline-variant/60 space-y-2">
                {properties.map((property, idx) => (
                  <div
                    key={property.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                      idx === 0 ? 'bg-surface-container-low border border-primary/20' : 'hover:bg-surface'
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-white font-bold text-xs">
                      {property.hostName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-label-md font-bold text-on-surface truncate">{property.hostName}</p>
                        <span className="text-[11px] text-on-surface-variant">2h ago</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant truncate">{property.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2 rounded-[1.5rem] bg-white p-6 shadow-soft border border-outline-variant/60 flex flex-col justify-between min-h-[400px]">
                <div className="border-b border-outline-variant/40 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                      OM
                    </div>
                    <div>
                      <p className="text-body-md font-bold text-on-surface">Olivia Martin</p>
                      <p className="text-label-sm text-secondary font-semibold">Landlord • The Scholars Residence</p>
                    </div>
                  </div>
                  <Link
                    href="/properties/the-scholars-residence"
                    className="text-label-sm text-primary font-semibold hover:underline"
                  >
                    View Property
                  </Link>
                </div>

                <div className="space-y-4 py-6">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold flex-shrink-0">
                      OM
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-surface p-4 max-w-md border border-outline-variant/50">
                      <p className="text-body-sm text-on-surface">
                        Hi Alex! Yes, high-speed fiber WiFi and all water bills are fully included in the monthly rent. Would you like to view the study pods as well during your tour?
                      </p>
                      <span className="text-[10px] text-on-surface-variant mt-1 block">10:45 AM</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <div className="rounded-2xl rounded-tr-none bg-primary text-white p-4 max-w-md">
                      <p className="text-body-sm">
                        That sounds fantastic! Yes please, I would love to check out the study lounge and study pods tomorrow at 2:30 PM.
                      </p>
                      <span className="text-[10px] text-white/70 mt-1 block text-right">11:02 AM</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-outline-variant/40 pt-4">
                  <input
                    type="text"
                    placeholder="Type your message to Olivia..."
                    className="flex-1 rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Floating Navigation for Mobile */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        userName={userSummary.name}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background p-8 text-center">Loading student dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
