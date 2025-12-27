"use client";

import { Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, ChakraInputProps>(
  ({ type, ...props }, ref) => {
    return <ChakraInput ref={ref} type={type} {...props} />;
  },
);
Input.displayName = "Input";

export { Input };
