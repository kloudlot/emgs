"use client";

import { Box, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface NavLinksProps {
  variant?: "horizontal" | "vertical";
  onClose?: () => void;
}

const NavLinks = ({ variant = "horizontal", onClose }: NavLinksProps) => {
  const pathname = usePathname();

  const navLinks = useMemo(() => {
    return [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Services",
        href: "/services",
      },
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Contact",
        href: "/contact",
      },
      {
        label: "Blog",
        href: "/blog",
      },
    ];
  }, []);

  const isActive = (href: string) => {
    return href === pathname;
  };

  if (variant === "vertical") {
    return (
      <VStack spacing={4} align="stretch" w="full">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} passHref onClick={onClose}>
            <Box
              as="span"
              display="block"
              py={2}
              px={4}
              color={isActive(link.href) ? "brand.500" : "#ADADAD"}
              fontSize={"lg"}
              fontWeight={isActive(link.href) ? "bold" : "medium"}
              _hover={{ color: "brand.500" }}
            >
              {link.label}
            </Box>
          </Link>
        ))}
      </VStack>
    );
  }

  return (
    <HStack spacing={5} bg={"#F7F7F7"} px={5} py={"12px"} borderRadius={"24px"}>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <Box
            as="span"
            color={isActive(link.href) ? "brand.500" : "#ADADAD"}
            fontSize={"lg"}
            px={[2, 4]}
          >
            {link.label}
          </Box>
        </Link>
      ))}
    </HStack>
  );
};

export default NavLinks;
