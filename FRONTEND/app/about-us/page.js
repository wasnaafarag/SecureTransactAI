"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Lightbulb, MapPin } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const teamValues = [
    { icon: ShieldCheck, title: "Security First",     desc: "Every architectural decision starts with a single question: is this the most secure possible approach?" },
    { icon: Target,      title: "Zero False Trust",   desc: "We build systems that assume breach and verify everything - because in finance, trust is earned, not assumed." },
    { icon: Lightbulb,   title: "AI-Native Thinking", desc: "We don't bolt AI onto legacy systems. We design from the ground up for machine learning at every layer." },
];

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                Our Story
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                                Making financial fraud{" "}
                                <span className="text-blue-400">mathematically impossible</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                                We are a team of data scientists, cybersecurity engineers, and financial technologists united by one mission - securing every transaction on the planet.
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative flex justify-center">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                            </div>
                            <Image src="/aboutus/About us page-pana.svg" alt="About Us Illustration" width={460} height={460} className="relative z-10 drop-shadow-2xl" priority />
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
                            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">Vision & Mission</p>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-snug">
                                A financial ecosystem built on verifiable trust
                            </h2>
                            <div className="space-y-5">
                                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                    <h3 className="font-bold text-slate-900 mb-2">Our Vision</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        A global financial ecosystem where every transaction is verified instantly, transparently, and immutably - restoring trust in digital commerce for billions of people.
                                    </p>
                                </div>
                                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                                    <h3 className="font-bold text-slate-900 mb-2">Our Approach</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        We don&apos;t rely on static rules. We build adaptive AI systems that continuously learn the behavioral baseline of each user - making even the subtlest fraud patterns detectable.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="relative flex justify-center">
                            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center overflow-hidden">
                                <Image src="/aboutus/Earth and Moon-amico.svg" alt="Global Vision" width={360} height={360} className="drop-shadow-lg" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Our Values</p>
                        <h2 className="text-3xl font-extrabold text-slate-900">What drives us</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamValues.map(({ icon: Icon, title, desc }) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                    <Icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-3">{title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
                            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">Where We Work</p>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-5 leading-snug">Built in Cairo, reaching the world</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Founded in 2024 at the Smart Village tech hub in Cairo, Egypt - SecureTransact has rapidly grown to protect billions of EGP in transaction volume across the MENA region and beyond.
                            </p>
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                                <div>
                                    <p className="text-slate-900 font-semibold text-sm">Smart Village, Building B115</p>
                                    <p className="text-slate-400 text-xs">Cairo, Egypt</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="relative flex justify-center">
                            <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 flex items-center justify-center overflow-hidden">
                                <Image src="/aboutus/User flow-rafiki.svg" alt="User Flow" width={360} height={360} className="drop-shadow-lg" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
