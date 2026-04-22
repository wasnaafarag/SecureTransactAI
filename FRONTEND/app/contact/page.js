"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, ShieldCheck } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { api } from "@/lib/api";

const contactInfo = [
    {
        icon: Mail,
        label: "Email Us",
        value: "support@SecureTransact.com",
        sub: "We reply within 24 hours",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: Phone,
        label: "Call Us",
        value: "+20 2 2345 6789",
        sub: "Sun – Thu, 9 AM – 6 PM CAT",
        color: "bg-indigo-50 text-indigo-600",
    },
    {
        icon: MapPin,
        label: "Visit Us",
        value: "Smart Village, Building B115",
        sub: "Cairo, Egypt",
        color: "bg-purple-50 text-purple-600",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await api.submitContactForm(form);
            setSent(true);
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            
            <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            Get in Touch
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                            We&apos;d love to hear from you
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                            Whether you need a demo, have a technical question, or want to discuss enterprise pricing - our team is here.
                        </p>
                    </motion.div>
                </div>
            </section>

            
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            
                            <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center mb-8 overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl pointer-events-none" />
                                <Image
                                    src="/contact/Feedback-pana.svg"
                                    alt="Contact Illustration"
                                    width={340}
                                    height={300}
                                    className="relative z-10 drop-shadow-lg"
                                    priority
                                />
                            </div>

                            
                            <div className="space-y-4">
                                {contactInfo.map(({ icon: Icon, label, value, sub, color }) => (
                                    <div key={label} className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                                        <div className={`p-3 rounded-xl ${color} shrink-0`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                                            <p className="text-slate-900 font-semibold text-sm">{value}</p>
                                            <p className="text-slate-400 text-xs">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8 lg:p-10"
                        >
                            {sent ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5 hover:scale-110 transition-transform">
                                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Inquiry Received!</h3>
                                    <p className="text-slate-500 text-base max-w-xs leading-relaxed">
                                        Thank you for reaching out. Your message has been routed to our security team. We will contact you shortly via email.
                                    </p>
                                    <button 
                                        onClick={() => setSent(false)}
                                        className="mt-8 text-blue-600 font-bold text-sm hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Send us a message</h2>
                                        <p className="text-slate-500 text-sm">Fill out the form and we&apos;ll be in touch shortly.</p>
                                    </div>

                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium flex items-center gap-2 italic">
                                            <ShieldCheck className="w-4 h-4" />
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                                    placeholder="John Doe"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                                    placeholder="john@company.com"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                                placeholder="Enterprise inquiry, technical support..."
                                                value={form.subject}
                                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
                                                placeholder="Tell us how we can help..."
                                                value={form.message}
                                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-8">Trusted by teams using</p>
                    <div className="flex flex-wrap items-center justify-center gap-10 opacity-50 grayscale hover:opacity-60 transition-opacity">
                        {["stripe", "github", "figma", "vercel", "linear"].map((brand) => (
                            <Image
                                key={brand}
                                src={`/brands/${brand}.svg`}
                                alt={brand}
                                width={80}
                                height={28}
                                className="object-contain h-7 w-auto"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
