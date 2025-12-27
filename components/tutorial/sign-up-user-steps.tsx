import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";
import { Box, Text, Link as ChakraLink, Code, UnorderedList, ListItem } from "@chakra-ui/react";

export function SignUpUserSteps() {
  return (
    <Box as="ol" display="flex" flexDirection="column" gap={6} listStyleType="none" padding={0}>
      {process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "production" ? (
        <TutorialStep title="Set up redirect urls">
          <Box>
            <Text>It looks like this App is hosted on Vercel.</Text>
            <Text mt={4}>
              This particular deployment is
              <Code
                fontSize="xs"
                px={1}
                py={0.5}
                borderRadius="md"
                borderWidth="1px"
                colorScheme="gray"
                mx={1}
              >
                &quot;{process.env.VERCEL_ENV}&quot;
              </Code>{" "}
              on
              <Code
                fontSize="xs"
                px={1}
                py={0.5}
                borderRadius="md"
                borderWidth="1px"
                colorScheme="gray"
                mx={1}
              >
                https://{process.env.VERCEL_URL}
              </Code>
              .
            </Text>
            <Text mt={4}>
              You will need to{" "}
              <Link
                href={
                  "https://supabase.com/dashboard/project/_/auth/url-configuration"
                }
                passHref
                
              >
                <ChakraLink as="a" color="blue.500" _hover={{ color: "blue.600" }}>
                  update your Supabase project
                </ChakraLink>
              </Link>{" "}
              with redirect URLs based on your Vercel deployment URLs.
            </Text>
            <UnorderedList mt={4} spacing={1}>
              <ListItem>
                -{" "}
                <Code
                  fontSize="xs"
                  px={1}
                  py={0.5}
                  borderRadius="md"
                  borderWidth="1px"
                  colorScheme="gray"
                >
                  http://localhost:3000/**
                </Code>
              </ListItem>
              <ListItem>
                -{" "}
                <Code
                  fontSize="xs"
                  px={1}
                  py={0.5}
                  borderRadius="md"
                  borderWidth="1px"
                  colorScheme="gray"
                >
                  {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
                </Code>
              </ListItem>
              <ListItem>
                -{" "}
                <Code
                  fontSize="xs"
                  px={1}
                  py={0.5}
                  borderRadius="md"
                  borderWidth="1px"
                  colorScheme="gray"
                >
                  {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
                    ".vercel.app",
                    "",
                  )}-*-[vercel-team-url].vercel.app/**`}
                </Code>{" "}
                (Vercel Team URL can be found in{" "}
                <Link
                  href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                  target="_blank"
                  passHref
                  
                >
                  <ChakraLink as="a" color="blue.500" _hover={{ color: "blue.600" }}>
                    Vercel Team settings
                  </ChakraLink>
                </Link>
                )
              </ListItem>
            </UnorderedList>
            <Link
              href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
              target="_blank"
              passHref
              
            >
              <ChakraLink
                as="a"
                color="blue.400"
                _hover={{ color: "blue.500" }}
                display="flex"
                alignItems="center"
                fontSize="sm"
                gap={1}
                mt={4}
              >
                Redirect URLs Docs <ArrowUpRight size={14} />
              </ChakraLink>
            </Link>
          </Box>
        </TutorialStep>
      ) : null}
      <TutorialStep title="Sign up your first user">
        <Text>
          Head over to the{" "}
          <Link href="auth/sign-up" passHref >
            <ChakraLink as="a" fontWeight="bold" textDecoration="underline" _hover={{ textDecoration: "underline" }} color="gray.700" _dark={{ color: "gray.300" }}>
              Sign up
            </ChakraLink>
          </Link>{" "}
          page and sign up your first user. It&apos;s okay if this is just you
          for now. Your awesome idea will have plenty of users later!
        </Text>
      </TutorialStep>
    </Box>
  );
}
