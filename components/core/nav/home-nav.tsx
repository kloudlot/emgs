import { AuthButton } from "@/components/auth-button";
import {
  Container,
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Mail, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";
import NavLinks from "./nav-links";
import MobileNav from "./mobile-nav";

const HomeNav = () => {
  return (
    <Box>
      <Box bg={"#28353D"} mb={["10px", "14px", "28px"]}>
        <Container
          maxW="1220px"
          w="full"
          display="flex"
          justifyContent={["center", "center", "flex-end"]}
          alignItems="center"
          p={3}
          px={5}
        >
          <Flex gap={[3, 5]} alignItems={"center"} flexDirection={["column", "row"]}>
            {/* phone */}
            <Flex gap={2} alignItems={"center"}>
              <Phone color={"#ffffff"} size={14} />
              <Text color={"#ffffff"} fontSize={["11px", "12px", "13px"]}>
                +234 800 000 0000
              </Text>
            </Flex>
            {/* email */}
            <Flex gap={2} alignItems={"center"}>
              <Mail color={"#ffffff"} size={14} />
              <Text color={"#ffffff"} fontSize={["11px", "12px", "13px"]}>
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
            width={["40px", "50px"]}
            height={["40px", "50px"]}
            objectFit="contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing={8} alignItems="center" display={["none", "none", "flex"]}>
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

        {/* Desktop Auth */}
        <Box display={["none", "none", "flex"]}>
          <AuthButton />
        </Box>

        {/* Mobile Navigation (Client Side) */}
        <MobileNav authButton={<AuthButton />} />
      </Container>
    </Box>
  );
};

HomeNav.displayName = "HomeNav";
export default HomeNav;
