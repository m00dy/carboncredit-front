import { LoginForm } from "@/components/LoginForm";

export const metadata = {
  title: "Log in – carboncredit.io",
};

export default function LoginPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
      <LoginForm />
    </div>
  );
}
