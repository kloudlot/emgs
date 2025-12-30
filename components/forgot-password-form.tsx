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
import { Box, Stack, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";

export function ForgotPasswordForm(props: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle fontSize="2xl">Check Your Email</CardTitle>
            <CardDescription>Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              If you registered using your email and password, you will receive
              a password reset email.
            </Text>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle fontSize="2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Type in your email and we&apos;ll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="m@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                {error && (
                  <Text fontSize="sm" color="red.500">
                    {error}
                  </Text>
                )}
                <Button type="submit" width="full" isLoading={isLoading} loadingText="Sending...">
                  Send reset email
                </Button>
              </Stack>
              <Box mt={4} textAlign="center" fontSize="sm">
                Already have an account?{" "}
                <Link href="/auth/login" passHref legacyBehavior>
                  <ChakraLink as="a" textDecoration="underline">
                    Login
                  </ChakraLink>
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
