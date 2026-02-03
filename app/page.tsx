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
import HomeContainer from "@/components/core/home/home-container";

export default function Home() {
  return (
    <Box
      as="main"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <HomeContainer />
    </Box>
  );
}
