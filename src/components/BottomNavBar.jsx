import React from 'react';
import { Home, Users, Calendar, Image, MessageSquare } from 'lucide-react';

export default function BottomNavBar({ isOpened }) {
  if (!isOpened) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'couple', label: 'Couple', icon: Users },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'moment', label: 'Moment', icon: Image },
    { id: 'guestbook', label: 'Wishes', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-full shadow-2xl px-3 py-1.5 flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100/80 transition-all duration-200"
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
