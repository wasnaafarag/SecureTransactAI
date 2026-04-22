"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ username: payload.sub, role: payload.role, token });
            } catch (e) {
                console.error("Session Integrity Check Failed:", e);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const formData = new FormData();
        // FastAPI standard OAuth2 expects "username" and "password"
        formData.append("username", username);
        formData.append("password", password);

        try {
            const res = await fetch("http://localhost:8000/auth/token", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                // CAPTURE THE ACTUAL REASON
                const errorData = await res.json();
                const errorMessage = errorData.detail || "Login Failed";
                
                // Print this to your browser console so you can see if it's the password or the user
                console.error("ST-Governance Auth Error:", errorMessage);
                
                throw new Error(errorMessage);
            }

            const data = await res.json();
            const token = data.access_token;

            localStorage.setItem("token", token);

            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: payload.sub, role: payload.role, token });

            router.push("/dashboard");
            return { success: true };
        } catch (error) {
            console.error("Auth Failure:", error.message);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);