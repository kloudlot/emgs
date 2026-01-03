"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { HStack, Button, Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function HeaderAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    checkUser();
  }, []);

  return (
    <HStack spacing={3}>
      {user ? (
        <Link href="/protected" passHref legacyBehavior>
          <Button
            as={ChakraLink}
            variant="ghost"
            colorScheme="brand"
            color="brand.500"
            _hover={{ bg: "gray.50" }}
          >
            Dashboard
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/auth/login" passHref legacyBehavior>
            <Button
              as={ChakraLink}
              variant="ghost"
              colorScheme="brand"
              color="brand.500"
              _hover={{ bg: "gray.50" }}
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/sign-up" passHref legacyBehavior>
            <Button
              as={ChakraLink}
              colorScheme="brand"
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.600" }}
            >
              Sign up
            </Button>
          </Link>
        </>
      )}
    </HStack>
  );
}

