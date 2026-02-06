"use client";
import { Box, VStack, Text, Image } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import CustomButton from "./custom-button";

interface EmptyCouponStateProps {
  onCreateClick: () => void;
}

export default function EmptyCouponState({ onCreateClick }: EmptyCouponStateProps) {
  return (
    <Box
      bg="white"
      p={16}
      borderRadius="16px"
      border="1px solid"
      borderColor="gray.100"
      textAlign="center"
    >
      <VStack spacing={6}>
        {/* Empty state illustration */}
        <Box>
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="50" fill="#F7FAFC" />
            <circle cx="60" cy="60" r="40" fill="#EDF2F7" />
            <path
              d="M45 60H75M60 45V75"
              stroke="#CBD5E0"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </Box>

        {/* Text */}
        <VStack spacing={2}>
          <Text fontSize="20px" fontWeight="600" color="#1a1a1a">
            Coupon list is Empty
          </Text>
          <Text fontSize="14px" color="gray.500" maxW="400px">
            No coupon created yet, click on the button below to create a coupon
          </Text>
        </VStack>

        {/* Create Button */}
        <CustomButton
          text="Create Coupon"
          leftIcon={<Plus size={18} />}
          colorScheme="brand"
          bg="#A70B1C"
          onClick={onCreateClick}
          px={6}
          borderRadius="sm"
          _hover={{ bg: "#8A0916" }}
        />
      </VStack>
    </Box>
  );
}
