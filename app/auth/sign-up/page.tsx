import AuthShell from "@/components/core/auth-shell";
import { SignUpForm } from "@/components/forms/sign-up-form";

export default function Page() {
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  );
}
