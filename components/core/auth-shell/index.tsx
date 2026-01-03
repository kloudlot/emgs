// "use client";

import { Flex, Box, Image, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

import dynamic from "next/dynamic";

const RightSlider = dynamic(() => import("../slider/right-slider"), {
  ssr: true,
  loading: () => null,
});

interface Props {
  children: ReactNode;
}

export default function AuthShell({ children }: Props) {
  return (
    <Flex minH="100vh">
      {/* Left: Auth Content */}
      <Box flex={1} bg="#F9FBFC" px={{ base: 6, md: 12 }} py={10}>
        <Container maxW={"540px"} mx={"auto"}>
          {/* logo */}
          <Box
            as="img"
            src="/images/logo.png"
            alt="logo"
            width={"60px"}
            height={"60px"}
            mb={"54px"}
          />
          {/* children content */}
          {children}
        </Container>
      </Box>

      {/* Right: Shared Slider */}
      <Box
        flex={1}
        bg="brand.500"
        display={{ base: "none", lg: "block" }}
        maxW="50%"
      >
        <RightSlider />
      </Box>
    </Flex>
  );
}
