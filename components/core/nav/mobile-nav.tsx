"use client";

import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { Menu, ShoppingCart } from "lucide-react";
import NavLinks from "./nav-links";

interface MobileNavProps {
  authButton: React.ReactNode;
}

const MobileNav = ({ authButton }: MobileNavProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        display={["flex", "flex", "none"]}
        aria-label="Toggle Navigation"
        icon={<Menu size={24} />}
        variant="ghost"
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#ffffff">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody px={4} py={8}>
            <VStack align="flex-start" spacing={8}>
              <NavLinks variant="vertical" onClose={onClose} />
              
              <HStack spacing={2} cursor="pointer" px={4} py={2} w="full">
                <Box position="relative">
                    <ShoppingCart size={24} color="#ADADAD" />
                </Box>
                <Text color={"#ADADAD"} fontSize={"lg"} fontWeight="medium">
                  Cart
                </Text>
              </HStack>

              <Box px={4} w="full">
                {authButton}
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
