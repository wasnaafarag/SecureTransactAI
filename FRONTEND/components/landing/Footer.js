
import React from 'react';
import { ShieldCheck, Twitter, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 bg-blue-600 rounded-lg">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white">SecureTransact<span className="text-blue-500">AI</span></span>
                        </div>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            Next-generation fraud detection utilizing hybrid AI architectures and blockchain immutability. Securing the future of finance.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-blue-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-blue-600 transition-colors"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/features" className="hover:text-blue-400">Features</Link></li>
                            <li><Link href="/technology" className="hover:text-blue-400">Technology</Link></li>
                            <li><Link href="/security" className="hover:text-blue-400">Security</Link></li>
                            <li><Link href="/enterprise" className="hover:text-blue-400">Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about-us" className="hover:text-blue-400">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-400">Blog</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© 2026 SecureTransact Defense Systems Inc.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
