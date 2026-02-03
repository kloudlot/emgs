import { AuthButton } from "@/components/auth-button";
import { Container, Box, Flex, IconButton, Icon, Text, HStack } from "@chakra-ui/react";
import { Mail, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";
import NavLinks from "./nav-links";

const HomeNav = () => {
  return (
    <Box
      // borderBottomWidth="1px"
      // borderColor="gray.200"
      // _dark={{ borderColor: "gray.700" }}
    >
      <Box bg={"#28353D"} mb={"28px"}>
        <Container
          maxW="1220px"
          w="full"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          p={3}
          px={5}
        >
          <Flex gap={5} alignItems={"center"}>
            {/* phone */}
            <Flex gap={2} alignItems={"center"}>
              <Phone color={"#ffffff"} fontSize={"10px"} />
              <Text color={"#ffffff"} fontSize={"13px"}>
                +234 800 000 0000
              </Text>
            </Flex>
            {/* email */}
            <Flex gap={2} alignItems={"center"}>
              <Mail color={"#ffffff"} fontSize={"10px"} />
              <Text color={"#ffffff"} fontSize={"13px"}>
                ckctm12@gmail.com
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container
        maxW="1220px"
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={5}
      >
        <Link href="/">
          <Box
            as="img"
            src="/images/logo.png"
            alt="logo"
            width={"50px"}
            height={"50px"}
            objectFit="contain"
          />
        </Link>
        <HStack spacing={8} alignItems="center">
          <NavLinks />
          {/* cart cta */}
          <HStack spacing={2} cursor="pointer" _hover={{ opacity: 0.8 }}>
            <Box position="relative">
              <ShoppingCart size={24} color="#ADADAD" />
            </Box>
            <Text color={"#ADADAD"} fontSize={"lg"} fontWeight="medium">
              Cart
            </Text>
          </HStack>
        </HStack>
        {/* auth cta */}
        <AuthButton />
      </Container>
    </Box>
  );
};

HomeNav.displayName = "HomeNav";
export default HomeNav;
