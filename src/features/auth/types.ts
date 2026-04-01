import type { UserRole } from "@/shared/types";

export interface AuthState{
    accessToken: string | null,
    role: UserRole | null,
}

export interface AuthActions{
    setAuth: (payload : {accessToken: string, role: UserRole | null}) => void,
    clearAuth: () => void,
}