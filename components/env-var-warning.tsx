import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HStack } from "@chakra-ui/react";

export function EnvVarWarning() {
  return (
    <HStack spacing={4} align="center">
      <Badge variant="outline" fontWeight="normal">
        Supabase environment variables required
      </Badge>
      <HStack spacing={2}>
        <Button size="sm" variant="outline" isDisabled>
          Sign in
        </Button>
        <Button size="sm" colorScheme="brand" isDisabled>
          Sign up
        </Button>
      </HStack>
    </HStack>
  );
}
