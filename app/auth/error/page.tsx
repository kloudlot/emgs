import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Box, Container, Text, VStack } from "@chakra-ui/react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {params?.error ? (
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Code error: {params.error}
        </Text>
      ) : (
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          An unspecified error occurred.
        </Text>
      )}
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
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
                Sorry, something went wrong.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense>
                <ErrorContent searchParams={searchParams} />
              </Suspense>
            </CardContent>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}
