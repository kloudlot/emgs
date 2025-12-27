"use client";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  const IconComponent =
    theme === "light" ? Sun : theme === "dark" ? Moon : Laptop;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Theme switcher"
        icon={<IconComponent size={ICON_SIZE} />}
        variant="ghost"
        size="sm"
      />
      <MenuList>
        <MenuOptionGroup
          type="radio"
          value={theme}
          onChange={(value) => setTheme(value as string)}
        >
          <MenuItemOption value="light">
            <HStack spacing={2}>
              <Sun size={ICON_SIZE} />
              <Text>Light</Text>
            </HStack>
          </MenuItemOption>
          <MenuItemOption value="dark">
            <HStack spacing={2}>
              <Moon size={ICON_SIZE} />
              <Text>Dark</Text>
            </HStack>
          </MenuItemOption>
          <MenuItemOption value="system">
            <HStack spacing={2}>
              <Laptop size={ICON_SIZE} />
              <Text>System</Text>
            </HStack>
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export { ThemeSwitcher };
