import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { getImageUrl } from "@/lib/sanity/image.service";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: any;
  slug: string;
}

const ServiceCard = ({ title, description, image, slug }: ServiceCardProps) => {
  return (
    <Link href={`/services/${slug}`}>
      <Box
        position="relative"
        h="400px"
        borderRadius="16px"
        overflow="hidden"
        cursor="pointer"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-4px)",
          boxShadow: "xl",
        }}
      >
        {/* Background Image */}
        <Image
          src={image ? getImageUrl(image, 800) : "/images/placeholder.jpg"}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
          position="absolute"
          top={0}
          left={0}
        />

        {/* arror */}
        <Box
          position="absolute"
          top={0}
          right={0}
          p={6}
          zIndex={1}
          transform={"rotate(-45deg)"}
        >
          <ArrowRightIcon color="#fff" />
        </Box>

        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-t, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)"
        />

        {/* Content Overlay */}
        <VStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={6}
          align="start"
          spacing={2}
          zIndex={1}
        >
          <Heading fontSize={["25px"]} color="white" fontWeight="600">
            {title}
          </Heading>
          <Text
            color="whiteAlpha.900"
            fontSize={["16px"]}
            noOfLines={3}
            lineHeight="1.6"
          >
            {description}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default ServiceCard;
