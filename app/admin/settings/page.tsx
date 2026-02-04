import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function SettingsPage() {
  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="lg">Settings</Heading>
      <Box p={8} bg="white" borderRadius="16px" border="1px solid" borderColor="gray.100">
        <Text color="gray.500">This is a placeholder for the Settings page.</Text>
      </Box>
    </VStack>
  );
}
