"use client";
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Heading,
} from "@chakra-ui/react";
import {
  MoreVertical,
  Copy,
  Edit,
  Trash2,
  Ticket,
} from "lucide-react";
import { Coupon } from "@/lib/types/coupon";
import { useState } from "react";

interface CouponCardProps {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

export default function CouponCard({ coupon, onEdit, onDelete }: CouponCardProps) {
  const toast = useToast();
  const [copying, setCopying] = useState(false);

  const copyToClipboard = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(coupon.code);
      toast({
        title: "Copied!",
        description: `Coupon code "${coupon.code}" copied to clipboard`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy coupon code",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setTimeout(() => setCopying(false), 500);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const getDiscountDisplay = () => {
    if (coupon.discount_type === "percentage") {
      return `${coupon.discount_value}%`;
    }
    return `$${coupon.discount_value}`;
  };

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="12px"
      border="1px solid"
      borderColor="gray.200"
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
    >
      {/* Header */}
      <HStack justify="space-between" mb={4}>
        <Box
          p={2}
          bg="gray.50"
          borderRadius="8px"
        >
          <Ticket size={24} color="#A70B1C" />
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<MoreVertical size={20} />}
            variant="ghost"
            size="sm"
            borderRadius="full"
            aria-label="Actions"
          />
          <MenuList>
            <MenuItem
              icon={<Edit size={16} />}
              onClick={() => onEdit(coupon)}
            >
              Edit Coupon
            </MenuItem>
            <MenuItem
              icon={<Trash2 size={16} />}
              onClick={() => onDelete(coupon)}
              color="red.500"
            >
              Delete Coupon
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* Coupon Code */}
      <HStack mb={6} spacing={3}>
        <Heading size="lg" fontWeight="700" color="#1a1a1a">
          {coupon.code}
        </Heading>
        <IconButton
          icon={<Copy size={18} />}
          aria-label="Copy code"
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          isLoading={copying}
          _hover={{ bg: "gray.100" }}
        />
      </HStack>

      {/* Details */}
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontSize="14px" color="gray.600">
            Expire Date
          </Text>
          <Text fontSize="14px" fontWeight="500" color="gray.800">
            {formatDate(coupon.expire_date)}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="14px" color="gray.600">
            Discount type
          </Text>
          <Text fontSize="14px" fontWeight="500" color="gray.800" textTransform="capitalize">
            {coupon.discount_type}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="14px" color="gray.600">
            Amount/Percentage
          </Text>
          <Text fontSize="14px" fontWeight="500" color="gray.800">
            {getDiscountDisplay()}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="14px" color="gray.600">
            Use count
          </Text>
          <Text fontSize="14px" fontWeight="500" color="gray.800">
            {coupon.use_count}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="14px" color="gray.600">
            Maximum Use Count
          </Text>
          <Text fontSize="14px" fontWeight="500" color="gray.800">
            {coupon.maximum_use_count}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
