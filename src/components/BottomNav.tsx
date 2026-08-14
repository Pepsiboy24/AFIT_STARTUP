'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import LogoutModal from './LogoutModal';

interface BottomNavProps {
  activePath?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function BottomNav({ activePath, activeTab, onTabChange }: BottomNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = activeTab || searchParams.get('tab') || 'overview';
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const navItems = [
    {
      label: 'Home',
      icon: 'home',
      href: '/dashboard',
      id: 'overview',
      isRoute: true,
    },
    {
      label: 'Search',
      icon: 'search',
      href: '/search',
      id: 'search',
      isRoute: true,
    },
    {
      label: 'Saved',
      icon: 'bookmark',
      href: '/dashboard?tab=saved',
      id: 'saved',
    },
    {
      label: 'Apps',
      icon: 'description',
      href: '/dashboard?tab=applications',
      id: 'applications',
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-around border-t border-outline-variant/60 bg-surface/95 px-2 py-2 shadow-lg backdrop-blur-lg">
        {navItems.map((item) => {
          const isActive = item.isRoute
            ? item.id === 'overview'
              ? pathname === '/dashboard' && currentTab === 'overview'
              : pathname.startsWith(item.href)
            : pathname === '/dashboard' && currentTab === item.id;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (onTabChange && pathname === '/dashboard' && !item.isRoute) {
                  e.preventDefault();
                  onTabChange(item.id);
                }
              }}
              className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 transition-all active:scale-95 ${
                isActive
                  ? 'bg-primary text-white font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Quick Mobile Logout Action */}
        <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-error hover:bg-error-container/40 transition-all active:scale-95"
          aria-label="Log out"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-[11px] font-medium">Log Out</span>
        </button>
      </nav>

      {/* Logout Modal */}
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </>
  );
}
