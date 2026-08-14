'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import LogoutModal from './LogoutModal';
import { userSummary } from '@/lib/data/dashboard';

interface StudentNavbarProps {
  title?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const mockNotifications = [
  {
    id: 1,
    title: 'Application Approved!',
    description: 'Your application for Cambridge Heights has been approved by the landlord.',
    time: '10m ago',
    unread: true,
    icon: 'check_circle',
    iconColor: 'text-secondary',
  },
  {
    id: 2,
    title: 'Viewing Reminder',
    description: 'Upcoming viewing for The Scholars Residence tomorrow at 2:30 PM.',
    time: '2h ago',
    unread: true,
    icon: 'schedule',
    iconColor: 'text-primary',
  },
  {
    id: 3,
    title: 'New Message',
    description: 'Olivia Martin sent you a message regarding utility inclusions.',
    time: 'Yesterday',
    unread: false,
    icon: 'chat',
    iconColor: 'text-tertiary',
  },
];

export default function StudentNavbar({ title, activeTab, onTabChange }: StudentNavbarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = activeTab || searchParams.get('tab') || 'overview';

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const navLinks = [
    {
      id: 'overview',
      label: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
      isRoute: true,
      exactMatch: true,
    },
    {
      id: 'search',
      label: 'Find Abodes',
      href: '/search',
      icon: 'search',
      isRoute: true,
    },
    {
      id: 'saved',
      label: 'Saved Homes',
      href: '/dashboard?tab=saved',
      icon: 'bookmark',
      badge: userSummary.savedProperties,
    },
    {
      id: 'applications',
      label: 'Applications',
      href: '/dashboard?tab=applications',
      icon: 'description',
      badge: userSummary.activeApplications,
    },
    {
      id: 'messages',
      label: 'Messages',
      href: '/dashboard?tab=messages',
      icon: 'chat',
      badge: 5,
    },
  ];

  const handleLinkClick = (item: (typeof navLinks)[0], e?: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (onTabChange && pathname === '/dashboard' && !item.isRoute) {
      if (e) e.preventDefault();
      onTabChange(item.id);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-outline-variant/60 bg-surface/95 backdrop-blur-md transition-all shadow-sm">
        <div className="mx-auto flex max-w-container-max items-center justify-between px-margin-mobile py-3 md:px-margin-desktop">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 rounded-xl text-primary transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="text-body-md font-bold tracking-tight text-primary">Academic Abodes</span>
                  <span className="rounded-full bg-secondary-container px-2 py-0.5 text-[11px] font-semibold text-on-secondary-container uppercase tracking-wider">
                    Student Portal
                  </span>
                </div>
                <p className="text-[11px] font-medium text-on-surface-variant">Verified Student Housing Network</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-outline-variant/50 bg-surface-container-lowest/80 p-1.5 shadow-sm backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? link.exactMatch
                  ? pathname === link.href && currentTab === 'overview'
                  : pathname.startsWith(link.href)
                : pathname === '/dashboard' && currentTab === link.id;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link, e)}
                  className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-label-md font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-sm font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span
                      className={`ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                        isActive
                          ? 'bg-white text-primary'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Switcher, Notifications, Profile, Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Switch to Landlord Portal */}
            <Link
              href="/landlord"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-xl border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-label-sm font-semibold text-secondary hover:bg-secondary hover:text-white transition-all duration-200"
              title="Switch to Landlord Portal view"
            >
              <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
              <span>Landlord Portal</span>
            </Link>

            {/* Notifications Center */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/60 transition-all ${
                  isNotificationsOpen
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`}
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 overflow-hidden rounded-[1.25rem] border border-outline-variant/60 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="flex items-center justify-between border-b border-outline-variant/40 bg-surface px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface text-body-md">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsAsRead}
                        className="text-label-sm text-secondary hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 divide-y divide-outline-variant/30 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`flex gap-3 p-3.5 transition-colors hover:bg-surface-container-low/60 ${
                          item.unread ? 'bg-surface-container-low/30' : ''
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[22px] ${item.iconColor}`}>
                          {item.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-label-md font-semibold text-on-surface truncate">{item.title}</p>
                            <span className="text-[11px] text-on-surface-variant flex-shrink-0">{item.time}</span>
                          </div>
                          <p className="mt-0.5 text-body-sm text-on-surface-variant line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className={`flex items-center gap-2 rounded-full border border-outline-variant/60 p-1 pr-3 transition-all ${
                  isProfileOpen
                    ? 'bg-primary-container text-white'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                }`}
                aria-label="User profile menu"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs shadow-inner">
                  AS
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-label-sm font-bold leading-none">{userSummary.name}</p>
                  <span className="text-[10px] text-secondary font-semibold">Verified Student</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
              </button>

              {/* Profile Menu Popover */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-[1.25rem] border border-outline-variant/60 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="border-b border-outline-variant/40 bg-surface-container-low/40 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                        AS
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-body-md font-bold text-on-surface truncate">{userSummary.name} Smith</p>
                        <p className="text-label-sm text-on-surface-variant truncate">alex@university.edu</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-secondary-container/50 px-2.5 py-1 text-on-secondary-container text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                      <span>Identity 100% Verified</span>
                    </div>
                  </div>

                  <div className="p-2 space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary">dashboard</span>
                      <span>Student Dashboard</span>
                    </Link>
                    <Link
                      href="/search"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary">search</span>
                      <span>Explore Abodes</span>
                    </Link>
                    <Link
                      href="/landlord"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-label-md text-secondary hover:bg-secondary/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                      <span>Switch to Landlord Portal</span>
                    </Link>
                  </div>

                  {/* Explicit Logout Button in Profile Menu */}
                  <div className="border-t border-outline-variant/40 p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-label-md font-semibold text-error hover:bg-error-container/40 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Prominent Direct Logout Button (Desktop) */}
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-error/30 bg-error/5 px-3 py-2 text-label-sm font-semibold text-error hover:bg-error hover:text-white transition-all duration-200"
              title="Sign out of student account"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden lg:inline">Log Out</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/60 bg-surface text-on-surface hover:bg-surface-container-low transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-outline-variant/50 bg-white px-margin-mobile py-4 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* Student User Details in Mobile Drawer */}
            <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                  AS
                </div>
                <div>
                  <p className="text-body-md font-bold text-on-surface">{userSummary.name} (Student)</p>
                  <p className="text-label-sm text-secondary flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    100% Identity Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = link.isRoute
                  ? link.exactMatch
                    ? pathname === link.href && currentTab === 'overview'
                    : pathname.startsWith(link.href)
                  : pathname === '/dashboard' && currentTab === link.id;

                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link, e)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-body-md font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white font-semibold shadow-sm'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                      <span>{link.label}</span>
                    </div>
                    {link.badge ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          isActive
                            ? 'bg-white text-primary'
                            : 'bg-secondary-container text-on-secondary-container'
                        }`}
                      >
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>

            {/* Landlord Portal Link in Mobile */}
            <Link
              href="/landlord"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-2.5 text-body-md font-semibold text-secondary hover:bg-secondary hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                <span>Switch to Landlord Portal</span>
              </div>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>

            {/* Prominent Full-Width Logout Button for Mobile */}
            <div className="pt-2 border-t border-outline-variant/40">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLogoutModalOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-error/10 border border-error/30 py-3 text-body-md font-bold text-error hover:bg-error hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Log Out of Student Portal</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        userName={userSummary.name}
      />
    </>
  );
}
