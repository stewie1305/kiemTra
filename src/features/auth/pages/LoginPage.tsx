import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <section className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <p className="mt-1 mb-5 text-sm text-center text-muted-foreground">
          Đăng nhập để tiếp tục
        </p>

        <LoginForm />
      </section>
    </main>
  );
}
