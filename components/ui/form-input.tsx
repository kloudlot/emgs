"use client";

import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState, forwardRef } from "react";
import { Input } from "./input";
import { Label } from "./label";

export interface FormInputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  id: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, showPasswordToggle, id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password" || showPasswordToggle;
    const inputType = isPassword && showPassword ? "text" : type;

    const inputProps = {
      ref,
      id,
      type: inputType,
      ...props,
      ...(isPassword && { pr: "4.5rem" }),
      ...(!isPassword && { mt: "0" }),
      h: "55px",
      borderColor: "#CBD5E0",
      borderRadius: "12px",
    };

    return (
      <FormControl isInvalid={!!error}>
        {label && <Label htmlFor={id} color={"#718096"}>{label}</Label>}
        {isPassword ? (
          <InputGroup mt={label ? 2 : 0}>
            <Input {...inputProps} />
            <InputRightElement width="4.5rem" h="100%">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                // h="1.75rem"
                h="100%"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                _hover={{ bg: "transparent" }}
              />
            </InputRightElement>
          </InputGroup>
        ) : (
          <Input  {...inputProps}  />
        )}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

FormInput.displayName = "FormInput";

