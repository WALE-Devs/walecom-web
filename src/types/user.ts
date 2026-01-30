export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface UserProfile extends User {
    full_name: string;
    phone_number: string;
    phone_verified: boolean;
    email_verified: boolean;
    date_of_birth: string | null;
    newsletter_subscribed: boolean;
    preferred_language: string;
    preferred_currency: string;
    date_joined: string;
    age: number | null;
    is_adult: boolean;
}

export interface AuthTokenResponse {
    access: string;
    refresh: string;
}
