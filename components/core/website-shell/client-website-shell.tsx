"use client";
import { ReactNode } from "react";
import { Box, VStack } from "@chakra-ui/react";
import FooterNav from "../nav/footer-nav";
import ClientHomeNav from "../nav/client-home-nav";

interface Props {
  children: ReactNode;
}

const ClientWebsiteShell = ({ children }: Props) => {
  return (
    <VStack align={"stretch"} minH={"100vh"}>
      <ClientHomeNav />
      <Box h={"25px"} />
      <Box flex={1}>{children}</Box>
      <FooterNav />
    </VStack>
  );
};

ClientWebsiteShell.displayName = "ClientWebsiteShell";

export default ClientWebsiteShell;
