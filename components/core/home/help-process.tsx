"use client";
import CustomButton from "@/components/custom-button";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { MailIcon } from "lucide-react";

const HelpProcess = () => {
  return (
    <Flex>
      {/* left */}
      <Box position={"relative"}>
        <Box
          as="img"
          src="/images/services/how-we-help-succeed.svg"
          alt="Help Process"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
        <Box
          position={"absolute"}
          bottom={0}
          left={0}
          right={0}
          justifyContent={"center"}
          alignItems={"center"}
          pb={10}
        >
          <CustomButton ml={"auto"} leftIcon={<MailIcon />} text="Youremail@email.com" onClick={() => {}} />
        </Box>
      </Box>
      {/* right */}
      <Box>
        <Heading>Help Process</Heading>
      </Box>
    </Flex>
  );
};

HelpProcess.displayName = "HelpProcess";
export default HelpProcess;
