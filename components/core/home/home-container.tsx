import { Box, Container, VStack } from "@chakra-ui/react"
import HomeHero from "./home-hero"
import CoreServices from "./core-services"
import HelpProcess from "./help-process"
import Testimonials from "./testimonials"

const HomeContainer = () => {
  return (
    <Container maxW="1420px" >
        <VStack spacing={16} align={"stretch"}>
            <HomeHero />
            <CoreServices />
            <HelpProcess />
            <Testimonials />
        </VStack>
    </Container>
  )
}

export default HomeContainer