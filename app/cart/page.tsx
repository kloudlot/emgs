"use client";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { getImageUrl } from "@/lib/sanity/image.service";
import ClientWebsiteShell from "@/components/core/website-shell/client-website-shell";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, totalItems, totalPrice } = useCart();

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "$";
      case "NGN":
        return "₦";
      case "GBP":
        return "£";
      case "EUR":
        return "€";
      default:
        return currency;
    }
  };

  // Group items by currency for total calculation
  const totalsByCurrency = items.reduce((acc, item) => {
    if (!acc[item.currency]) {
      acc[item.currency] = 0;
    }
    acc[item.currency] += item.price;
    return acc;
  }, {} as Record<string, number>);

  return (
    <ClientWebsiteShell>
      <Box maxW="1200px" mx="auto" px={6} py={12}>
        {/* Go Back Button */}
        <Button
          leftIcon={<ArrowLeft size={20} />}
          variant="ghost"
          onClick={() => router.back()}
          mb={8}
          fontWeight="500"
          fontSize="16px"
          color="#1a1a1a"
          _hover={{ bg: "gray.100" }}
        >
          Go back
        </Button>

        {items.length === 0 ? (
          /* Empty Cart State */
          <VStack spacing={6} py={20}>
            <Heading size="lg" color="gray.600">
              Your cart is empty
            </Heading>
            <Text color="gray.500">
              Add some packages to your cart to get started
            </Text>
            <Button
              colorScheme="red"
              bg="#A70B1C"
              onClick={() => router.push("/services")}
              rightIcon={<ArrowRight size={18} />}
            >
              Browse Services
            </Button>
          </VStack>
        ) : (
          /* Cart Items */
          <Flex
            direction={["column", "column", "row"]}
            gap={8}
            align="flex-start"
          >
            {/* Left Column - Cart Items */}
            <VStack flex={1} align="stretch" spacing={4} w="full">
              {items.map((item) => (
                <HStack
                  key={item.id}
                  spacing={4}
                  p={4}
                  bg="white"
                  borderRadius="8px"
                  border="1px solid"
                  borderColor="gray.200"
                  align="start"
                >
                  {/* Package Image */}
                  <Box
                    w="120px"
                    h="80px"
                    borderRadius="6px"
                    overflow="hidden"
                    bg="gray.200"
                    flexShrink={0}
                  >
                    {item.image ? (
                      <Image
                        src={getImageUrl(item.image, 200)}
                        alt={item.name}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    ) : (
                      <Box w="full" h="full" bg="gray.300" />
                    )}
                  </Box>

                  {/* Package Details */}
                  <VStack align="start" spacing={1} flex={1}>
                    <Text fontWeight="600" fontSize="md" color="#1a1a1a">
                      {item.name}
                    </Text>
                    <Text fontSize="lg" fontWeight="600" color="#A70B1C">
                      {getCurrencySymbol(item.currency)}{" "}
                      {item.price.toLocaleString()}
                    </Text>
                    {item.serviceName && (
                      <Text fontSize="sm" color="gray.600">
                        From: {item.serviceName}
                      </Text>
                    )}
                  </VStack>

                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    color="#A70B1C"
                    onClick={() => removeFromCart(item.id)}
                    _hover={{ bg: "#A70B1C0A" }}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
            </VStack>

            {/* Right Column - Summary */}
            <Box
              w={["full", "full", "380px"]}
              p={6}
              bg="white"
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.200"
              position="sticky"
              top="100px"
            >
              <VStack align="stretch" spacing={6}>
                {/* Total Courses */}
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Total Courses
                  </Text>
                  <Text fontSize="4xl" fontWeight="700" color="#1a1a1a">
                    {totalItems}
                  </Text>
                </Box>

                {/* Total Price */}
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Total
                  </Text>
                  {Object.entries(totalsByCurrency).map(([currency, total]) => (
                    <Text
                      key={currency}
                      fontSize="3xl"
                      fontWeight="700"
                      color="#1a1a1a"
                    >
                      {getCurrencySymbol(currency)}
                      {total.toLocaleString()}
                    </Text>
                  ))}
                </Box>

                {/* Proceed to Checkout Button */}
                <Button
                  colorScheme="red"
                  bg="#A70B1C"
                  size="lg"
                  w="full"
                  rightIcon={<ArrowRight size={20} />}
                  _hover={{ bg: "#8A0916" }}
                  onClick={() => {
                    // TODO: Implement checkout
                    console.log("Proceed to checkout");
                  }}
                >
                  Proceed to Checkout
                </Button>
              </VStack>
            </Box>
          </Flex>
        )}
      </Box>
    </ClientWebsiteShell>
  );
}
