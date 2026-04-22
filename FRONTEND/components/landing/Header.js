
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-2 bg-blue-700 rounded-lg group-hover:bg-blue-600 transition-colors">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <span className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900 lg:text-slate-900'}`}>
                        SecureTransact<span className="text-blue-700">AI</span>
                    </span>
                </Link>





                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-700">
                        Log In
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-md transition-all shadow-lg shadow-blue-900/10"
                    >
                        Get Started
                    </Link>
                </div>


                <button
                    className="md:hidden text-slate-700"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>


            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 md:hidden shadow-xl"
                >
                    <div className="flex flex-col gap-4">
                        <Link href="/signup" className="text-lg font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>
                            Get Started
                        </Link>
                        <hr className="border-slate-100 my-2" />
                        <Link href="/login" className="text-center py-3 rounded-lg bg-blue-50 text-blue-700 font-bold">
                            Log In
                        </Link>
                    </div>
                </motion.div>
            )}
        </header>
    );
}
