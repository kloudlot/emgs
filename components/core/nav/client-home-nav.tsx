"use client";
import {
  Container,
  Box,
  Flex,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import NavLinks from "./nav-links";
import MobileNav from "./mobile-nav";
import CartIcon from "./cart-icon";

const ClientHomeNav = () => {
  return (
    <Box>
      <Box bg={"#28353D"} mb={["10px", "14px", "28px"]}>
        <Container
          maxW="1220px"
          w="full"
          display="flex"
          justifyContent={["center", "center", "flex-end"]}
          alignItems="center"
          p={3}
          px={5}
        >
          <Flex gap={[3, 5]} alignItems={"center"} flexDirection={["column", "row"]}>
            {/* phone */}
            <Flex gap={2} alignItems={"center"}>
              <Phone color={"#ffffff"} size={14} />
              <Text color={"#ffffff"} fontSize={["11px", "12px", "13px"]}>
                +234 800 000 0000
              </Text>
            </Flex>
            {/* email */}
            <Flex gap={2} alignItems={"center"}>
              <Mail color={"#ffffff"} size={14} />
              <Text color={"#ffffff"} fontSize={["11px", "12px", "13px"]}>
                ckctm12@gmail.com
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container
        maxW="1220px"
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={5}
      >
        <Link href="/">
          <Box
            as="img"
            src="/images/logo.png"
            alt="logo"
            width={["40px", "50px"]}
            height={["40px", "50px"]}
            objectFit="contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing={8} alignItems="center" display={["none", "none", "flex"]}>
          <NavLinks />
          {/* cart cta */}
          <CartIcon />
        </HStack>

        {/* Desktop Auth */}
        <Box display={["none", "none", "flex"]}>
          <HStack spacing={2}>
            <Link href="/auth/login" passHref>
              <Button
                size="lg"
                variant="ghost"
                color={"brand.500"}
                borderRadius={"24px"}
                _hover={{
                  bg: "#F7F7F7",
                }}
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up" passHref>
              <Button size="lg" colorScheme="brand" borderRadius={"24px"}>
                Sign up
              </Button>
            </Link>
          </HStack>
        </Box>

        {/* Mobile Navigation (Client Side) */}
        <MobileNav
          authButton={
            <HStack spacing={2}>
              <Link href="/auth/login" passHref>
                <Button
                  size="lg"
                  variant="ghost"
                  color={"brand.500"}
                  borderRadius={"24px"}
                  _hover={{
                    bg: "#F7F7F7",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/sign-up" passHref>
                <Button size="lg" colorScheme="brand" borderRadius={"24px"}>
                  Sign up
                </Button>
              </Link>
            </HStack>
          }
        />
      </Container>
    </Box>
  );
};

ClientHomeNav.displayName = "ClientHomeNav";
export default ClientHomeNav;
