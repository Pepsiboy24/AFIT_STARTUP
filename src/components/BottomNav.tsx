import Link from 'next/link';

interface BottomNavProps {
  activePath: string;
}

const navItems = [
  { label: 'Browse Homes', icon: 'explore', href: '/search' },
  { label: 'My Booking', icon: 'calendar_month', href: '/dashboard' },
];

export default function BottomNav({ activePath }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/70 bg-surface px-6 py-3 backdrop-blur-sm shadow-soft">
      {navItems.map((item) => {
        const isActive = activePath === item.href || (item.href === '/dashboard' && activePath.startsWith('/dashboard'));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 rounded-full px-6 py-2 transition-colors ${
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
