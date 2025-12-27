import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import {
  Box,
  VStack,
  HStack,
  Container,
  Heading,
  Text,
  Link as ChakraLink,
  Divider,
} from "@chakra-ui/react";

export default function Home() {
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
          <Container maxW="5xl" w="full" display="flex" justifyContent="space-between" alignItems="center" p={3} px={5}>
            <HStack spacing={5} align="center" fontWeight="semibold" fontSize="sm">
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
            <Hero />
            <Box as="main" flex={1} display="flex" flexDirection="column" px={4}>
              <VStack spacing={6} align="stretch">
                <Heading as="h2" size="md" mb={4} fontWeight="medium">
                  Next steps
                </Heading>
                {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
              </VStack>
            </Box>
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
