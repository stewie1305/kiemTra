import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import type { LoginSchemaType } from "../schema";
import { authService } from "../services";
import { toast } from "sonner";

export function useLoginMutation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const from =
    (location.state as { from: { pathname: string } })?.from?.pathname ||
    "/profile";
  return useMutation({
    mutationFn: (data: LoginSchemaType) => authService.login(data),
    onSuccess: (response) => {
      setAuth({
        accessToken: response.accessToken,
        role: response.user.role === "admin" ? "admin" : "user",
      });
      toast.success("dang nhap thanh cong");
      if (response.user.role === "admin") {
        navigate("/admin/employees", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    },
  });
}
