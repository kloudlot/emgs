"use client";

import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export interface ButtonProps extends ChakraButtonProps {
  asChild?: boolean;
}

const Button = ChakraButton;

export { Button };
