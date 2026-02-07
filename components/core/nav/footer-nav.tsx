import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  Divider,
  Link,
  VStack,
} from "@chakra-ui/react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const FooterNav = () => {
  return (
    <Box bg="#0A0A0A" color="white" py={12}>
      <Container maxW="1420px">
        <Flex
          direction={["column", "column", "row"]}
          justify="space-between"
          align="center"
          gap={[8, 8, 0]}
          pb={10}
        >
          {/* Logo Section */}
          <Box flex={1}>
            <Link href="/">
              <HStack spacing={2} align="center">
                <Box
                  as="img"
                  src="/images/logo.png"
                  alt="logo"
                  width="40px"
                  height="40px"
                  objectFit="contain"
                />
              </HStack>
            </Link>
          </Box>

          {/* Navigation Links */}
          <HStack spacing={10} flex={1} justify="center" display={["none", "flex"]}>
            <Link href="/about" _hover={{ color: "brand.500" }}>About</Link>
            <Link href="/services" _hover={{ color: "brand.500" }}>Services</Link>
            <Link href="/contact" _hover={{ color: "brand.500" }}>Contact</Link>
            <Link href="/blog" _hover={{ color: "brand.500" }}>Blog</Link>
          </HStack>
          
          {/* Mobile Navigation Links */}
          <VStack spacing={4} display={["flex", "none"]}>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
          </VStack>

          {/* Social Icons */}
          <HStack spacing={6} flex={1} justify="flex-end">
            <Link href="#" isExternal _hover={{ color: "brand.500" }}>
              <Twitter size={20} />
            </Link>
            <Link href="#" isExternal _hover={{ color: "brand.500" }}>
              <Facebook size={20} />
            </Link>
            <Link href="#" isExternal _hover={{ color: "brand.500" }}>
              <Instagram size={20} />
            </Link>
            <Link href="#" isExternal _hover={{ color: "brand.500" }}>
              <Linkedin size={20} />
            </Link>
          </HStack>
        </Flex>

        <Divider borderColor="whiteAlpha.300" />

        <Flex
          direction={["column", "row"]}
          justify="flex-start"
          align="center"
          gap={4}
          pt={8}
          color="#ADADAD"
          fontSize="sm"
        >
          <Text>© 2025 Express Med Global Services</Text>
          <Text display={["none", "block"]}>•</Text>
          <Link href="/terms" _hover={{ color: "white" }}>Terms</Link>
        </Flex>
      </Container>
    </Box>
  );
};

FooterNav.displayName = "FooterNav";
export default FooterNav;
