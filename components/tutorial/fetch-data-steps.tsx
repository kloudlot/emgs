import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";
import { Box, Text, Link as ChakraLink, Code } from "@chakra-ui/react";

const create = `create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from Next.js.'),
  ('It was awesome!');
`.trim();

const rls = `alter table notes enable row level security;
create policy "Allow public read access" on notes
for select
using (true);`.trim();

const server = `import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

export function FetchDataSteps() {
  return (
    <Box as="ol" display="flex" flexDirection="column" gap={6} listStyleType="none" padding={0}>
      <TutorialStep title="Create some tables and insert some data">
        <Box>
          <Text>
            Head over to the{" "}
            <ChakraLink
              href="https://supabase.com/dashboard/project/_/editor"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
              _dark={{ color: "gray.300" }}
              target="_blank"
              rel="noreferrer"
            >
              Table Editor
            </ChakraLink>{" "}
            for your Supabase project to create a table and insert some example
            data. If you&apos;re stuck for creativity, you can copy and paste the
            following into the{" "}
            <ChakraLink
              href="https://supabase.com/dashboard/project/_/sql/new"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
              _dark={{ color: "gray.300" }}
              target="_blank"
              rel="noreferrer"
            >
              SQL Editor
            </ChakraLink>{" "}
            and click RUN!
          </Text>
          <CodeBlock code={create} />
        </Box>
      </TutorialStep>

      <TutorialStep title="Enable Row Level Security (RLS)">
        <Box>
          <Text>
            Supabase enables Row Level Security (RLS) by default. To query data
            from your <Code fontSize="sm">notes</Code> table, you need to add a policy. You can
            do this in the{" "}
            <ChakraLink
              href="https://supabase.com/dashboard/project/_/editor"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
              _dark={{ color: "gray.300" }}
              target="_blank"
              rel="noreferrer"
            >
              Table Editor
            </ChakraLink>{" "}
            or via the{" "}
            <ChakraLink
              href="https://supabase.com/dashboard/project/_/sql/new"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
              _dark={{ color: "gray.300" }}
              target="_blank"
              rel="noreferrer"
            >
              SQL Editor
            </ChakraLink>
            .
          </Text>
          <Text mt={4}>
            For example, you can run the following SQL to allow public read
            access:
          </Text>
          <CodeBlock code={rls} />
          <Text mt={4}>
            You can learn more about RLS in the{" "}
            <ChakraLink
              href="https://supabase.com/docs/guides/auth/row-level-security"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
              _dark={{ color: "gray.300" }}
              target="_blank"
              rel="noreferrer"
            >
              Supabase docs
            </ChakraLink>
            .
          </Text>
        </Box>
      </TutorialStep>

      <TutorialStep title="Query Supabase data from Next.js">
        <Box>
          <Text>
            To create a Supabase client and query data from an Async Server
            Component, create a new page.tsx file at{" "}
            <Code
              fontSize="xs"
              px={1}
              py={0.5}
              borderRadius="md"
              borderWidth="1px"
              colorScheme="gray"
            >
              /app/notes/page.tsx
            </Code>{" "}
            and add the following.
          </Text>
          <CodeBlock code={server} />
          <Text mt={4}>Alternatively, you can use a Client Component.</Text>
          <CodeBlock code={client} />
        </Box>
      </TutorialStep>

      <TutorialStep title="Explore the Supabase UI Library">
        <Text>
          Head over to the{" "}
          <ChakraLink
            href="https://supabase.com/ui"
            fontWeight="bold"
            textDecoration="underline"
            _hover={{ textDecoration: "underline" }}
            color="gray.700"
            _dark={{ color: "gray.300" }}
          >
            Supabase UI library
          </ChakraLink>{" "}
          and try installing some blocks. For example, you can install a
          Realtime Chat block by running:
        </Text>
        <CodeBlock
          code={
            "npx shadcn@latest add https://supabase.com/ui/r/realtime-chat-nextjs.json"
          }
        />
      </TutorialStep>

      <TutorialStep title="Build in a weekend and scale to millions!">
        <Text>You&apos;re ready to launch your product to the world! 🚀</Text>
      </TutorialStep>
    </Box>
  );
}
