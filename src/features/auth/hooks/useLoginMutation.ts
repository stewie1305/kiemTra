import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store";
import {
  authService,
  type AuthResponse,
  type LoginRequest,
} from "@/features/auth/services";

export const useLoginMutation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/profile";

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data) => authService.login(data),
    onSuccess: (response) => {
      setAuth({
        accessToken: response.accessToken,
        role: response.user.role === "admin" ? "admin" : "user",
      });

      toast.success("Đăng nhập thành công");

      if (response.user.role === "admin") {
        navigate("/admin/ritual", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    },
  });
};
