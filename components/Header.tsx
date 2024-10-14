"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Calendar', href: '/calendar' },
  { name: 'Reminders', href: '/reminders' },
  { name: 'Notes', href: '/notes' },
  { name: 'Vocabulary', href: '/vocabulary' },
  { name: 'Service Hours', href: '/service-hours' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-pink-500">Rishika's Planner</Link>
          <button
            className="md:hidden text-pink-500 hover:text-pink-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="w-6 h-6" />
            ) : (
              <Menu size={24} className="w-6 h-6" />
            )}
          </button>
          <ul className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-pink-500 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium",
                    pathname === item.href && "bg-pink-100 text-pink-700"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {isMenuOpen && (
          <ul className="mt-4 space-y-2 md:hidden">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "block text-pink-500 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium",
                    pathname === item.href && "bg-pink-100 text-pink-700"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}