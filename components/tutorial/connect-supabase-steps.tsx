import { TutorialStep } from "./tutorial-step";
import { Box, Text, Link, Code } from "@chakra-ui/react";

export function ConnectSupabaseSteps() {
  return (
    <Box as="ol" display="flex" flexDirection="column" gap={6} listStyleType="none" padding={0}>
      <TutorialStep title="Create Supabase project">
        <Text>
          Head over to{" "}
          <Link
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            fontWeight="bold"
            textDecoration="underline"
            _hover={{ textDecoration: "underline" }}
            color="gray.700"
            _dark={{ color: "gray.300" }}
            rel="noreferrer"
          >
            database.new
          </Link>{" "}
          and create a new Supabase project.
        </Text>
      </TutorialStep>

      <TutorialStep title="Declare environment variables">
        <Text>
          Rename the{" "}
          <Code
            fontSize="xs"
            px={1}
            py={0.5}
            borderRadius="md"
            borderWidth="1px"
            colorScheme="gray"
          >
            .env.example
          </Code>{" "}
          file in your Next.js app to{" "}
          <Code
            fontSize="xs"
            px={1}
            py={0.5}
            borderRadius="md"
            borderWidth="1px"
            colorScheme="gray"
          >
            .env.local
          </Code>{" "}
          and populate with values from{" "}
          <Link
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            fontWeight="bold"
            textDecoration="underline"
            _hover={{ textDecoration: "underline" }}
            color="gray.700"
            _dark={{ color: "gray.300" }}
            rel="noreferrer"
          >
            your Supabase project&apos;s API Settings
          </Link>
          .
        </Text>
      </TutorialStep>

      <TutorialStep title="Restart your Next.js development server">
        <Text>
          You may need to quit your Next.js development server and run{" "}
          <Code
            fontSize="xs"
            px={1}
            py={0.5}
            borderRadius="md"
            borderWidth="1px"
            colorScheme="gray"
          >
            npm run dev
          </Code>{" "}
          again to load the new environment variables.
        </Text>
      </TutorialStep>

      <TutorialStep title="Refresh the page">
        <Text>
          You may need to refresh the page for Next.js to load the new
          environment variables.
        </Text>
      </TutorialStep>
    </Box>
  );
}
