"use client";
import CustomButton from "@/components/custom-button";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Circle,
  Icon,
  Image,
} from "@chakra-ui/react";
import { Mail } from "lucide-react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <HStack
      bg="white"
      p={6}
      borderRadius="24px"
      boxShadow="0 4px 20px rgba(0,0,0,0.05)"
      spacing={6}
      align="flex-start"
      w="full"
    >
      <Circle size="60px" bg="#B30E14" color="white" fontSize="24px" fontWeight="bold" flexShrink={0}>
        {number}
      </Circle>
      <VStack align="flex-start" spacing={1}>
        <Text color="#B30E14" fontSize="20px" fontWeight="bold">
          {title}
        </Text>
        <Text color="#7C7C7C" fontSize={"15px"} lineHeight="1.5">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};

const HelpProcess = () => {
  return (
    <Flex
      direction={["column", "column", "row"]}
      gap={[12, 16, 20]}
      py={20}
      align="center"
      position="relative"
    >
      {/* left: Image with Graphics */}
      <Box position={"relative"} flex={1} w="full">
        <Box
          position="relative"
          borderRadius="40px"
          overflow="hidden"
          boxShadow="sm"
          zIndex={1}
        >
          <Image
            src="/images/services/how-we-help-succeed.svg" // Fallback to team photo if exists, otherwise placeholder
            alt="Help Process"
            w={"100%"}
            h={"auto"}
            minH="500px"
            objectFit={"cover"}
            fallbackSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
          />
          
          {/* Email Overlay */}
          <Box
            position={"absolute"}
            bottom={4}
            right={4}
            bg="brand.500"
            borderRadius="24px"
            px={5}
            py={3}
            boxShadow="lg"
            
          >
            <HStack spacing={3}>
              <Icon as={Mail} color="white" />
              <Box>
                <Text color="white" fontSize="sm" fontWeight="semibold">
                  Youremail@email.com
                </Text>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Box>

      {/* right: Content and Step Cards */}
      <VStack flex={1} align="flex-start" spacing={8} zIndex={1}>
        <VStack align="flex-start" spacing={3}>
          <Heading
            fontSize={["36px", "44px", "52px"]}
            fontWeight="800"
            lineHeight="1.1"
          >
            How We Help You Succeed
          </Heading>
          <Text color="#7C7C7C" fontSize="lg" maxW="500px">
            We simplify the process, ensuring it's clear and centered around your objectives.
          </Text>
        </VStack>

        <VStack spacing={6} w="full">
          <StepCard
            number="1"
            title="Book a Free Consultation"
            description="We learn about your career or study goals and recommend the right pathway."
          />
          <StepCard
            number="2"
            title="Receive Personalized Support"
            description="We handle the complex steps — exams, applications, documentation, and more."
          />
          <StepCard
            number="3"
            title="Begin Your Global Journey"
            description="You secure international opportunities and move forward with confidence."
          />
        </VStack>

        <Box pt={4}>
          <CustomButton
            text="Schedule Consultation"
            onClick={() => {}}
          />
        </Box>
      </VStack>
    </Flex>
  );
};

HelpProcess.displayName = "HelpProcess";
export default HelpProcess;
