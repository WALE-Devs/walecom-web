import { apiUrl } from "@/lib/api";
import type { AuthTokenResponse, UserProfile } from "@/types/user";

/**
 * Log in a user and return the JWT tokens.
 * Endpoint: POST /api/auth/token/
 */
export async function login(email: string, password: string): Promise<AuthTokenResponse> {
    const res = await fetch(apiUrl("/auth/token/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error(`Login failed: ${res.status}`);
    }

    return res.json();
}

/**
 * Get the current user's profile.
 * Endpoint: GET /api/auth/profile/
 */
export async function fetchProfile(token: string): Promise<UserProfile> {
    const res = await fetch(apiUrl("/auth/profile/"), {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`);
    }

    return res.json();
}

/**
 * Refresh the access token.
 * Endpoint: POST /api/auth/token/refresh/
 */
export async function refreshAccessToken(refresh: string): Promise<{ access: string }> {
    const res = await fetch(apiUrl("/auth/token/refresh/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
        throw new Error(`Token refresh failed: ${res.status}`);
    }

    return res.json();
}
