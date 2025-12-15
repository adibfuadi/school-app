"use client"
import React from "react";
import { set } from "zod";

type User = {
    id: string;
    email: string;
    name?: string;
    emailVerified: boolean;
}

export function useAuth() {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    // SIGN UP
    async function signUp(email: string, password: string, name: string) {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error registering user.');
            }
            return true;

        } catch (error: any) {
            console.error("Error during signup:", error);
            setError(error.message || "Error registering user.");

        } finally {
            setLoading(false);
        }
    }

    async function verifyEmail(email: string, code: string) {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Error verifying email.');
            }
            setUser(data.user);
            return true;

        } catch (error: any) {
            console.error("Error during email verification:", error);
            setError(error.message || "Error verifying email.");

        } finally {
            setLoading(false);
        }
    }

    async function signIn(email: string, password: string) {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                if (res.status === 403) {
                    throw new Error('Email not verified. Please check your email for the verification link.');
                }
                throw new Error(data.message || 'Error signing in user.');
            }
            await me()
            return true;

        } catch (error: any) {
            console.error("Error during signin:", error);
            setError(error.message || "Error signing in user.");

        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!res.ok) {
                throw new Error("Error signing out user.")
            }
            setUser(null);
            return true

        } catch (error: any) {
            console.error("Error during signin:", error);
            setError(error.message || "Error signing in user.");
        } finally {
            setLoading(false)
        }
    }

    async function me() {
        try {
            const res = await fetch('/api/auth/current-user');
            const data = await res.json();
            if (!res.ok) {
                setUser(null);
            }
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching current user:", error);
            setUser(null);
        }
    }

    return {
        user,
        loading,
        error,
        signUp,
        verifyEmail,
        signIn,
        signOut,
        me
    }
}