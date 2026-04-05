import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "../schema";
import { useForm } from "react-hook-form";

import { Loader2 } from "lucide-react";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const onSubmit = async (data: LoginSchemaType) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };
  const isLoading = loginMutation.isPending || isSubmitting;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="sapce-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="sapce-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="*********"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 anima-spin" />
          </>
        ) : (
          "dang dang nhap"
        )}
      </Button>
    </form>
  );
}
