
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-0 items-center relative z-10">
                        
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                            className="hidden lg:flex items-end justify-center pt-8 pl-8"
                        >
                            <Image
                                src="/storyset/Business Plan-amico.svg"
                                alt="Business Plan Illustration"
                                width={380}
                                height={380}
                                className="drop-shadow-2xl"
                            />
                        </motion.div>

                        
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-12 lg:p-16"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <ShieldCheck className="w-5 h-5 text-blue-200" />
                                <span className="text-blue-200 font-semibold text-sm uppercase tracking-wide">Ready to Get Secure?</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-5">
                                Secure your infrastructure today
                            </h2>
                            <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-md">
                                Join forward-thinking financial institutions that trust SecureTransact to detect fraud faster, verify transactions instantly, and reduce breach risk to zero.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/signup"
                                    className="px-7 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2 group"
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center"
                                >
                                    Sign In
                                </Link>
                            </div>

                            
                            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-3">
                                {["No setup fee", "Cancel anytime", "24/7 support", "SOC 2 Compliant"].map((t) => (
                                    <p key={t} className="text-blue-200 text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                                        {t}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
