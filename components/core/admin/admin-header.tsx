"use client";
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { Search, Bell, Calendar, ChevronDown } from "lucide-react";

const AdminHeader = () => {
  return (
    <Box
      h="80px"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      position="sticky"
      top={0}
      zIndex={10}
      px={8}
    >
      <Flex h="full" align="center" justify="space-between">
        {/* Search Bar */}
        <HStack spacing={4} w="400px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search"
              bg="gray.50"
              border="none"
              _focus={{ bg: "white", boxShadow: "sm", border: "1px solid", borderColor: "gray.200" }}
              _placeholder={{ color: "gray.400" }}
            />
          </InputGroup>
          <HStack spacing={1} display={["none", "flex"]}>
            <Text fontSize="xs" color="gray.400" border="1px solid" borderColor="gray.200" px={1.5} borderRadius="md" bg="white">⌘</Text>
            <Text fontSize="xs" color="gray.400" border="1px solid" borderColor="gray.200" px={1.5} borderRadius="md" bg="white">F</Text>
          </HStack>
        </HStack>

        {/* Right Side Tools */}
        <HStack spacing={6}>
          {/* Date */}
          <HStack spacing={2} display={["none", "none", "flex"]}>
            <Icon as={Calendar} color="gray.500" />
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              25th December 2025
            </Text>
          </HStack>

          <Divider orientation="vertical" h="24px" display={["none", "none", "flex"]} />

          {/* Notifications */}
          <Box position="relative">
            <IconButton
              aria-label="Notifications"
              icon={<Bell size={20} />}
              variant="ghost"
              color="gray.500"
              borderRadius="full"
              _hover={{ bg: "gray.50", color: "brand.500" }}
            />
            <Box
              position="absolute"
              top="10px"
              right="10px"
              w="8px"
              h="8px"
              bg="brand.500"
              borderRadius="full"
              border="2px solid white"
            />
          </Box>

          {/* User Profile */}
          <Menu>
            <MenuButton>
              <HStack spacing={3} cursor="pointer" _hover={{ opacity: 0.8 }}>
                <Avatar size="sm" src="https://bit.ly/dan-abramov" name="Jamal Nnamdi" />
                <VStack align="flex-start" spacing={0} display={["none", "flex"]}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">
                    Jamal Nnamdi
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Admin
                  </Text>
                </VStack>
                <Icon as={ChevronDown} size={16} color="gray.500" display={["none", "flex"]} />
              </HStack>
            </MenuButton>
            <MenuList borderRadius="12px" py={2} boxShadow="xl" border="1px solid" borderColor="gray.100">
              <MenuItem fontSize="sm" py={2.5}>Profile</MenuItem>
              <MenuItem fontSize="sm" py={2.5}>Account Settings</MenuItem>
              <Divider my={1} />
              <MenuItem fontSize="sm" py={2.5} color="red.500">Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
