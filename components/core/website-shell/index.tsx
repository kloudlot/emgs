import HomeNav from "../nav/home-nav";
import FooterNav from "../nav/footer-nav";
import { ReactNode } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const WebsiteShell = ({ children }: Props) => {
  return (
    <VStack align={"stretch"} minH={"100vh"}>
      <HomeNav />
      <Box h={"25px"} />
      <Box flex={1}>
        {children}
      </Box>
      <FooterNav />
    </VStack>
  );
};

WebsiteShell.displayName = "WebsiteShell";

export default WebsiteShell;
