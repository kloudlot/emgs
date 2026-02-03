import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
// import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense } from "react";
import {
  Box,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  Heading,
  Text,
  Code,
} from "@chakra-ui/react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <VStack flex={1} w="full" spacing={12} align="stretch">
      <Box w="full">
        <Alert
          status="info"
          borderRadius="md"
          fontSize="sm"
        >
          <AlertIcon boxSize={4} />
          This is a protected page that you can only see as an authenticated
          user
        </Alert>
      </Box>
      <VStack spacing={2} align="start">
        <Heading as="h2" size="xl" fontWeight="bold" mb={4}>
          Your user details
        </Heading>
        <Code
          as="pre"
          fontSize="xs"
          fontFamily="mono"
          p={3}
          borderRadius="md"
          borderWidth="1px"
          maxH="32"
          overflow="auto"
          w="full"
        >
          <Suspense>
            <UserDetails />
          </Suspense>
        </Code>
      </VStack>
      <Box>
        <Heading as="h2" size="xl" fontWeight="bold" mb={4}>
          Next steps
        </Heading>
        {/* <FetchDataSteps /> */}
      </Box>
    </VStack>
  );
}
