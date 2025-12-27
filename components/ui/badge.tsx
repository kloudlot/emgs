"use client";

import { Badge as ChakraBadge, BadgeProps as ChakraBadgeProps } from "@chakra-ui/react";
import * as React from "react";

export interface BadgeProps extends ChakraBadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const variantMap: Record<string, ChakraBadgeProps> = {
  default: {
    colorScheme: "brand",
  },
  secondary: {
    colorScheme: "gray",
  },
  destructive: {
    colorScheme: "red",
  },
  outline: {
    variant: "outline",
  },
};

function Badge({ variant = "default", ...props }: BadgeProps) {
  const chakraProps = variantMap[variant] || {};
  return <ChakraBadge {...chakraProps} {...props} />;
}

export { Badge };
