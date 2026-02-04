import { Box, SimpleGrid } from "@chakra-ui/react";

const CTAPatternBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      position="relative"
      minH={["auto", "360px"]}
      borderRadius={"12px"}
      backgroundImage="url('/images/pattern/cta-pattern.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      overflow="hidden"
    >
      <SimpleGrid columns={[1, 1, 2]} spacing={10}>
        {children}
      </SimpleGrid>
    </Box>
  );
};

CTAPatternBg.Left = ({ children }: { children: React.ReactNode }) => {
  return <Box pl={[6, 10]} pr={[6, 0]}>{children}</Box>;
};

CTAPatternBg.Right = ({ children }: { children: React.ReactNode }) => {
  return <Box>{children}</Box>;
};
export default CTAPatternBg;
