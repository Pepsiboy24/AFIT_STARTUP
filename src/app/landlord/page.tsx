'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import LogoutModal from '@/components/LogoutModal';
import type { Property } from '@/types/property';
import { properties } from '@/lib/data/properties';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'listings', label: 'My Listings', icon: 'house_siding', badge: 12 },
  { id: 'inquiries', label: 'Student Inquiries', icon: 'chat_bubble', badge: 48 },
  { id: 'analytics', label: 'Revenue & Occupancy', icon: 'trending_up' },
  { id: 'settings', label: 'Portal Settings', icon: 'settings' },
];

const mockInquiries = [
  {
    id: 'inq-1',
    student: 'Elena Smith',
    email: 'elena.s@ucl.ac.uk',
    property: 'The Scholars Residence',
    status: 'Viewing Requested',
    statusColor: 'bg-secondary-container text-on-secondary-container',
    date: 'Today, 10:30 AM',
  },
  {
    id: 'inq-2',
    student: 'Alex Rivera',
    email: 'alex@university.edu',
    property: 'Scholar Place',
    status: 'Application Submitted',
    statusColor: 'bg-primary text-white',
    date: 'Yesterday',
  },
  {
    id: 'inq-3',
    student: 'Marcus Vance',
    email: 'marcus.v@kcl.ac.uk',
    property: 'Harbor Halls',
    status: 'Approved',
    statusColor: 'bg-secondary text-white',
    date: '3 days ago',
  },
];

function ListingCard({ property }: { property: Property }) {
  return (
    <div className="rounded-[1.5rem] border border-outline-variant/60 bg-white p-5 shadow-soft hover:shadow-md transition-all">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={property.image}
          alt={property.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-label-sm font-bold text-primary shadow-sm">
          Active Listing
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-headline-sm font-bold text-on-surface truncate">{property.title}</h3>
          <p className="text-headline-sm font-bold text-primary">{property.price}</p>
        </div>
        <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          {property.location} • {property.nearCampus}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
          <div className="flex gap-2 text-label-sm text-on-surface-variant">
            <span>{property.bedrooms} Beds</span> • <span>{property.bathrooms} Baths</span>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="text-label-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Preview <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LandlordPage() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background pb-12">
      {/* Landlord Portal Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-surface/95 border-b border-outline-variant/60 px-margin-mobile py-3 md:px-margin-desktop backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-container-max items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/landlord" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white shadow-soft">
                <span className="material-symbols-outlined text-[24px]">house</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-body-md font-bold tracking-tight text-primary">Academic Abodes</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary uppercase tracking-wider">
                    Landlord Portal
                  </span>
                </div>
                <p className="text-[11px] font-medium text-on-surface-variant">Property Management & Verified Inquiries</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Switch to Student Portal View */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/5 px-3.5 py-2 text-label-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span>Student Portal</span>
            </Link>

            {/* Notifications */}
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/60 bg-white text-on-surface-variant hover:bg-surface-container-low transition-colors"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white ring-2 ring-white">
                3
              </span>
            </button>

            {/* Landlord Profile Pill */}
            <div className="hidden md:flex items-center gap-2.5 rounded-full border border-outline-variant/60 bg-white py-1 pl-1.5 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white font-bold text-xs">
                JD
              </div>
              <div className="text-left">
                <p className="text-label-sm font-bold text-on-surface leading-none">James Doe</p>
                <span className="text-[10px] text-secondary font-semibold">Verified Landlord</span>
              </div>
            </div>

            {/* Prominent Header Logout Button */}
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-error/30 bg-error/5 px-3 py-2 text-label-sm font-semibold text-error hover:bg-error hover:text-white transition-all duration-200"
              title="Log out of Landlord Portal"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden sm:inline">Log Out</span>
            </button>

            {/* Mobile Sidebar Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/60 bg-surface text-on-surface hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileNavOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <main className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Landlord Sidebar Navigation */}
          <aside
            className={`space-y-6 rounded-[1.5rem] border border-outline-variant/60 bg-white p-5 shadow-soft ${
              isMobileNavOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div>
              <p className="text-label-sm uppercase tracking-[0.25em] font-semibold text-on-surface-variant mb-3">
                Landlord Menu
              </p>
              <div className="space-y-1.5">
                {menuItems.map((item) => {
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveMenu(item.id);
                        setIsMobileNavOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-body-md font-medium transition-all ${
                        isActive
                          ? 'bg-secondary text-white font-semibold shadow-sm'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            isActive ? 'bg-white text-secondary' : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Links */}
            <div className="border-t border-outline-variant/40 pt-4 space-y-2">
              <p className="text-label-sm uppercase tracking-[0.25em] font-semibold text-on-surface-variant mb-2">
                Quick Switch
              </p>
              <Link
                href="/dashboard"
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-body-sm font-semibold text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  Switch to Student View
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            {/* Dedicated Sidebar Logout Button */}
            <div className="border-t border-outline-variant/40 pt-4">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex w-full items-center justify-between rounded-xl bg-error/10 border border-error/30 px-4 py-3 text-body-md font-bold text-error hover:bg-error hover:text-white transition-all shadow-sm"
              >
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Log Out of Portal
                </span>
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </aside>

          {/* Landlord Main Dashboard Body */}
          <section className="space-y-6">
            {/* Header Banner */}
            <div className="rounded-[1.5rem] border border-outline-variant/60 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-label-sm uppercase tracking-[0.2em] font-semibold text-secondary">
                    Partner Overview
                  </p>
                  <h2 className="text-headline-lg font-bold text-primary mt-0.5">Welcome back, James</h2>
                  <p className="text-body-md text-on-surface-variant">
                    Manage 12 verified student listings and 48 active inquiries.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="primary" className="gap-2">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Create New Listing
                  </Button>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-[1.25rem] bg-white p-5 shadow-soft border border-outline-variant/60 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-label-md font-medium text-on-surface-variant">Total Listings</span>
                  <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-xl text-[22px]">
                    house_siding
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-headline-lg font-bold text-primary">12</span>
                  <p className="text-body-sm text-secondary font-medium mt-0.5">8 Active • 4 In Review</p>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white p-5 shadow-soft border border-outline-variant/60 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-label-md font-medium text-on-surface-variant">Active Inquiries</span>
                  <span className="material-symbols-outlined text-secondary p-2 bg-secondary-container rounded-xl text-[22px]">
                    chat_bubble
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-headline-lg font-bold text-secondary">48</span>
                  <p className="text-body-sm text-secondary font-medium mt-0.5">+12 since yesterday</p>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white p-5 shadow-soft border border-outline-variant/60 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-label-md font-medium text-on-surface-variant">Monthly Revenue</span>
                  <span className="material-symbols-outlined text-tertiary p-2 bg-tertiary-fixed rounded-xl text-[22px]">
                    payments
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-headline-lg font-bold text-primary">£9.4k</span>
                  <p className="text-body-sm text-on-surface-variant font-medium mt-0.5">94% Occupancy Rate</p>
                </div>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-[1.5rem] border border-outline-variant/60 bg-white p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-headline-sm font-bold text-primary">Recent Student Inquiries</h3>
                  <p className="text-body-sm text-on-surface-variant">Direct viewing requests from verified university students.</p>
                </div>
                <span className="text-label-md font-semibold text-secondary cursor-pointer hover:underline">
                  View All (48)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/40 bg-surface-container-low text-label-sm text-on-surface-variant">
                      <th className="py-3 px-4 rounded-l-xl">Student</th>
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-body-sm">
                    {mockInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-on-surface">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-xs text-on-secondary-container">
                              {inq.student.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="leading-none">{inq.student}</p>
                              <p className="text-xs text-on-surface-variant font-normal">{inq.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-on-surface">{inq.property}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${inq.statusColor}`}>
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            className="rounded-lg bg-surface px-3 py-1.5 text-label-sm font-semibold text-primary border border-outline-variant/60 hover:bg-surface-container-low transition-colors"
                          >
                            Respond
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-headline-sm font-bold text-primary">Your Listed Properties</h3>
                <span className="text-label-md font-semibold text-secondary cursor-pointer hover:underline">
                  Manage All
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {properties.map((property) => (
                  <ListingCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        userName="James Doe"
      />
    </div>
  );
}
