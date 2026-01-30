"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/types/user";
import { fetchProfile, login as loginService, refreshAccessToken } from "@/lib/auth";

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
    };

    useEffect(() => {
        async function initAuth() {
            const token = localStorage.getItem("access_token");
            if (token) {
                try {
                    const profile = await fetchProfile(token);
                    setUser(profile);
                } catch (error) {
                    console.error("Failed to fetch profile on init:", error);
                    const refresh = localStorage.getItem("refresh_token");
                    if (refresh) {
                        try {
                            const { access } = await refreshAccessToken(refresh);
                            localStorage.setItem("access_token", access);
                            const profile = await fetchProfile(access);
                            setUser(profile);
                        } catch (refreshError) {
                            console.error("Token refresh failed:", refreshError);
                            logout();
                        }
                    } else {
                        logout();
                    }
                }
            }
            setLoading(false);
        }
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const tokens = await loginService(email, password);
        localStorage.setItem("access_token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        const profile = await fetchProfile(tokens.access);
        setUser(profile);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
