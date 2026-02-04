import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Avatar,
  Container,
} from "@chakra-ui/react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Chiamaka E.",
    role: "Study Abroad Success",
    quote:
      "Express Med Global Services guided me through my entire study abroad process. I got admitted into my dream university with a scholarship.",
    image: "/images/testimonials/chiamaka.png",
  },
  {
    name: "David O.",
    role: "Career & Relocation",
    quote:
      "Their support with my international job application was incredible. From my CV to the visa process — smooth and professiona",
    avatar: "https://bit.ly/dan-abramov", // Fallback avatar
  },
  {
    name: "Sarah Uzo",
    role: "Certification & Training",
    quote:
      "The exam prep was exceptional. I passed on my first try and felt completely confident throughout the process. The resources provided were incredibly helpful, and I appreciated the support from the instructors.",
    avatar: "https://bit.ly/sage-adebayo", // Fallback avatar
  },
  {
    name: "Emily Jones",
    role: "Another Service tag",
    quote:
      "Their support with my international job application was incredible. From my CV to the visa process — smooth and professiona",
    avatar: "https://bit.ly/kent-c-dodds", // Fallback avatar
  },
  {
    name: "Emily Jones",
    role: "Design Head @ Nova",
    quote:
      "Their support with my international job application was incredible. From my CV to the visa process — smooth and professiona",
    avatar: "https://bit.ly/prosper-baba", // Fallback avatar
  },
];

const MainTestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <VStack
      bg="#F5F5F5"
      borderRadius="24px"
      p={8}
      align="flex-start"
      height="full"
      spacing={6}
    >
      <Box
        borderRadius="20px"
        overflow="hidden"
        w="full"
        h="350px"
        bg="gray.300"
      >
        <Image
          src={testimonial.image || "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=1974&auto=format&fit=crop"}
          alt={testimonial.name}
          objectFit="cover"
          w="full"
          h="full"
        />
      </Box>
      <VStack align="flex-start" spacing={4}>
        <Text color="#7C7C7C" fontSize="18px" lineHeight="1.6">
          {testimonial.quote}
        </Text>
        <Box>
          <Text fontWeight="bold" fontSize="20px">
            {testimonial.name}
          </Text>
          <Text color="#7C7C7C" fontSize="16px">
            {testimonial.role}
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};

const SubTestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <VStack
      bg="#F5F5F5"
      borderRadius="24px"
      p={6}
      align="flex-start"
      spacing={4}
      height="full"
    >
      <HStack spacing={4}>
        <Avatar size="lg" src={testimonial.avatar} name={testimonial.name} />
        <VStack align="flex-start" spacing={0}>
          <Text fontWeight="bold" fontSize="18px">
            {testimonial.name}
          </Text>
          <Text color="#7C7C7C" fontSize="14px">
            {testimonial.role}
          </Text>
        </VStack>
      </HStack>
      <Text color="#7C7C7C" fontSize="15px" lineHeight="1.5">
        {testimonial.quote}
      </Text>
    </VStack>
  );
};

const Testimonials = () => {
  const main = testimonials[0];
  const others = testimonials.slice(1);

  return (
      <VStack spacing={16} align="stretch">
        <VStack spacing={4} textAlign="center">
          <Heading fontSize={["40px", "52px"]} fontWeight="800">
            Journeys We&apos;re Proud to <br /> Support
          </Heading>
          <Text color="#7C7C7C" fontSize="lg" maxW="600px">
            At Express Med Global Services, we help you seize international
            opportunities with expert support. Our clients&apos; successes in
            admissions and job placements inspire us daily.
          </Text>
        </VStack>

        <SimpleGrid columns={[1, 1, 3]} spacing={8}>
          {/* Main card spans 1 column on tablet/desktop */}
          <Box gridColumn={[ "span 1", "span 1", "span 1" ]}>
             <MainTestimonialCard testimonial={main} />
          </Box>
          
          {/* Sub cards grid spans 2 columns */}
          <Box gridColumn={[ "span 1", "span 1", "span 2" ]}>
            <SimpleGrid columns={[1, 1, 2]} spacing={8} height="full">
              {others.map((t, idx) => (
                <SubTestimonialCard key={idx} testimonial={t} />
              ))}
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </VStack>
    
  );
};

Testimonials.displayName = "Testimonials";
export default Testimonials;
