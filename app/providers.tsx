"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { CartProvider } from "@/contexts/cart-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <CartProvider>{children}</CartProvider>
    </ChakraProvider>
  );
}
