import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { HStack, Text, Link as ChakraLink, Button } from "@chakra-ui/react";

export async function AuthButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <HStack spacing={4} align="center">
      <Text>Hey, {user.email}!</Text>
      <LogoutButton />
    </HStack>
  ) : (
    <HStack spacing={2}>
      <Link href="/auth/login" passHref >
        <Button size="lg" variant="ghost" color={"brand.500"} borderRadius={"24px"} _hover={{
          bg: "#F7F7F7",
        }} >
          Login
        </Button>
      </Link>
      <Link href="/auth/sign-up" passHref >
        <Button size="lg" colorScheme="brand" borderRadius={"24px"}>
          Sign up
        </Button>
      </Link>
    </HStack>
  );
}
