"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    Mail, Send, Clock, MailOpen, Search, User,
    Trash2, UserCheck, ShieldCheck, AlertCircle,
    Download, ShieldAlert, Loader2, ChevronRight, MoreVertical
} from 'lucide-react';
import { api } from '@/lib/api';

export default function InboxView() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [sendingReply, setSendingReply] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => { fetchMessages(); }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedContact, messages]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await api.getMessages();
            setMessages(data);
            const grouped = groupByContact(data);
            const contacts = Object.keys(grouped);
            if (contacts.length > 0 && (!selectedContact || !grouped[selectedContact])) {
                setSelectedContact(contacts[0]);
            } else if (contacts.length === 0) {
                setSelectedContact(null);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const extractName = (s) => {
        if (!s) return "Unknown";
        const match = s.match(/^(.*?)\s*\(.*?\)$/);
        return match ? match[1].trim() : s;
    };

    const extractEmail = (s) => {
        if (!s) return null;
        const match = s.match(/\((.*?)\)/);
        return match ? match[1] : null;
    };

    const groupByContact = (msgs) =>
        msgs.reduce((acc, msg) => {
            const key = msg.sender || "Unknown";
            if (!acc[key]) acc[key] = [];
            acc[key].push(msg);
            return acc;
        }, {});

    const handleSendReply = async () => {
        if (!replyContent.trim() || !selectedContact) return;
        const thread = groupedMessages[selectedContact];
        if (!thread?.length) return;
        try {
            setSendingReply(true);
            await api.replyToMessage(thread[0]._id, replyContent);
            setReplyContent("");
            fetchMessages();
        } catch (err) {
            alert("Reply failed: " + err.message);
        } finally {
            setSendingReply(false);
        }
    };

    const markAsRead = async (msgId) => {
        try {
            await api.markMessageRead(msgId);
            setMessages(prev => prev.map(m => m._id === msgId ? { ...m, status: 'read' } : m));
        } catch (err) { console.error(err); }
    };

    const handleGenerateAudit = () => {
        if (!selectedContact) return;
        const thread = groupedMessages[selectedContact];
        const log = thread.map(m => `[${m.created_at}] ${m.subject}\n${m.content}`).join('\n\n---\n\n');
        const blob = new Blob([`AUDIT LOG — ${selectedContact}\n\n${log}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Audit_${selectedContact.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handlePurge = async () => {
        if (!selectedContact) return;
        if (!confirm(`Permanently delete all messages from ${selectedContact}?`)) return;
        const thread = groupedMessages[selectedContact];
        try {
            setLoading(true);
            for (const msg of thread) await api.deleteMessage(msg._id);
            setSelectedContact(null);
            fetchMessages();
        } catch (err) {
            alert("Delete failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const groupedMessages = groupByContact(messages);
    const contactList = Object.keys(groupedMessages).filter(c =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && messages.length === 0) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            <p className="text-sm font-medium">Loading inbox…</p>
        </div>
    );

    return (
        <div className="flex h-[calc(100vh-140px)] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

            <div className="w-72 shrink-0 border-r border-slate-800 flex flex-col">
                <div className="px-5 py-4 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-400" />
                            Forensic Triage Center
                        </h3>
                        {messages.filter(m => m.status === 'unread').length > 0 && (
                            <span className="px-2 py-0.5 bg-red-500/15 text-red-400 border border-red-500/25 rounded-full text-xs font-bold">
                                {messages.filter(m => m.status === 'unread').length} alerts
                            </span>
                        )}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Filter alerts…"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {contactList.length === 0 ? (
                        <div className="py-16 flex flex-col items-center gap-3 text-slate-600">
                            <AlertCircle className="w-7 h-7" />
                            <p className="text-xs font-medium">No alerts found</p>
                        </div>
                    ) : (
                        contactList.map(contact => {
                            const thread = groupedMessages[contact];
                            const latest = thread[0];
                            const unread = thread.filter(m => m.status === 'unread').length;
                            const isSelected = selectedContact === contact;
                            const isSystem = contact.includes("SYSTEM_GUARD");

                            return (
                                <button
                                    key={contact}
                                    onClick={() => setSelectedContact(contact)}
                                    className={`w-full text-left px-4 py-3.5 border-b border-slate-800/60 transition-colors relative ${
                                        isSelected ? 'bg-blue-600/10 border-l-2 border-l-blue-500' : 'hover:bg-slate-800/50'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold mt-0.5 ${
                                            isSystem ? 'bg-red-600/20 text-red-500 border border-red-500/30' : 
                                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                                        }`}>
                                            {isSystem ? <ShieldAlert className="w-4 h-4" /> : extractName(contact).charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1 mb-0.5">
                                                <span className={`text-sm font-semibold truncate ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                                                    {isSystem ? "System Guard" : extractName(contact)}
                                                </span>
                                                <span className="text-xs text-slate-500 shrink-0">
                                                    {new Date(latest.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 truncate font-mono">{latest.subject}</p>
                                        </div>
                                        {unread > 0 && (
                                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                {unread}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {selectedContact ? (
                    <>
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
                                    selectedContact.includes("SYSTEM_GUARD") ? 'bg-red-600' : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                                }`}>
                                    {selectedContact.includes("SYSTEM_GUARD") ? <ShieldAlert className="w-5 h-5" /> : extractName(selectedContact).charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-bold text-white truncate">{extractName(selectedContact)}</h4>
                                    <p className="text-xs text-slate-400 truncate">
                                        {extractEmail(selectedContact) || 'Security Protocol Entity'} &bull; {groupedMessages[selectedContact].length} incident{groupedMessages[selectedContact].length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                            {(groupedMessages[selectedContact] || []).slice().reverse().map((msg) => (
                                <div key={msg._id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                                    <div className="px-5 py-3 bg-slate-800/80 border-b border-slate-700 flex items-center gap-3 flex-wrap">
                                        <span className={`px-2.5 py-0.5 border rounded-md text-xs font-semibold ${
                                            msg.category === 'Security Alert' ? 'bg-red-500/15 text-red-400 border-red-500/20' : 'bg-blue-500/15 text-blue-300 border-blue-500/20'
                                        }`}>
                                            {msg.category || 'General Audit'}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(msg.created_at).toLocaleString([], {
                                                hour: '2-digit', minute: '2-digit',
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                        {msg.status === 'replied' && (
                                            <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold ml-auto">
                                                <UserCheck className="w-3.5 h-3.5" />
                                                Action Taken
                                            </span>
                                        )}
                                        {msg.status === 'unread' && (
                                            <button
                                                onClick={() => markAsRead(msg._id)}
                                                className="ml-auto flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                <MailOpen className="w-3.5 h-3.5" />
                                                Acknowledge
                                            </button>
                                        )}
                                    </div>

                                    <div className="px-5 py-4">
                                        <h5 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                                            {msg.category === 'Security Alert' && <AlertCircle className="w-4 h-4 text-red-500" />}
                                            {msg.subject}
                                        </h5>
                                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono bg-slate-900/40 p-3 rounded-lg border border-slate-700/50">
                                            {msg.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/80">
                            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500/50 transition-colors">
                                <textarea
                                    placeholder={`Issue command or reply to ${extractName(selectedContact)}…`}
                                    value={replyContent}
                                    onChange={e => setReplyContent(e.target.value)}
                                    className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 p-4 min-h-[100px] resize-none outline-none"
                                />
                                <div className="px-4 py-3 border-t border-slate-700 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                                        Secure SMTP Protocol
                                    </span>
                                    <button
                                        onClick={handleSendReply}
                                        disabled={sendingReply || !replyContent.trim()}
                                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                                    >
                                        {sendingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        Dispatch Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-600">
                        <Mail className="w-12 h-12 opacity-20" />
                        <p className="text-sm font-medium text-slate-500">Select a forensic thread to begin triage</p>
                    </div>
                )}
            </div>

            <div className="w-60 shrink-0 border-l border-slate-800 flex flex-col p-5 gap-6 bg-slate-900/50">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    Forensic Tools
                </h3>

                {selectedContact ? (
                    <>
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 ${
                                selectedContact.includes("SYSTEM_GUARD") ? 'bg-red-600' : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                            }`}>
                                {selectedContact.includes("SYSTEM_GUARD") ? <ShieldAlert className="w-6 h-6" /> : extractName(selectedContact).charAt(0).toUpperCase()}
                            </div>
                            <p className="text-sm font-bold text-white mb-1 truncate">{extractName(selectedContact)}</p>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Identity Verified</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Logs</p>
                                <p className="text-xl font-bold text-white">{groupedMessages[selectedContact].length}</p>
                            </div>
                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Cleared</p>
                                <p className="text-xl font-bold text-emerald-400">
                                    {groupedMessages[selectedContact].filter(m => m.status !== 'unread').length}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 mt-auto">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                                Management
                            </p>
                            <button
                                onClick={handleGenerateAudit}
                                className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/40 text-slate-200 text-sm font-medium rounded-xl transition-colors"
                            >
                                <Download className="w-4 h-4 text-blue-400 shrink-0" />
                                Export Evidence
                            </button>
                            <button
                                onClick={handlePurge}
                                className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-800 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 text-sm font-medium rounded-xl transition-colors"
                            >
                                <Trash2 className="w-4 h-4 shrink-0" />
                                Purge History
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-1 text-slate-700 gap-3">
                        <ShieldCheck className="w-8 h-8 opacity-20" />
                        <p className="text-xs text-center text-slate-600 leading-relaxed italic">Awaiting selection...</p>
                    </div>
                )}
            </div>
        </div>
    );
}