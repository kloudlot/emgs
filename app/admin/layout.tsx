"use client";
import AdminHeader from "@/components/core/admin/admin-header";
import AdminSidebar from "@/components/core/admin/admin-sidebar";
import { Box, Flex } from "@chakra-ui/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh" bg="#FFFFFF">
      {/* Sidebar - Fixed width sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <Box flex={1} ml="280px">
        <AdminHeader />
        <Box p={8} as="main">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
