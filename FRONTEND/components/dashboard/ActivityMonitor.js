import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Shield, Clock, FileText, CheckCircle, XCircle, AlertTriangle, User, Search } from 'lucide-react';

export default function ActivityMonitor() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getActivityLogs()
            .then(setLogs)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-20 text-slate-500 animate-pulse">Loading Audit Logs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-purple-400" />
                        Investigator Activity Log
                    </h2>
                    <p className="text-sm text-slate-400">Audit trail of all manual interventions and flag resolutions.</p>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-xs text-slate-500 font-mono">
                    {logs.length} RECORDS FOUND
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Investigator</th>
                                <th className="px-6 py-4">Transaction Details</th>
                                <th className="px-6 py-4">Action Taken</th>
                                <th className="px-6 py-4">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-slate-500">
                                        No activity recorded yet.
                                    </td>
                                </tr>
                            ) : logs.map((log, index) => (
                                <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-slate-600" />
                                            {new Date(log.timestamp).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                                                <User className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <span className="font-medium text-slate-200">{log.investigator}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-mono text-xs text-blue-400 mb-1">{log.tx_id}</p>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                AI Verdict:
                                                <span className={`px-1.5 rounded ${log.original_ai_verdict === 'Fraud'
                                                        ? 'bg-red-500/10 text-red-500'
                                                        : 'bg-emerald-500/10 text-emerald-500'
                                                    }`}>
                                                    {log.original_ai_verdict}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${log.verdict === 'Confirmed Fraud'
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                            {log.verdict === 'Confirmed Fraud' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                            {log.verdict}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <p className="text-slate-400 text-xs italic truncate" title={log.notes}>
                                            "{log.notes}"
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
