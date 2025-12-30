'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { LogOut, Globe, Trees, Armchair, Layers, Users, Code } from 'lucide-react';

// 1. Import Language Hook Only (No separate translations file needed)
import { useLanguage } from '@/lib/i18n/LanguageContext';

// 2. Import Shadcn UI Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItem {
  name: string;
  href: string;
  colorClass: string;
  borderClass: string;
  icon: any;
  desc: string;
}

export default function Dashboard() {
  const router = useRouter();

  // 3. Get the main 't' object which contains { login: ..., dashboard: ... }
  const { t, language, setLanguage } = useLanguage();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  // 4. Dynamic Menu Items (Accessed via t.dashboard.modules)
  const menuItems: MenuItem[] = [
    {
      // name: t.dashboard.modules.wood_title,
      // desc: t.dashboard.modules.wood_desc,
      name: "MAESTRO M.D.F",
      desc: t.dashboard.modules.wood_desc,
      href: '/wood_company',
      colorClass: 'bg-amber-700 hover:bg-amber-800',
      borderClass: 'border-amber-900',
      icon: Trees,
    },
    {
      // name: t.dashboard.modules.chair_title,
      // desc: t.dashboard.modules.chair_desc,

      name: "MAESTRO MOBILYA",
      desc: t.dashboard.modules.wood_desc,
      href: '/chair_company',
      colorClass: 'bg-red-700 hover:bg-red-800',
      borderClass: 'border-red-900',
      icon: Armchair,
    },
    {

      // name: t.dashboard.modules.ceramic_title,
      // desc: t.dashboard.modules.ceramic_desc,
      name: "MAESTRO MERMER",
      desc: t.dashboard.modules.wood_desc,
      href: '/ciramic_company',
      colorClass: 'bg-blue-700 hover:bg-blue-800',
      borderClass: 'border-blue-900',
      icon: Layers,
    },
    {
      name: t.dashboard.modules.personal_title,
      desc: t.dashboard.modules.personal_desc,
      href: '/personal_management',
      colorClass: 'bg-green-700 hover:bg-green-800',
      borderClass: 'border-green-900',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans" dir={language === 'en' ? 'ltr' : 'rtl'}>

      {/* --- CLASSIC HEADER --- */}
      <header className="bg-stone-900 h-[62px] px-4 flex justify-between items-center sticky top-0 z-50 shadow-md border-b border-gray-900">

        {/* Left: Brand */}
        <div className="flex items-center gap-3">

          <div className="flex flex-col">
            <h1 className="text-white font-bold uppercase tracking-widest text-xl leading-none mb-0.5">MAESTRO</h1>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">

          {/* SHADCN LANGUAGE SELECTOR */}
          <div className="flex items-center">
            <Select
              value={language}
              onValueChange={(val: any) => setLanguage(val)}
            >
              <SelectTrigger className="w-[140px] h-8 bg-gray-700 border-gray-600 text-white text-xs font-bold uppercase rounded-none focus:ring-0 focus:ring-offset-0 gap-2">
                <Globe size={12} className="text-gray-400" />
                <SelectValue placeholder="Lang" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 rounded-none shadow-xl">
                <SelectItem value="en" className="text-xs font-bold uppercase cursor-pointer">English</SelectItem>
                <SelectItem value="ku" className="text-xs font-bold uppercase cursor-pointer">Kurdish</SelectItem>
                <SelectItem value="ar" className="text-xs font-bold uppercase cursor-pointer">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-3 h-9  text-xs font-bold uppercase border border-red-950 rounded-none transition-colors shadow-sm"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">{t.dashboard.logout}</span>
          </button>
        </div>
      </header>

      {/* --- MAIN DASHBOARD GRID --- */}
      <main className="flex-1 flex items-center justify-center p-6 mb-10">
        <div className="w-full max-w-5xl">
          <h2 className="text-gray-500 font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2 text-sm">
            {t.dashboard.select_module}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative group overflow-hidden h-32 flex items-center px-6 
                  ${item.colorClass} border-b-4 ${item.borderClass} 
                  shadow-md hover:shadow-xl transition-all duration-200 rounded-none
                `}
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center rtl:ml-5 ltr:mr-5 group-hover:scale-110 transition-transform">
                  <item.icon size={32} className="text-white opacity-90" />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white uppercase tracking-tight shadow-black drop-shadow-sm">
                    {item.name}
                  </span>
                  {/* <span className="text-xs text-white/70 uppercase font-medium tracking-wider mt-1">
                    {item.desc}
                  </span> */}
                </div>

                {/* Hover Effect Arrow (Direction Aware) */}
                <div className="absolute ltr:right-4 rtl:left-4 opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl font-bold">
                  {language === 'ar' || language === 'ku' ? <span>&larr;</span> : <span>&rarr;</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-300 py-3 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 font-bold uppercase gap-2">
          <div>
            &copy; 2025 MAESTRO Systems. {t.dashboard.footer_rights}
          </div>
          <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Code size={12} />
            <a
              href="https://instagram.com/hunersindi"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wider"
            >
              {t.dashboard.about_dev}: Huner Sindi
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}