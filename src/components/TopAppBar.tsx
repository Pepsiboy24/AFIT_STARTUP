'use client';

import Link from 'next/link';
import { useState } from 'react';
import LogoutModal from './LogoutModal';

interface TopAppBarProps {
  title?: string;
  subtitle?: string;
  showProfile?: boolean;
  showNotifications?: boolean;
  showLogout?: boolean;
  role?: 'student' | 'landlord';
  userName?: string;
}

export default function TopAppBar({
  title = 'Academic Abodes',
  subtitle = 'Academic Abodes',
  showProfile = true,
  showNotifications = true,
  showLogout = true,
  role = 'student',
  userName = 'Alex',
}: TopAppBarProps) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/95 border-b border-outline-variant/60 px-margin-mobile py-3 md:px-margin-desktop backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-container-max items-center justify-between gap-4">
          <Link href={role === 'landlord' ? '/landlord' : '/dashboard'} className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-soft transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant">{subtitle}</p>
              <h1 className="text-headline-sm font-bold text-primary">{title}</h1>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            {showNotifications ? (
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/50 text-on-surface-variant transition-colors hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
            ) : null}

            {/* Profile Link */}
            {showProfile ? (
              <Link
                href={role === 'landlord' ? '/landlord' : '/dashboard'}
                className="hidden items-center gap-2 rounded-full border border-outline-variant/50 bg-white px-3.5 py-1.5 text-on-surface transition-colors hover:bg-surface-container-low md:flex"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {userName.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-label-md font-semibold">{userName}</span>
              </Link>
            ) : null}

            {/* Logout Button */}
            {showLogout ? (
              <button
                type="button"
                onClick={() => setIsLogoutOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-error/30 bg-error/5 px-3 py-2 text-label-sm font-semibold text-error hover:bg-error hover:text-white transition-all"
                title="Log out"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span className="hidden sm:inline">Log Out</span>
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} userName={userName} />
    </>
  );
}
