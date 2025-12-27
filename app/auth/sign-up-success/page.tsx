import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Container, Text, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box
      display="flex"
      minH="100svh"
      w="full"
      alignItems="center"
      justifyContent="center"
      p={{ base: 6, md: 10 }}
    >
      <Container maxW="sm" w="full">
        <VStack spacing={6} align="stretch">
          <Card>
            <CardHeader>
              <CardTitle fontSize="2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription>Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                You&apos;ve successfully signed up. Please check your email to
                confirm your account before signing in.
              </Text>
            </CardContent>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}
