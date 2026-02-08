"use client";
import {
  Box,
  HStack,
  Container,
  Text,
  Link as ChakraLink,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { Calendar, ExternalLink, ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { format } from "date-fns";

async function UserMenu() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        rightIcon={<ChevronDown size={16} />}
        px={2}
      >
        <HStack spacing={2}>
          <Avatar size="sm" name="Jamal Nnamdi" bg="yellow.400" color="gray.900">
            JN
          </Avatar>
          <VStack align="start" spacing={0} display={{ base: "none", md: "flex" }}>
            <Text fontSize="14px" fontWeight="500">
              Jamal Nnamdi
            </Text>
            <Text fontSize="12px" color="gray.600">
              Admin
            </Text>
          </VStack>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<User size={16} />}>Profile</MenuItem>
        <MenuItem icon={<LogOut size={16} />} color="red.500">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentDate = format(new Date(), "do MMMM yyyy");

  return (
    <Box as="main" minH="100vh" bg="gray.50">
      {/* Header */}
      <Box
        as="nav"
        w="full"
        bg="white"
        borderBottomWidth="1px"
        borderColor="gray.200"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Container maxW="1400px" px={6}>
          <HStack h={16} justify="space-between">
            {/* Logo */}
            <Link href="/" passHref>
              <ChakraLink display="flex" alignItems="center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </ChakraLink>
            </Link>

            {/* Right Section */}
            <HStack spacing={4}>
              {/* Visit Website */}
              <Link href="/" passHref>
                <Button
                  as={ChakraLink}
                  variant="ghost"
                  size="sm"
                  leftIcon={<ExternalLink size={16} />}
                  display={{ base: "none", md: "flex" }}
                >
                  Visit Website
                </Button>
              </Link>

              {/* Date */}
              <HStack
                spacing={2}
                px={3}
                py={2}
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="md"
                display={{ base: "none", md: "flex" }}
              >
                <Calendar size={16} color="#718096" />
                <Text fontSize="14px" color="gray.700">
                  {currentDate}
                </Text>
              </HStack>

              {/* User Menu */}
              <Suspense>
                <UserMenu />
              </Suspense>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="1400px" px={6} py={8}>
        {children}
      </Container>
    </Box>
  );
}
