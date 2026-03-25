import type { AuthAction, AuthState } from "./types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAuthStore = create<AuthState & AuthAction>()(
    devtools(
        persist(
            (set) => {
                acccessToken: null;
                role: null,
                setAuth: ({accessToken,role}) => set({acccessToken: accessToken, role});
                clearAuth:  set({accessToken: null, role: null});
            }
        )
    )
)