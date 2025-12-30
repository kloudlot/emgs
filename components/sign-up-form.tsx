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
import { Box, Stack, Text, Link as ChakraLink, VStack, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";

export function SignUpForm(props: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
          data: {
            full_name: data.fullName,
            phone_number: data.phoneNumber,
            occupation: data.occupation,
          },
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box {...props}>
        <VStack align="stretch">
          <Heading fontSize="2xl">Hey there</Heading>
          <Text>Access expert guidance, exam tools, and support for your journey.</Text>
        </VStack>
        <VStack align="stretch">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <FormInput
                id="fullName"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <FormInput
                id="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                error={errors.phoneNumber?.message}
                {...register("phoneNumber")}
              />
              <FormInput
                id="email"
                label="E-mail"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email")}
              />
              <FormInput
                id="occupation"
                label="Occupation"
                type="text"
                placeholder="Enter your occupation"
                error={errors.occupation?.message}
                {...register("occupation")}
              />
              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                showPasswordToggle
                {...register("password")}
              />
              <FormInput
                id="repeat-password"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                error={errors.repeatPassword?.message}
                showPasswordToggle
                {...register("repeatPassword")}
              />
              {error && (
                <Text fontSize="sm" color="red.500">
                  {error}
                </Text>
              )}
              <Button type="submit" width="full" isLoading={isLoading} loadingText="Creating an account...">
                Sign in
              </Button>
            </Stack>
            <Box mt={4} textAlign="center" fontSize="sm">
              Have an account?{" "}
              <Link href="/auth/login" passHref legacyBehavior>
                <ChakraLink as="a" textDecoration="underline" color="red.500">
                  Login
                </ChakraLink>
              </Link>
            </Box>
          </form>
        </VStack>
    </Box>
  );
}
