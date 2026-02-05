"use client";
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Link,
  Divider,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Ticket,
  FileText,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Service & Product", icon: Package, href: "/admin/service-product" },
  { label: "Affiliate and Coupons", icon: Ticket, href: "/admin/affiliate-coupons" },
  { label: "CMS Blog", icon: FileText, href: "/admin/cms-blog" },
  { label: "User Management", icon: Users, href: "/admin/user-management" },
  { label: "Service Purchases", icon: CreditCard, href: "/admin/service-purchases" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

const AdminSidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <Box
      w="280px"
      h="100vh"
      borderRight="1px solid"
      borderColor="gray.100"
      position="fixed"
      left={0}
      top={0}
      py={8}
      zIndex={20}
      display={{ base: "none", md: "block" }}
      bg="#F9FAFB"
    >
      <VStack spacing={8} align="stretch" px={6}>
        {/* Logo Section */}
        <Box px={2}>
          <HStack spacing={3} align="center">
            <Box
              as="img"
              src="/images/logo.png"
              alt="logo"
              width="40px"
              height="40px"
              objectFit="contain"
            />
            <VStack align="flex-start" spacing={0}>
              <Text
                fontSize="10px"
                fontWeight="bold"
                lineHeight="1"
                color="brand.500"
                textTransform="uppercase"
              >
                Express Med
              </Text>
              <Text
                fontSize="10px"
                fontWeight="bold"
                lineHeight="1"
                color="brand.500"
                textTransform="uppercase"
              >
                Global Services
              </Text>
            </VStack>
          </HStack>
        </Box>

        <Divider />

        {/* Navigation Items */}
        <VStack spacing={2} align="stretch">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                _hover={{ textDecoration: "none" }}
                onClick={onClose}
              >
                <HStack
                  spacing={4}
                  px={4}
                  py={3}
                  borderRadius="10px"
                  bg={isActive ? "brand.500" : "transparent"}
                  color={isActive ? "white" : "gray.500"}
                  fontWeight={isActive ? "semibold" : "medium"}
                  transition="all 0.2s"
                  _hover={{
                    bg: isActive ? "brand.500" : "gray.50",
                    color: isActive ? "white" : "brand.500",
                  }}
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text fontSize="15px">{item.label}</Text>
                </HStack>
              </Link>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
