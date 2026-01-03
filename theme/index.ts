import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  colors: {
    brand: {
      50: "#fde7e9",
      100: "#fbd4d7",
      200: "#f8b0b5",
      300: "#f58d93",
      400: "#f26971",
      500: "#A70B1C", // Primary brand color
      600: "#860917",
      700: "#650712",
      800: "#43050c",
      900: "#220306",
    },
    primary: {
      50: "#fde7e9",
      100: "#fbd4d7",
      200: "#f8b0b5",
      300: "#f58d93",
      400: "#f26971",
      500: "#A70B1C", // Primary brand color
      600: "#860917",
      700: "#650712",
      800: "#43050c",
      900: "#220306",
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
      baseStyle: {
        borderRadius: "12px",
        _hover: {
          bg: "brand.500",
          color: "white",
        },
      },
      sizes: {
        md: {
          h: "55px",
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: "brand.500",
      },
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: "brand.500",
              boxShadow: "none",
            },
            _hover: {
              borderColor: "brand.400",
            },
          },
        },
        filled: {
          field: {
            _focus: {
              borderColor: "brand.500",
              boxShadow: "none",
            },
            _hover: {
              bg: "gray.50",
              _dark: {
                bg: "whiteAlpha.50",
              },
            },
          },
        },
        flushed: {
          field: {
            _focus: {
              borderColor: "brand.500",
              boxShadow: "none",
            },
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: "gray.700",
        _dark: {
          color: "gray.300",
        },
        fontWeight: "medium",
      },
    },
  },
});

export default theme;
