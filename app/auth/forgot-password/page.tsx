import AuthShell from "@/components/core/auth-shell";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function Page() {
  return (
    <AuthShell>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
