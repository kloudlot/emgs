import { Box, Text, VStack, Heading, HStack, Button } from "@chakra-ui/react";

const HomeHero = () => {
  return (
    <Box
      bg={"brand.500"}
      h={"100vh"}
      borderRadius={"10px"}
      mt={4}
      position={"relative"}
    >
      <Box
        as="img"
        src="/images/hero.svg"
        alt="hero"
        h={"100%"}
        w={"100%"}
        backgroundPosition={"bottom"}
      />
      <Box
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={"brand.500"}
        opacity={0.5}
        px={["20px", "40px", "60px", "75px"]}
        w={"100%"}
      >
        <VStack
          align={"stretch"}
          color={"#fff"}
          h={"100%"}
          w={"100%"}
          maxW={"700px"}
          justify={"center"}
        >
          <Heading fontSize={["32px", "40px", "48px", "56px", "64px"]}>
            Unlock Your Career Potential Abroad
          </Heading>
          <Text fontSize={["16px", "18px", "20px"]}>
            Expert guidance for exams, job applications, and international study
            — supporting your journey from planning to relocation.
          </Text>
          {/* cta buttons */}
          <HStack gap={4}>
            <Button colorScheme="brand" size="lg">
              Get Started
            </Button>
            <Button colorScheme="brand" size="lg" variant="outline">
              Learn More
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomeHero;
