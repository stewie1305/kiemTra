import type { UserRole } from "@/shared/types";


interface ProtectedRouteProps{
    accessToken: string;
    role: UserRole;
}


