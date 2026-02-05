import { Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface PageTitleRootProps {
  children: React.ReactNode;
  spacing?: number;
}

interface PageTitleHeaderProps {
  title: string;
  description?: string;
}

interface PageTitleSectionProps {
  children: React.ReactNode;
}

// Root component - provides the main container
const PageTitleRoot = ({ children, spacing = 6 }: PageTitleRootProps) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      gap={spacing}
      flexWrap="wrap"
      w="full"
    >
      {children}
    </Flex>
  );
};

// Header component - displays title and optional description
const PageTitleHeader = ({ title, description }: PageTitleHeaderProps) => {
  return (
    <VStack align="start" spacing={1}>
      <Text fontSize={"2xl"} color={"#111111"} fontWeight={400}>{title}</Text>
      {description && (
        <Text fontSize="sm" color="#7c7c7c" maxW={"600px"}>
          {description}
        </Text>
      )}
    </VStack>
  );
};

// Left section - for title and description
const PageTitleLeft = ({ children }: PageTitleSectionProps) => {
  return (
    <HStack spacing={4} align="center">
      {children}
    </HStack>
  );
};

// Right section - for actions/buttons
const PageTitleRight = ({ children }: PageTitleSectionProps) => {
  return (
    <HStack spacing={3} align="center">
      {children}
    </HStack>
  );
};

// Compound component export
export const PageTitle = Object.assign(PageTitleRoot, {
  Header: PageTitleHeader,
  Left: PageTitleLeft,
  Right: PageTitleRight,
});

export default PageTitle;