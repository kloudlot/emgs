import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import {
  Box,
  VStack,
  HStack,
  Container,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box as="main" minH="100vh" display="flex" flexDirection="column" alignItems="center">
      <VStack flex={1} w="full" spacing={20} align="stretch">
        <Box
          as="nav"
          w="full"
          display="flex"
          justifyContent="center"
          borderBottomWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
          h={16}
        >
          <Container maxW="5xl" w="full" display="flex" justifyContent="space-between" alignItems="center" p={3} px={5} fontSize="sm">
            <HStack spacing={5} align="center" fontWeight="semibold">
              <Link href="/" passHref >
                <ChakraLink as="a">Next.js Supabase Starter</ChakraLink>
              </Link>
              <HStack spacing={2} align="center">
                <DeployButton />
              </HStack>
            </HStack>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </Container>
        </Box>
        <Container maxW="5xl" flex={1} p={5}>
          <VStack spacing={20} align="stretch" flex={1}>
            {children}
          </VStack>
        </Container>

        <Box
          as="footer"
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderTopWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
          mx="auto"
          textAlign="center"
          fontSize="xs"
          gap={8}
          py={16}
        >
          <Text>
            Powered by{" "}
            <ChakraLink
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: "underline" }}
              rel="noreferrer"
            >
              Supabase
            </ChakraLink>
          </Text>
          <ThemeSwitcher />
        </Box>
      </VStack>
    </Box>
  );
}
