"use client";
import CTAPatternBg from "@/components/cta-pattern-bg";
import {
  Box,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomButton from "@/components/custom-button";

const CTAFooter = () => {
  return (
    <CTAPatternBg>
      <CTAPatternBg.Left>
        <VStack
          spacing={4}
          color={"white"}
          w={"full"}
          justifyContent={"center"}
          h={"full"}
        >
          <Heading
            w={"full"}
            fontSize={["32px", "40px"]}
            fontWeight="800"
            textAlign={"left"}
          >
            Never Miss an Update
          </Heading>
          <Text color="#fff" fontSize={["14px", "lg"]}>
            Be the first to know about new programs, international openings, and
            success-boosting tips.
          </Text>
          {/* subscribe email input and cta */}
          <HStack w={"full"} gap={4} flexDirection={["column", "row"]} pt={8}>
            <Input
              placeholder="Enter your email"
              bg="transparent"
              borderColor="whiteAlpha.300"
              borderRadius="12px"
              border="1px solid"
              px={6}
              py={6}
              _placeholder={{ color: "white" }}
              _focus={{ borderColor: "whiteAlpha.500" }}
            />
            <CustomButton
              bg={"white"}
              text="Subscribe"
              color={"brand.500"}
              onClick={() => {}}
              _hover={{ bg: "white" }}
              _active={{ bg: "whiteAlpha.500" }}
            />
          </HStack>
        </VStack>
      </CTAPatternBg.Left>
      <CTAPatternBg.Right>
        <Box
          display={["none", "none", "block"]}
          backgroundImage="url('/images/pattern/man-1.png')"
          bgSize="cover"
          bgPosition="center"
          minH={"360px"}
        />
      </CTAPatternBg.Right>
    </CTAPatternBg>
  );
};

export default CTAFooter;
