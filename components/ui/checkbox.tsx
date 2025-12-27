"use client";

import { Checkbox as ChakraCheckbox, CheckboxProps as ChakraCheckboxProps } from "@chakra-ui/react";
import * as React from "react";

const Checkbox = React.forwardRef<HTMLInputElement, ChakraCheckboxProps>(
  ({ ...props }, ref) => (
    <ChakraCheckbox ref={ref} {...props} />
  ),
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
