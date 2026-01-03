"use client";

import {
  Box,
  Container,
  HStack,
  Link as ChakraLink,
  Text,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { Calendar, Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { HeaderAuth } from "./header-auth";

interface HeaderProps {
  activePath?: string;
}

export function Header({ activePath }: HeaderProps) {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? "/";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <Box w="full">
      {/* Top Info Bar */}
      <Box bg="#2D3748" color="white" py={2}>
        <Container maxW="container.xl" px={4}>
          <HStack
            justifyContent="space-between"
            spacing={6}
            fontSize="sm"
            flexWrap="wrap"
          >
            <Link href="/" passHref legacyBehavior>
              <ChakraLink color="gray.300" _hover={{ color: "white" }}>
                Home
              </ChakraLink>
            </Link>
            <HStack spacing={6} flexWrap="wrap">
              <HStack spacing={2}>
                <Icon as={Calendar} boxSize={4} />
                <Text>IELTS Exam Coming upon the 28th January</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={Phone} boxSize={4} />
                <Text>+(406) 555-0120</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={Mail} boxSize={4} />
                <Text>ckctm12@gmail.com</Text>
              </HStack>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Main Navigation Bar */}
      <Box bg="white" borderBottomWidth="1px" borderColor="gray.200">
        <Container maxW="container.xl" px={4}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            py={4}
            spacing={8}
          >
            {/* Logo Section */}
            <Link href="/" passHref legacyBehavior>
              <ChakraLink
                display="flex"
                alignItems="center"
                gap={3}
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  bg="#FF6B35"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                      fill="white"
                    />
                  </svg>
                </Box>
                <Box>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="#FF6B35"
                    lineHeight="1.2"
                  >
                    EXPRESS MED
                  </Text>
                  <Text fontSize="xs" color="#FF6B35" lineHeight="1.2">
                    GLOBAL SERVICES
                  </Text>
                </Box>
              </ChakraLink>
            </Link>

            {/* Navigation Links */}
            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} passHref legacyBehavior>
                  <ChakraLink
                    px={4}
                    py={2}
                    borderRadius="md"
                    fontWeight="medium"
                    color={isActive(link.href) ? "brand.500" : "gray.600"}
                    bg={isActive(link.href) ? "gray.100" : "transparent"}
                    _hover={{
                      color: "brand.500",
                      bg: isActive(link.href) ? "gray.100" : "gray.50",
                    }}
                  >
                    {link.label}
                  </ChakraLink>
                </Link>
              ))}
            </HStack>

            {/* Auth Buttons */}
            <HeaderAuth />
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}

