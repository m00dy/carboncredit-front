import { RegisterForm } from "@/components/RegisterForm";

export const metadata = {
  title: "Register – carboncredit.io",
};

export default function RegisterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
      <RegisterForm />
    </div>
  );
}
