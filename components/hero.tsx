import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import { Box, VStack, HStack, Heading, Text, Link, Divider } from "@chakra-ui/react";

export function Hero() {
  return (
    <VStack spacing={16} align="center">
      <HStack spacing={8} justify="center" align="center">
        <Link
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </Link>
        <Divider orientation="vertical" height={6} />
        <Link href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </Link>
      </HStack>
      <Heading as="h1" size="lg" visibility="hidden" position="absolute">
        Supabase and Next.js Starter Template
      </Heading>
      <Text
        fontSize={{ base: "3xl", lg: "4xl" }}
        lineHeight="tight"
        mx="auto"
        maxW="xl"
        textAlign="center"
      >
        The fastest way to build apps with{" "}
        <Link
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          fontWeight="bold"
          textDecoration="underline"
          _hover={{ textDecoration: "underline" }}
          rel="noreferrer"
        >
          Supabase
        </Link>{" "}
        and{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          fontWeight="bold"
          textDecoration="underline"
          _hover={{ textDecoration: "underline" }}
          rel="noreferrer"
        >
          Next.js
        </Link>
      </Text>
      <Box
        w="full"
        h="1px"
        bgGradient="linear(to-r, transparent, gray.300, transparent)"
        _dark={{ bgGradient: "linear(to-r, transparent, gray.600, transparent)" }}
        my={8}
      />
    </VStack>
  );
}
