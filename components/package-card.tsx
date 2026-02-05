"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Icon,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { getImageUrl } from "@/lib/sanity/image.service";
import { ArrowUp, Circle, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface PackageFeature {
  feature: string;
  quantity?: string;
  _key?: string;
}

interface PackageCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  packageType: "basic" | "standard" | "premium";
  description?: string;
  features?: PackageFeature[];
  image?: any;
  popular?: boolean;
  serviceSlug?: string;
  serviceName?: string;
}

const PackageCard = ({
  id,
  name,
  price,
  currency,
  packageType,
  description,
  features = [],
  image,
  popular = false,
  serviceSlug,
  serviceName,
  ...rest
}: PackageCardProps) => {
  const { addToCart } = useCart();
  const currencySymbol =
    currency === "USD"
      ? "$"
      : currency === "NGN"
        ? "₦"
        : currency === "GBP"
          ? "£"
          : "€";

  const handleAddToCart = () => {
    addToCart({  
      id,
      name,
      price,
      currency,
      image,
      serviceSlug,
      serviceName,
      packageType,
    });
  };

  return (
    <>
      <VStack maxW={"380px"} color={"#1a1a1a"}>
        {image && (
          <Image
            src={getImageUrl(image, 80)}
            alt={name}
            w="100%"
            maxW={"380px"}
            h="233px"
            objectFit="cover"
            borderRadius="6px"
          />
        )}
        <VStack align="start" spacing={2} flex={1} w={"100%"}>
          <HStack justifyContent={"space-between"} w={"100%"} gap={1}>
            <Text fontSize={["sm", "md"]} color="#1a1a1a">
              {name}
            </Text>
            <Text color="#1a1a1a">
              {currency} {parseFloat(String(price)).toLocaleString()}
            </Text>
          </HStack>
          <Text fontSize={["xs", "13px"]} noOfLines={2}>
            {description || "No description"}
          </Text>
          {features.length > 0 && (
            <VStack align="start" spacing={2} mb={4}>
              {features.slice(0, 3).map((feature, index) => (
                <HStack
                  key={feature._key || index}
                  spacing={2}
                  align="start"
                  alignItems={"center"}
                >
                  <Box mt={0.5}>
                    <Circle size={8} fill="#A70B1C" color="#A70B1C" />
                  </Box>
                  <Text fontSize="sm" color="gray.700">
                    {feature.quantity && (
                      <Text as="span" fontWeight="600">
                        {feature.quantity}{" "}
                      </Text>
                    )}
                    {feature.feature}
                  </Text>
                </HStack>
              ))}
              {features.length > 3 && (
                <Text fontSize="xs" color="gray.500" fontStyle="italic">
                  +{features.length - 3} more features
                </Text>
              )}
            </VStack>
          )}
        </VStack>

        <HStack spacing={2} w={"full"} mt={4}>
          <Button
            aria-label="Edit package"
            size="sm"
            variant="outline"
            borderRadius={"md"}
            fontWeight={400}
            flex={1}
            borderColor={"#A70B1C"}
            _hover={{
              borderColor: "#A70B1C",
              bg:"transparent"
            }}
            rightIcon={<Icon as={ArrowUp} transform="rotate(45deg)" />}
          >
            Purchase Package
          </Button>
          <Button
            aria-label="Edit package"
            size="sm"
            variant="outline"
            borderRadius={"md"}
            fontWeight={400}
            flex={1}
            borderColor={"#A70B1C"}
            _hover={{
              borderColor: "#A70B1C",
              bg:"transparent"
            }}
            rightIcon={<Icon as={ShoppingCart} />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default PackageCard;
