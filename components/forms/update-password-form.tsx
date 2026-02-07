"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema, type UpdatePasswordFormData } from "@/lib/validations/auth";

export function UpdatePasswordForm(props: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordFormData) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password: data.password });
      if (error) throw error;
      router.push("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box {...props}>
      <Card>
        <CardHeader>
          <CardTitle fontSize="2xl">Reset Your Password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <FormInput
                id="password"
                label="New password"
                type="password"
                placeholder="New password"
                error={errors.password?.message}
                showPasswordToggle
                {...register("password")}
              />
              {error && (
                <Text fontSize="sm" color="red.500">
                  {error}
                </Text>
              )}
              <Button type="submit" width="full" isLoading={isLoading} loadingText="Saving...">
                Save new password
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
