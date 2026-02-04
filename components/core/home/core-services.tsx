import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Container,
} from "@chakra-ui/react";

const ServiceCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <Box
      position="relative"
      borderRadius="24px"
      overflow="hidden"
      h="380px"
      role="group"
      cursor="pointer"
    >
      <Box
        as="img"
        src={image}
        alt={title}
        w="full"
        h="full"
        objectFit="cover"
        transition="transform 0.4s ease"
        _groupHover={{ transform: "scale(1.05)" }}
      />
      {/* Dark Gradient Overlay */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        top="40%"
        bgGradient="linear(to-t, blackAlpha.900, blackAlpha.600, transparent)"
        zIndex={1}
      />
      <Box position="absolute" bottom={0} left={0} right={0} p={6} zIndex={2}>
        <Text
          color={"#ffffff"}
          fontSize={"24px"}
          fontWeight="bold"
          lineHeight="1.2"
        >
          {title}
        </Text>
      </Box>
    </Box>
  );
};

const CoreServices = () => {
  const services = [
    {
      title: "Exam & Certification Prep",
      image: "/images/services/exams-cert.png",
    },
    {
      title: "Study Abroad Admissions",
      image: "/images/services/overseas.png",
    },
    {
      title: "Career & Job Application Support",
      image: "/images/services/careers.png",
    },
    {
      title: "Visa & Relocation Assistance",
      image: "/images/services/relocation.png",
    },
  ];

  return (
    <VStack align={"stretch"} spacing={12}>
      <VStack align={"flex-start"} spacing={2}>
        <Heading
          fontSize={["32px", "40px", "48px"]}
          fontWeight="800"
          letterSpacing="-0.02em"
        >
          Our Core Services
        </Heading>
        <Text color="#7C7C7C" fontSize={["lg", "xl"]} maxW="800px">
          Comprehensive support for your journey to study and work abroad — all
          in one place.
        </Text>
      </VStack>

      <SimpleGrid columns={[1, 2, 4]} spacing={6}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            image={service.image}
          />
        ))}
      </SimpleGrid>

      <Box display="flex" justifyContent="center" pt={4}>
        <Button
          bg="#B30E14"
          color="white"
          height="60px"
          px={12}
          borderRadius="full"
          fontSize="lg"
          fontWeight="bold"
          _hover={{
            bg: "#930c10",
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          transition="all 0.3s"
        >
          Schedule Consultation
        </Button>
      </Box>
    </VStack>
  );
};

CoreServices.displayName = "CoreServices";
export default CoreServices;
