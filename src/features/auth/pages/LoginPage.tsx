import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen place-items-center p-4 bg-slate-50">
      <section className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <p className="text-2xl font-bold text-center">Welcome Back</p>
        <LoginForm />
      </section>
    </div>
  );
}
