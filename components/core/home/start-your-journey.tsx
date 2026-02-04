"use client";
import CustomButton from "@/components/custom-button";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useTheme,
  Image,
} from "@chakra-ui/react";
import React from "react";

const StartYourJourney = () => {
  const theme = useTheme();
  const brandColor = "brand.500";

  return (
    <Box
      bg={brandColor}
      py={20}
      position="relative"
      overflow="hidden"
      color="white"
    >
      {/* Background SVG Particles */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="full"
        h="full"
        pointerEvents="none"
        opacity={0.9}
        zIndex={0}
        transform={"translateY(56%)"}
      >
        <Image
          src="/images/pattern/pattern.svg"
          objectFit={"contain"}
          alt="pattern"
        //   maxW={"420px"}
        />
      </Box>

      <Container maxW="1420px" position="relative" zIndex={1}>
        <SimpleGrid
          columns={[1, 1, 2]}
          spacing={[12, 16, 20]}
          alignSelf="center"
        >
          {/* Left Column: Heading */}
          <VStack align="flex-start" spacing={6} pt={[0, 10]}>
            <Heading
              fontSize={["40px", "52px", "64px"]}
              fontWeight="800"
              lineHeight="1.1"
              maxW="500px"
            >
              Start Your Global Journey Today
            </Heading>
            <Text fontSize="lg" opacity={0.9} maxW="450px" lineHeight="1.6">
              From exam prep to relocation support, select your services and let
              us guide you every step of the way
            </Text>
          </VStack>

          {/* Right Column: Form Card */}
          <Box
            bg="white"
            borderRadius="24px"
            p={[6, 10]}
            color="gray.800"
            boxShadow="2xl"
          >
            <VStack spacing={6}>
              <SimpleGrid columns={[1, 2]} spacing={6} w="full">
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                  >
                    Full Name
                  </FormLabel>
                  <Input
                    placeholder="Jamal Nnamdi"
                    bg="gray.50"
                    border="none"
                    h="50px"
                    _placeholder={{ color: "gray.400" }}
                    colorScheme="brand"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                  >
                    Email Address
                  </FormLabel>
                  <Input
                    placeholder="JamalNnamdi@email.com"
                    bg="gray.50"
                    border="none"
                    h="50px"
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={[1, 2]} spacing={6} w="full">
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                  >
                    Phone Number
                  </FormLabel>
                  <Input
                    placeholder="080123456789"
                    bg="gray.50"
                    border="none"
                    h="50px"
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                  >
                    Location
                  </FormLabel>
                  <Input
                    placeholder="Lagos, Nigeria"
                    bg="gray.50"
                    border="none"
                    h="50px"
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="semibold" color="gray.600">
                  What can we do for you
                </FormLabel>
                <Select
                  placeholder="International Job opportunity"
                  bg="gray.50"
                  border="none"
                  h="50px"
                  color="gray.800"
                  _focus={{
                    shadow: "none",
                  }}
                >
                  <option value="study-abroad">Study Abroad Assistance</option>
                  <option value="exam-prep">Exam & Certification Prep</option>
                  <option value="relocation">
                    Visa & Relocation Assistance
                  </option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="semibold" color="gray.600">
                  Message
                </FormLabel>
                <Textarea
                  placeholder="Leave us a message..."
                  bg="gray.50"
                  border="none"
                  rows={6}
                  _placeholder={{ color: "gray.400" }}
                  colorScheme="brand"
                shadow={"none"}
                _focus={{ shadow: "none" }}
                />
              </FormControl>
              <CustomButton w={"full"} text="Send message" onClick={() => {}} />
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default StartYourJourney;
