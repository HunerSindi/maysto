'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { LogOut, Globe, Trees, Armchair, Layers, Users, Code } from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  colorClass: string; // Background color
  borderClass: string; // Border color for depth
  icon: any;
  desc: string;
}

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  const menuItems: MenuItem[] = [
    {
      name: 'Wood Company',
      href: '/wood_company',
      colorClass: 'bg-amber-700 hover:bg-amber-800',
      borderClass: 'border-amber-900',
      icon: Trees,
      desc: 'Timber & Raw Materials'
    },
    {
      name: 'Chair Company',
      href: '/chair_company',
      colorClass: 'bg-red-700 hover:bg-red-800',
      borderClass: 'border-red-900',
      icon: Armchair,
      desc: 'Furniture Production'
    },
    {
      name: 'Ceramic Company',
      href: '/ciramic_company',
      colorClass: 'bg-blue-700 hover:bg-blue-800',
      borderClass: 'border-blue-900',
      icon: Layers,
      desc: 'Tiles & Flooring'
    },
    {
      name: 'Personal Management',
      href: '/personal_management',
      colorClass: 'bg-green-700 hover:bg-green-800',
      borderClass: 'border-green-900',
      icon: Users,
      desc: 'Private Accounts'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">

      {/* --- CLASSIC HEADER --- */}
      <header className="bg-gray-800 h-[52px] px-4 flex justify-between items-center sticky top-0 z-50 shadow-md border-b border-gray-900">

        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 border border-gray-600 flex items-center justify-center rounded-sm">
            <span className="text-white font-serif font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-white font-bold uppercase tracking-widest text-sm leading-tight">Maysto</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Enterprise Manager</p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">

          {/* Language Selector (Visual Only) */}
          <div className="flex items-center bg-gray-700 border border-gray-600 rounded-sm px-2 h-8">
            <Globe size={14} className="text-gray-400 mr-2" />
            <select className="bg-transparent text-white text-xs font-bold uppercase outline-none cursor-pointer">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ku">Kurdish</option>
            </select>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-3 h-8 text-xs font-bold uppercase border border-red-900 rounded-sm transition-colors shadow-sm"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* --- MAIN DASHBOARD GRID --- */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl">
          <h2 className="text-gray-500 font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2">
            Select Module
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative group overflow-hidden h-32 flex items-center px-6 
                  ${item.colorClass} border-b-4 ${item.borderClass} 
                  shadow-md hover:shadow-xl transition-all duration-200 rounded-sm
                `}
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                  <item.icon size={32} className="text-white opacity-90" />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white uppercase tracking-tight shadow-black drop-shadow-sm">
                    {item.name}
                  </span>
                  <span className="text-xs text-white/70 uppercase font-medium tracking-wider mt-1">
                    {item.desc}
                  </span>
                </div>

                {/* Hover Effect Arrow */}
                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl font-bold">
                  &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-300 py-3 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase">
          <div>
            &copy; 2025 Maysto Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Code size={12} />
            <a
              href="https://instagram.com/hunersindi"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wider"
            >
              About Developer
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}