
"use client";
import React from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';

export default function StaticPageLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-32 pb-20 max-w-4xl mx-auto px-6"
            >
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{title}</h1>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
                </div>

                <div className="prose prose-lg prose-slate max-w-none text-slate-600 bg-white p-10 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
                    {children}
                </div>
            </motion.main>
            <Footer />
        </div>
    );
}
