"use client";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Box,
  BoxProps,
} from "@chakra-ui/react";
import * as React from "react";

const DropdownMenu = Menu;

const DropdownMenuTrigger = MenuButton;

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof MenuList>>(
  ({ children, ...props }, ref) => (
    <MenuList ref={ref} {...props}>
      {children}
    </MenuList>
  ),
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = MenuItem;

const DropdownMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuOptionGroup>
>(({ children, ...props }, ref) => (
  <MenuOptionGroup {...props} type="radio">
    {children}
  </MenuOptionGroup>
));
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

const DropdownMenuRadioItem = MenuItemOption;

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box
      ref={ref}
      px={2}
      py={1.5}
      fontSize="sm"
      fontWeight="semibold"
      {...props}
    >
      {children}
    </Box>
  ),
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = MenuDivider;

const DropdownMenuShortcut = React.forwardRef<HTMLSpanElement, BoxProps>(
  ({ ...props }, ref) => (
    <Box
      ref={ref}
      as="span"
      ml="auto"
      fontSize="xs"
      letterSpacing="wider"
      opacity={0.6}
      {...props}
    />
  ),
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// Placeholders for compatibility - these may not be used
const DropdownMenuGroup = Box;
const DropdownMenuPortal = Box;
const DropdownMenuSub = Box;
const DropdownMenuSubContent = Box;
const DropdownMenuSubTrigger = MenuItem;
const DropdownMenuCheckboxItem = MenuItem;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
