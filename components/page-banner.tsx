import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

interface PageBannerProps {
  title: string;
  description: string;
  image: string;
}

const PageBanner = ({ title, description, image }: PageBannerProps) => {
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      h={"380px"}
      w={"full"}
      bg={"#A70B1C"}
      overflow={"hidden"}
      pos={"relative"}
      gap={4}
      px={6}
    >
      <Image
        src={image}
        alt=""
        w={"full"}
        h={"full"}
        pos={"absolute"}
        zIndex={0}
        left={0}
        right={0}
        top={0}
        bottom={0}
        border={"none"}
        objectFit={"cover"}
      />
      
      {/* Dark overlay for better text readability */}
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={"blackAlpha.100"}
        zIndex={1}
      />
      
      <Heading color={"#fff"} zIndex={2} fontSize={["3xl", "4xl", "5xl"]} textAlign={"center"}>
        {title}
      </Heading>
      <Text color={"#fff"} maxW={"600px"} textAlign={"center"} zIndex={2} fontSize={["sm", "md"]}>
        {description}
      </Text>
    </Flex>
  );
};

export default PageBanner;
