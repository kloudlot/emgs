"use client";

import { Checkbox } from "../ui/checkbox";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

export function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box as="li" position="relative" listStyleType="none">
      <Box position="absolute" top="3px" display="inline-block" mr={2}>
        <Checkbox
          id={title}
          name={title}
          isChecked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </Box>
      <Box
        as="label"
        htmlFor={title}
        position="relative"
        fontSize="base"
        fontWeight="medium"
        cursor="pointer"
        display="block"
        textDecoration={isChecked ? "line-through" : "none"}
      >
        <Box as="span" ml={8}>
          {title}
        </Box>
        <Box
          ml={8}
          fontSize="sm"
          fontWeight="normal"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          textDecoration={isChecked ? "line-through" : "none"}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
