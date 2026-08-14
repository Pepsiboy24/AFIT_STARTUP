'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export default function LogoutModal({ isOpen, onClose, userName = 'Alex' }: LogoutModalProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isOpen) return null;

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Clear any local storage/session if stored
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_session');
      localStorage.removeItem('auth_token');
    }
    setTimeout(() => {
      setIsLoggingOut(false);
      onClose();
      router.push('/login');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] bg-white p-6 shadow-2xl border border-outline-variant/60 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-error-container text-error">
            <span className="material-symbols-outlined text-[26px]">logout</span>
          </div>
          <div className="flex-1">
            <h3 className="text-headline-sm font-bold text-on-surface">Confirm Sign Out</h3>
            <p className="mt-1 text-body-sm text-on-surface-variant">
              Are you sure you want to log out, <span className="font-semibold text-primary">{userName}</span>? You will need to log back in to access your saved homes and applications.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingOut}
            className="inline-flex items-center justify-center rounded-xl border border-outline-variant bg-surface px-5 py-2.5 text-body-md font-semibold text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-error px-5 py-2.5 text-body-md font-semibold text-white hover:bg-error/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {isLoggingOut ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                <span>Signing out...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Log Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
