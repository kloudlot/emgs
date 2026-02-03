"use client";

import {
  Box,
  Text,
  VStack,
  Heading,
  HStack,
  Button,
  Container,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { Award, Globe, ShieldCheck } from "lucide-react";

const HomeHero = () => {
  return (
    <Box
      bg={"#B30E14"} // Deep brand red as seen in mockup
      minH={"700px"}
      borderRadius={"24px"}
      position={"relative"}
      overflow={"hidden"}
      mt={4}
    >
      {/* Background Grid Pattern */}
      <Box
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.15}
        backgroundImage="radial-gradient(circle, white 1px, transparent 1px)"
        backgroundSize="30px 30px"
        zIndex={0}
      />

      {/* Abstract Circular Shapes (Right side) */}
      {/* <Box
        position={"absolute"}
        top="5%"
        right="2%"
        width="200px"
        height="200px"
        backgroundImage="repeating-linear-gradient(45deg, white, white 2px, transparent 2px, transparent 10px)"
        borderRadius="full"
        opacity={0.3}
        zIndex={0}
      /> */}
      {/* <Box
        position={"absolute"}
        bottom="40%"
        right="20%"
        width="100px"
        height="100px"
        backgroundImage="repeating-linear-gradient(-45deg, white, white 2px, transparent 2px, transparent 10px)"
        borderRadius="full"
        opacity={0.3}
        zIndex={0}
      /> */}

      {/* Background Image (Characters) */}
      <Box
        position={"absolute"}
        right={["-10%", "-5%", "0"]}
        bottom={0}
        h={["60%", "75%", "90%"]}
        zIndex={1}
      >
        <Box
          as="img"
          src="/images/hero.svg"
          alt="EMGS Characters"
          h={"100%"}
          objectFit="contain"
          objectPosition="bottom right"
          transform={"translateY(24%) scale(1.3)"}
        />
      </Box>

      {/* Content Layer */}
      <Container maxW="1220px" position="relative" zIndex={2} h="100%">
        <VStack
          align={"flex-start"}
          justify="center"
          h="100%"
          minH="600px"
          spacing={8}
          py={20}
        //   px={20}
          maxW={["full", "full", "720px"]}
          color="white"
        >
          <VStack align="flex-start" spacing={4}>
            <Heading
              fontSize={["40px", "52px", "64px"]}
              fontWeight="800"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Unlock Your Career Potential Abroad
            </Heading>
            <Text
              fontSize={["16px", "18px"]}
              opacity={0.9}
              maxW="500px"
              fontWeight="medium"
            >
              Expert guidance for exams, job applications, and international study
              — supporting your journey from planning to relocation.
            </Text>
          </VStack>

          {/* CTA Buttons */}
          <HStack spacing={4}>
            <Button
              bg="white"
              color="#B30E14"
              size="lg"
              px={10}
              height="56px"
              borderRadius="full"
              fontSize="lg"
              fontWeight="700"
              _hover={{ bg: "gray.100", transform: "scale(1.02)" }}
              transition="all 0.2s"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              colorScheme="white"
              borderWidth="2px"
              size="lg"
              px={10}
              height="56px"
              borderRadius="full"
              fontSize="lg"
              fontWeight="700"
              _hover={{ bg: "whiteAlpha.200", transform: "scale(1.02)" }}
              transition="all 0.2s"
            >
              Explore Services
            </Button>
          </HStack>

          {/* Statistics Section */}
          <SimpleGrid columns={[1, 3]} spacing={10} pt={10} w="full">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Award} fontSize="28px" mt={1} />
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="800" fontSize="md">99% Client Satisfaction</Text>
                <Text fontSize="sm" opacity={0.8} lineHeight="short">Clear proof of success and quality support.</Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" spacing={3}>
              <Icon as={Globe} fontSize="28px" mt={1} />
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="800" fontSize="md">Certified Global Advisors</Text>
                <Text fontSize="sm" opacity={0.8} lineHeight="short">Get experts guide for your applications accurately.</Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" spacing={3}>
              <Icon as={ShieldCheck} fontSize="28px" mt={1} />
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="800" fontSize="md">Opportunities in 10+ Countries</Text>
                <Text fontSize="sm" opacity={0.8} lineHeight="short">Access schools and employers across top destinations</Text>
              </VStack>
            </HStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeHero;
