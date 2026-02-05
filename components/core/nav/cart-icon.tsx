"use client";
import { Box, HStack, Text, Badge } from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";

export default function CartIcon() {
  const router = useRouter();
  const { totalItems } = useCart();

  return (
    <HStack
      spacing={2}
      cursor="pointer"
      _hover={{ opacity: 0.8 }}
      onClick={() => router.push("/cart")}
    >
      <Box position="relative">
        <ShoppingCart size={24} color="#ADADAD" />
        {totalItems > 0 && (
          <Badge
            position="absolute"
            top="-8px"
            right="-8px"
            borderRadius="full"
            bg="#A70B1C"
            color="white"
            fontSize="10px"
            minW="18px"
            h="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {totalItems}
          </Badge>
        )}
      </Box>
      <Text color={"#ADADAD"} fontSize={"lg"} fontWeight="medium">
        Cart
      </Text>
    </HStack>
  );
}
