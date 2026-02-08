"use client";
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  iconBg?: string;
  iconColor?: string;
}

export default function StatsCard({
  icon,
  label,
  value,
  iconBg = "brand.500",
  iconColor = "white",
}: StatsCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="12px"
      p={6}
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
      transition="all 0.2s"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
    >
      <VStack align="stretch" spacing={3}>
        {/* Icon */}
        <Box
          bg={iconBg}
          w="48px"
          h="48px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} boxSize={6} color={iconColor} />
        </Box>

        {/* Label */}
        <Text fontSize="14px" color="gray.600" fontWeight="500">
          {label}
        </Text>

        {/* Value */}
        <Text fontSize="32px" fontWeight="700" color="gray.900" lineHeight="1">
          {value}
        </Text>
      </VStack>
    </Box>
  );
}
