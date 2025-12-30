'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// REMOVE: import Image from 'next/image';  <-- You are using standard <img> tag below, so you don't strictly need this unless you change it.
import api from '@/utils/api';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// 1. IMPORT YOUR NEW LOGO FILE
import { systemLogo } from './logo';

interface LoginResponse {
    token: string;
    username: string;
}

export default function LoginPage() {
    const router = useRouter();
    const { t, language, setLanguage } = useLanguage();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post<LoginResponse>('/login', { username, password });
            const { token } = response.data;
            Cookies.set('token', token, { expires: 7 });
            router.push('/');
        } catch (err) {
            console.error(err);
            setError(t.login.error_msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gray-100">
            {/* Login Card Wrapper */}
            <div className="flex w-full bg-white shadow-xl border border-gray-300">

                {/* SIDE 1: INFO & DEVELOPER */}
                <div className="hidden md:flex md:w-1/2 bg-stone-900 text-white flex-col justify-between p-12 relative">
                    <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center w-full">

                        {/* 2. USE THE IMPORTED VARIABLE HERE */}
                        <div className="mb-6 p-2 inline-block">
                            <img
                                src={systemLogo}  // <--- CHANGED THIS
                                alt="System Logo"
                                width={200}
                                height={80}
                                className="object-contain"
                            />
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{t.login.welcome_title}</h1>
                        <p className="text-stone-200 text-lg leading-relaxed opacity-90">
                            {t.login.welcome_desc}
                        </p>
                    </div>

                    {/* ... Rest of your code remains exactly the same ... */}
                    <div className="relative z-10 border-t border-stone-700 pt-6 w-full">
                        <p className="text-xs uppercase tracking-widest text-stone-300 mb-2">
                            {t.login.developed_by}
                        </p>
                        <h3 className="text-xl font-bold text-white mb-4">Huner Sindi</h3>

                        <a
                            href="https://instagram.com/hunersindi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white hover:text-stone-200 transition-colors group"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            <span className="text-sm font-bold uppercase border-b border-transparent group-hover:border-stone-200">
                                {t.login.visit_insta}
                            </span>
                        </a>
                    </div>
                </div>

                {/* SIDE 2: LOGIN FORM */}
                <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center relative">

                    {/* Language Switcher */}
                    <div className="absolute top-6 right-6 flex gap-0 border border-gray-300">
                        {['en', 'ku', 'ar'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang as any)}
                                className={`px-4 py-2 text-xs font-bold uppercase transition-all
                                    ${language === lang
                                        ? 'bg-stone-900 text-white'
                                        : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                    } ${lang !== 'ar' ? 'border-r border-gray-300' : ''}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-sm mx-auto w-full">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight mb-2">
                                {t.login.title}
                            </h2>
                            <div className="h-1 w-12 bg-stone-900"></div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 mb-6 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    {t.login.username_label}
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full h-12 px-4 border border-gray-300 text-gray-900 text-sm focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all bg-gray-50 rounded-none"
                                    required
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    {t.login.password_label}
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 px-4 border border-gray-300 text-gray-900 text-sm focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all bg-gray-50 rounded-none"
                                    required
                                    dir="ltr"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-stone-900 text-white h-12 text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-md mt-4 disabled:opacity-70 rounded-none border-b-4 border-stone-950 active:border-b-0 active:translate-y-1"
                            >
                                {loading ? t.login.loading : t.login.sign_in_btn}
                            </button>
                        </form>

                        <div className="mt-10 text-center border-t border-gray-100 pt-6">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                {t.login.footer} &copy; 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}