"use client";

import { createClient } from "@/lib/supabase/client";
import { FormInput } from "@/components/ui/form-input";
import {
  Box,
  Stack,
  Text,
  Link as ChakraLink,
  VStack,
  FormLabel,
  Button,
  Checkbox,
  Heading,
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
      <VStack align="stretch" mb="32px">
        <Heading fontSize={["39px"]} variant="h3">
          Welcome back
        </Heading>
        <Text fontSize={["20px"]} color="#171923">
          Lets get you logged in
        </Text>
      </VStack>
      <VStack align={"stretch"} spacing={12}>
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
              <FormInput
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                showPasswordToggle
                {...register("password")}
              />
              <Box display="flex" alignItems="center" mt={2}>
                <Checkbox
                  color={"#718096"}
                  id="remember-me"
                  colorScheme="brand"
                  size="lg"
                >
                  Remember me
                </Checkbox>
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
          <Box mt={4} textAlign="center" fontSize="md">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" passHref>
              <ChakraLink
                as="span"
                textDecoration="none"
                color="brand.500"
                fontSize={["md", "lg"]}
              >
                Create now
              </ChakraLink>
            </Link>
          </Box>
        </form>
      </VStack>
    </Box>
  );
}
