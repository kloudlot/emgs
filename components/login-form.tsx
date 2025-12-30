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
import {
  Box,
  Stack,
  Text,
  Link as ChakraLink,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export function LoginForm(props: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box {...props}>
      <VStack align={"stretch"} spacing={12}>
        <Box>
          <Text fontSize={["2xl", "3xl", "4xl"]} color={"#171923"} fontWeight={"700"}>Welcome</Text>
          <Text fontSize={["sm", "md", "lg"]} color={"#171923"}>Lets get you logged in</Text>
        </Box>
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
            <Box>
              <Box display="flex" alignItems="center" mb={2}>
                <FormLabel htmlFor="password" mb={0}>
                  Password
                </FormLabel>
                <Link href="/auth/forgot-password" passHref legacyBehavior>
                  <ChakraLink
                    as="a"
                    ml="auto"
                    fontSize="sm"
                    textDecoration="underline"
                  >
                    Forgot your password?
                  </ChakraLink>
                </Link>
              </Box>
              <FormInput
                id="password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                showPasswordToggle
                {...register("password")}
              />
            </Box>
            {error && (
              <Text fontSize="sm" color="red.500">
                {error}
              </Text>
            )}
            <Button
              type="submit"
              width="full"
              isLoading={isLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </Stack>
          <Box mt={4} textAlign="center" fontSize="sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" passHref legacyBehavior>
              <ChakraLink as="a" textDecoration="underline">
                Sign up
              </ChakraLink>
            </Link>
          </Box>
        </form>
      </VStack>
    </Box>
  );
}
