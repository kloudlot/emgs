"use client";

import {
  Box,
  BoxProps,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

const Card = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box
      ref={ref}
      borderRadius="xl"
      borderWidth="1px"
      bg="white"
      _dark={{ bg: "gray.800" }}
      shadow="sm"
      {...props}
    >
      {children}
    </Box>
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} p={6} {...props}>
      {children}
    </Box>
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.ComponentProps<typeof Heading>>(
  ({ children, ...props }, ref) => (
    <Heading ref={ref} size="md" fontWeight="semibold" {...props}>
      {children}
    </Heading>
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.ComponentProps<typeof Text>>(
  ({ children, ...props }, ref) => (
    <Text ref={ref} fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} {...props}>
      {children}
    </Text>
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} p={6} pt={0} {...props}>
      {children}
    </Box>
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} display="flex" alignItems="center" p={6} pt={0} {...props}>
      {children}
    </Box>
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
