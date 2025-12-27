"use client";

import { VStack, Heading, Text, Box } from "@chakra-ui/react";

interface Props {
  image: string;
  title: string;
  description: string;
}

export default function Slide({ image, title, description }: Props) {
  return (
    <Box
      h="100%"
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    
      position="relative"
    >
      {/* Image Section */}
      <Box 
        w="100%" 
        flex="1"
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        minH="300px"
        mb={8}
      >
        <Box
          as="img"
          src={image}
          alt={title}
          maxW="100%"
          maxH="100%"
          height="auto"
          display="block"
          w="100%"
          objectFit="cover"
        />
      </Box>
      
      {/* Text Content */}
      <VStack spacing={4} align="center" maxW="500px" mt={"24px"} pb={12}>
        <Heading 
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} 
          // fontWeight="700" 
          color="white"
          lineHeight="1.2"
          textAlign="center"
        >
          {title}
        </Heading>

        <Text
          fontSize={{ base: "sm", md: "base" }}
          color="#CFD9E0"
          lineHeight="1.6"
          textAlign="center"
        >
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
