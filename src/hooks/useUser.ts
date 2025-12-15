"use client"
import SWR from "swr";

type User = {
    id: string;
    email: string;
    name?: string;
    emailVerified: boolean;
}

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then(async (r) => {
    if (r.status === 401) return { user: null };
    const json = await r.json();
    return json;
});

export function useUser() {
    const { data, error, isLoading, mutate } = SWR<{ user: User | null }>('/api/auth/current-user', fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: false
    });
    const user = data?.user ?? null

    async function refreshUser() {
        await mutate()
    }


    return {
        user: user,
        loading: isLoading,
        error: error ? (error as Error).message : null,
        refreshUser
    };
}