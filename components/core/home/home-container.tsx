import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import HomeHero from "./home-hero";
import CoreServices from "./core-services";
import HelpProcess from "./help-process";
import Testimonials from "./testimonials";
import StartYourJourney from "./start-your-journey";
import InsightsResources from "./insights-resources";
import CTAFooter from "./cta-footer";

const HomeContainer = () => {
  return (
    <VStack spacing={24} align={"stretch"}>
      <Container maxW="1420px">
        <VStack spacing={24} align={"stretch"}>
          <HomeHero />
          <CoreServices />
          <HelpProcess />
          <Testimonials />
        </VStack>
      </Container>
      <StartYourJourney />
      <Container maxW="1420px">
        <VStack spacing={24} align={"stretch"}>
          <InsightsResources />
          <CTAFooter />
        </VStack>
      </Container>
      <Box my={6} />
    </VStack>
  );
};

export default HomeContainer;
