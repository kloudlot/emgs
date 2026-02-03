import { AuthButton } from "@/components/auth-button";
import { Container, Box, Flex, IconButton, Icon, Text } from "@chakra-ui/react";
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
        py={2}
        px={5}
      >
        <Link href="/">
          <Box
            as="img"
            src="/images/logo.png"
            alt="logo"
            width={"60px"}
            height={"60px"}
          />
        </Link>
        <Box display="flex" alignItems="center">
          <NavLinks />
          {/* cart cta */}
          <Flex alignItems={"center"} gap={2} ml={2}>
            <IconButton
              aria-label="Cart"
              w={["48px"]}
              h={["48px"]}
              borderRadius={"50%"}
              bg={"#F7F7F7"}
              _hover={{
                bg: "#F7F7F7",
              }}
            >
              <ShoppingCart color="#ADADAD" fontSize={"24px"} />
            </IconButton>
            <Text color={"#ADADAD"} fontSize={"lg"}>
              Cart
            </Text>
          </Flex>
        </Box>
        {/* auth cta */}
        <AuthButton />
      </Container>
    </Box>
  );
};

HomeNav.displayName = "HomeNav";
export default HomeNav;
