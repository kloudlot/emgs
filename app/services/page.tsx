import WebsiteShell from "@/components/core/website-shell";
import PageBanner from "@/components/page-banner";
import { Box, SimpleGrid, Text, VStack, Flex } from "@chakra-ui/react";
import { getServices } from "@/lib/sanity/service.service";
import ServiceCard from "@/components/service-card";

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  overview: string;
  description: string;
  serviceImages: any[];
  status: string;
}

const ServicesPage = async () => {
  let services: Service[] = [];
  let error: string | null = null;

  try {
    const result = await getServices({ status: "published" });
    services = result || [];
  } catch (err) {
    console.error("Error fetching services:", err);
    error = "Failed to load services";
  }

  return (
    <WebsiteShell>
      <PageBanner
        title="Our Services"
        description="Guidance for exams, admissions, career growth, and relocation—supporting you on your international journey."
        image="/images/pattern/banner.png"
      />

      {/* Services Grid */}
      <Box maxW="1200px" mx="auto" px={6} py={8}>
        {error ? (
          <Flex justify="center" align="center" minH="400px">
            <VStack spacing={4}>
              <Text fontSize="lg" color="red.500">
                {error}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Please try again later
              </Text>
            </VStack>
          </Flex>
        ) : services.length === 0 ? (
          <Flex justify="center" align="center" minH="400px">
            <VStack spacing={4}>
              <Text fontSize="lg" color="gray.600">
                No services available at the moment
              </Text>
              <Text fontSize="sm" color="gray.500">
                Check back soon for updates
              </Text>
            </VStack>
          </Flex>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={8}>
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                description={service.overview || service.description}
                image={service.serviceImages?.[0]}
                slug={service.slug.current}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </WebsiteShell>
  );
};

export default ServicesPage;