import { API_BASE_URL } from "./config";

const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

export const api = {

    healthCheck: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/`);
            return res.status === 200;
        } catch (e) {
            return false;
        }
    },

    predictFraud: async (inputData) => {
        const payload = {
            features: inputData.features,
            amount: parseFloat(inputData.amount || 0),
            receiver: inputData.receiver || "Unknown",
            transaction_id: `TX_${Date.now()}`,
            operational_context: inputData.operational_context
        };

        const res = await fetch(`${API_BASE_URL}/fraud/predict`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Forensic Inference Failure");
        }
        return res.json();
    },

    getExecutiveSummary: async () => {
        const res = await fetch(`${API_BASE_URL}/dashboard/executive-summary`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Governance Report Sync Failed");
        return res.json();
    },

    // --- NEW: Connector for Monthly Forensic Summaries (Executive Matrix) ---
    getMonthlyReport: async (monthYear) => {
        // monthYear format: "April_2026"
        const url = `${API_BASE_URL}/fraud/generate-monthly-report/${monthYear}`;
        window.open(url, '_blank');
    },

    // --- NEW: Connector for Specific Incident Deep-Dive PDFs (Analyst View) ---
    getIncidentReport: async (txId) => {
        const url = `${API_BASE_URL}/fraud/generate-report/${txId}`;
        window.open(url, '_blank');
    },

    getLedger: async () => {
        const res = await fetch(`${API_BASE_URL}/blockchain/ledger`, {
            headers: getHeaders()
        });
        return res.json();
    },

    validateChain: async () => {
        const res = await fetch(`${API_BASE_URL}/blockchain/validate`, {
            headers: getHeaders()
        });
        return res.json();
    },

    getStats: async () => {
        const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
            headers: getHeaders()
        });
        return res.json();
    },

    getHistory: async () => {
        const res = await fetch(`${API_BASE_URL}/dashboard/history`, {
            headers: getHeaders()
        });
        return res.json();
    },

    getTransaction: async (txId) => {
        const res = await fetch(`${API_BASE_URL}/dashboard/transaction/${txId}`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Forensic Record Not Found");
        return res.json();
    },

    createUser: async (userData) => {
        const res = await fetch(`${API_BASE_URL}/auth/admin/create_user?role=${userData.role}`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
                email: userData.email,
                role: userData.role
            })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Authority Matrix Update Failed");
        }
        return res.json();
    },

    register: async (userData) => {
        const res = await fetch(`${API_BASE_URL}/auth/register?role=user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
                email: userData.email,
                role: "user"
            })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Onboarding failed");
        }
        return res.json();
    },

    getUsers: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/users`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch authority list");
        return res.json();
    },

    updateUser: async (username, data) => {
        const res = await fetch(`${API_BASE_URL}/auth/users/${username}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to update unit identity");
        return res.json();
    },

    deleteUser: async (username) => {
        const res = await fetch(`${API_BASE_URL}/auth/users/${username}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Access Revocation Failed");
        return res.json();
    },

    getRecipients: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/recipients`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch verified recipients");
        return res.json();
    },

    getUserStats: async () => {
        const res = await fetch(`${API_BASE_URL}/dashboard/user/stats`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch account analytics");
        return res.json();
    },

    getUserHistory: async () => {
        const res = await fetch(`${API_BASE_URL}/dashboard/user/history`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch settlement history");
        return res.json();
    },

    updateTransactionStatus: async (txId, status, notes = "") => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const res = await fetch(`${API_BASE_URL}/dashboard/transaction/${txId}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status, notes })
        });
        if (!res.ok) throw new Error("Analyst Feedback Synchronization Failed");
        return res.json();
    },

    getActivityLogs: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const res = await fetch(`${API_BASE_URL}/dashboard/admin/activity-logs`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error("Failed to fetch forensic activity logs");
        return res.json();
    },

    corruptTransaction: async (txId) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const res = await fetch(`${API_BASE_URL}/blockchain/corrupt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tx_id: txId })
        });
        if (!res.ok) throw new Error("Ledger simulation failed");
        return res.json();
    },

    releaseFunds: async (txId) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const res = await fetch(`${API_BASE_URL}/dashboard/transaction/${txId}/release`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Manual Authorization Protocol Failed");
        }
        return res.json();
    },

    escalateTransaction: async (txId, reason) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const res = await fetch(`${API_BASE_URL}/dashboard/transaction/${txId}/escalate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reason })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Escalation protocol failed");
        }
        return res.json();
    },

    submitContactForm: async (formData) => {
        const res = await fetch(`${API_BASE_URL}/messages/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Transmission failed");
        }
        return res.json();
    },

    getCards: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/cards`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch forensic assets");
        return res.json();
    },

    createCard: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/cards/create`, {
            method: 'POST',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to provision new asset");
        return res.json();
    },

    deleteCard: async (cardId) => {
        const res = await fetch(`${API_BASE_URL}/auth/cards/${cardId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Asset decommissioning failed");
        return res.json();
    },

    getAdminGlobalStats: async () => {
        const res = await fetch(`${API_BASE_URL}/dashboard/admin/global-stats`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch global Governance metrics");
        return res.json();
    },

    getAdminAllCards: async () => {
        const res = await fetch(`${API_BASE_URL}/dashboard/admin/all-cards`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to access global asset vault");
        return res.json();
    },

    getMessages: async () => {
        const res = await fetch(`${API_BASE_URL}/messages/inbox`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Failed to fetch secure comms");
        return res.json();
    },

    markMessageRead: async (msgId) => {
        const res = await fetch(`${API_BASE_URL}/messages/${msgId}/read`, {
            method: 'PATCH',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Acknowledgement failed");
        return res.json();
    },

    replyToMessage: async (msgId, content) => {
        const res = await fetch(`${API_BASE_URL}/messages/${msgId}/reply`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ reply_content: content })
        });
        if (!res.ok) throw new Error("Secure transmission failed");
        return res.json();
    },

    deleteMessage: async (msgId) => {
        const res = await fetch(`${API_BASE_URL}/messages/${msgId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Purge failed");
        return res.json();
    },

    getManifold: async () => {
        const res = await fetch(`${API_BASE_URL}/fraud/manifold`, {
            headers: getHeaders()
        });
        return res.json();
    },

    updateManifold: async (version) => {
        const res = await fetch(`${API_BASE_URL}/fraud/manifold`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ version })
        });
        if (!res.ok) throw new Error("Engine Swap Failure: Authority violation.");
        return res.json();
    },

    reAnalyzeTransaction: async (logId) => {
        const res = await fetch(`${API_BASE_URL}/fraud/re-analyze/${logId}`, {
            method: 'POST',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Forensic Re-Analysis Failure.");
        return res.json();
    }
};