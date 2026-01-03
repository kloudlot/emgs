import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
import { Header } from "@/components/header";

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
                <ChakraLink as="a">Next.js Supabase Starterrr</ChakraLink>
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
              </VStack>
            </Box>
          </VStack>
        </Container>

      
      </VStack>
    </Box>
  );
}
