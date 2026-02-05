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
import { Check, Circle } from "lucide-react";
import CustomButton from "./custom-button";

interface PackageFeature {
  feature: string;
  quantity?: string;
  _key?: string;
}

interface PackageCardProps {
  name: string;
  price: number;
  currency: string;
  packageType: "basic" | "standard" | "premium";
  description?: string;
  features?: PackageFeature[];
  image?: any;
  popular?: boolean;
}

const PackageCard = ({
  name,
  price,
  currency,
  packageType,
  description,
  features = [],
  image,
  popular = false,
  ...rest
}: PackageCardProps) => {
  const currencySymbol =
    currency === "USD"
      ? "$"
      : currency === "NGN"
        ? "₦"
        : currency === "GBP"
          ? "£"
          : "€";

  console.log("features", features);

  return (
    <>
      <VStack maxW={"280px"} color={"#03453B"}>
        {image && (
          <Image
            src={getImageUrl(image, 80)}
            alt={name}
            w="100%"
            maxW={"280px"}
            h="168px"
            objectFit="cover"
            borderRadius="6px"
          />
        )}
        <VStack align="start" spacing={2} flex={1} w={"100%"}>
          <HStack justifyContent={"space-between"} w={"100%"} gap={1}>
            <Text fontSize={["sm", "md"]} color="#03453B">
              {name}
            </Text>
            <Text color="#03453B">
              {currency} {parseFloat(String(price)).toLocaleString()}
            </Text>
          </HStack>
          <Text fontSize={["xs", "13px"]} noOfLines={2}>
            {description || "No description"}
          </Text>
          {features.length > 0 && (
            <VStack align="start" spacing={2} mb={4}>
              {features.slice(0, 3).map((feature, index) => (
                <HStack key={feature._key || index} spacing={2} align="start">
                  <Box mt={0.5}>
                    <Check size={16} color="#A70B1C" />
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

        <HStack spacing={1} w={"full"} mt={4}>
          <Button
            aria-label="Edit package"
            size="sm"
            variant="ghost"
            // onClick={() => handleEditPackage(pkg, index)}
            bg={"#A70B1C0A"}
            borderRadius={"sm"}
            _hover={{
              bg: "#A70B1C0A",
            }}
            fontWeight={400}
            flex={1}
          >
            Purchase Package
          </Button>
          <Button
            aria-label="Edit package"
            size="sm"
            variant="ghost"
            // onClick={() => handleEditPackage(pkg, index)}
            bg={"#A70B1C0A"}
            borderRadius={"sm"}
            _hover={{
              bg: "#A70B1C0A",
            }}
            fontWeight={400}
            flex={1}
          >
            Add to Cart
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default PackageCard;
