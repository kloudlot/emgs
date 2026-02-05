import WebsiteShell from "@/components/core/website-shell";
import PageBanner from "@/components/page-banner";
import { Box, Flex, Grid, Heading, Image, Text, VStack, HStack, SimpleGrid } from "@chakra-ui/react";
import { getServiceBySlug } from "@/lib/sanity/service.service";
import { getImageUrl } from "@/lib/sanity/image.service";
import { notFound } from "next/navigation";
import PackageCard from "@/components/package-card";
import { Circle } from "lucide-react";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

const ServiceDetailsPage = async ({ params }: ServicePageProps) => {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <WebsiteShell>
      {/* Page Banner */}
      <PageBanner
        title={service.title}
        description={service.description}
        // image={
        //   service.serviceImages?.[0]
        //     ? getImageUrl(service.serviceImages[0], 1200)
        //     : "/images/pattern/banner.png"
        // }
        image="/images/pattern/banner.png"
      />

      {/* Main Content */}
      <Box maxW="1200px" mx="auto" px={6} py={12}>
        {/* Overview Section */}
        <Grid
          templateColumns={["1fr", "1fr", "1fr 1fr"]}
          gap={8}
          mb={16}
        >
          {/* Left Column - Image and Overview */}
          <VStack align="start" spacing={6}>
            {service.serviceImages?.[0] && (
              <Box
                w="full"
                h={["300px", "350px", "400px"]}
                borderRadius="12px"
                overflow="hidden"
                boxShadow="md"
              >
                <Image
                  src={getImageUrl(service.serviceImages[0], 800)}
                  alt={service.title}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            )}
          </VStack>

          {/* Right Column - What's Included */}
          <Box>
            {/* Overview Text */}
            <Box mb={"24px"}>
              <Heading size="lg" mb={"16px"} fontWeight="600">
                Overview
              </Heading>
              <Text color="#7C7C7C" lineHeight="1.8" fontSize="md">
                {service.overview || service.description}
              </Text>
            </Box>
            <Heading size="md" fontSize={"20px"}  mb="16px" fontWeight="600">
              What&apos;s Included
            </Heading>
            <VStack align="start" spacing={3}>
              {service.whatsIncluded && service.whatsIncluded.length > 0 ? (
                service.whatsIncluded.map((item: any, index: number) => (
                  <HStack key={item._key || index} spacing={3} align="center">
                    <Box mt={1.5}>
                      <Circle size={8} fill="#A70B1C" color="#A70B1C" />
                    </Box>
                    <Text color="#7C7C7C" fontSize="md" lineHeight="1.8">
                      {item.item}
                    </Text>
                  </HStack>
                ))
              ) : (
                <Text color="gray.500" fontSize="md">
                  No items listed yet.
                </Text>
              )}
            </VStack>
          </Box>
        </Grid>

        {/* Service Packages Section */}
        {service.packages && service.packages.length > 0 && (
          <Box>
            <Heading size="lg" mb={8} fontWeight="600">
              Services Packages
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6} >
              {service.packages
                .filter((pkg: any) => pkg.active !== false)
                .map((pkg: any) => (
                  <PackageCard
                    key={pkg._id}
                    name={pkg.name}
                    price={pkg.price}
                    currency={pkg.currency}
                    packageType={pkg.packageType}
                    description={pkg.description}
                    features={pkg.features}
                    image={pkg.image}
                    popular={pkg.popular}
                  />
                ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>
    </WebsiteShell>
  );
};

export default ServiceDetailsPage;
