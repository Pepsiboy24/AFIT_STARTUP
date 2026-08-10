import Link from 'next/link';

interface BottomNavProps {
  activePath: string;
}

const navItems = [
  { label: 'Home', icon: 'home', href: '/dashboard' },
  { label: 'Search', icon: 'search', href: '/search' },
  { label: 'Saved', icon: 'bookmark', href: '/dashboard' },
  { label: 'Profile', icon: 'person', href: '/dashboard' },
];

export default function BottomNav({ activePath }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 hidden md:flex items-center justify-around border-t border-outline-variant/70 bg-surface px-6 py-3 shadow-soft">
      {navItems.map((item) => {
        const isActive = activePath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 rounded-full px-4 py-2 transition-colors ${
              isActive ? 'bg-secondary text-white' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-label-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
