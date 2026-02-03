"use client";

import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NavLinks = () => {
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
