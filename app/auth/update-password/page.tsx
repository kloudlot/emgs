import AuthShell from "@/components/core/auth-shell";
import { UpdatePasswordForm } from "@/components/forms/update-password-form";

export default function Page() {
  return (
      <AuthShell>
        <UpdatePasswordForm />
      </AuthShell>
  );
}
