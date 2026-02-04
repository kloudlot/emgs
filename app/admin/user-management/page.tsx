import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function UserManagementPage() {
  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="lg">User Management</Heading>
      <Box p={8} bg="white" borderRadius="16px" border="1px solid" borderColor="gray.100">
        <Text color="gray.500">This is a placeholder for the User Management page.</Text>
      </Box>
    </VStack>
  );
}
