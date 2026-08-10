import Link from 'next/link';

interface TopAppBarProps {
  title?: string;
  showProfile?: boolean;
  showNotifications?: boolean;
}

export default function TopAppBar({ title = 'Academic Abodes', showProfile = true, showNotifications = true }: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant/50 px-margin-mobile py-base md:px-margin-desktop backdrop-blur-sm">
      <div className="mx-auto flex max-w-container-max items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[28px]">school</span>
          <div>
            <p className="text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">Academic Abodes</p>
            <h1 className="text-headline-sm font-bold text-primary">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {showNotifications ? (
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          ) : null}
          {showProfile ? (
            <Link href="/dashboard" className="hidden items-center gap-2 rounded-full border border-surface-container-highest bg-primary-container px-3 py-2 text-on-primary-container transition-colors hover:bg-primary/10 md:flex">
              <span className="material-symbols-outlined">person</span>
              <span className="text-label-md font-semibold">Profile</span>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
