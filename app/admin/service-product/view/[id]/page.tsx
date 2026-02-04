"use client";
import {
  Box,
  VStack,
  Heading,
  Button,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  Flex,
  Badge,
  Spinner,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { ArrowLeft, Edit, Trash2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getImageUrl } from "@/lib/sanity/image.service";

export default function ViewServicePage() {
  const router = useRouter();
  const params = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchService(params.id as string);
    }
  }, [params.id]);

  const fetchService = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/services/${id}`);
      const result = await response.json();

      if (result.success) {
        setService(result.data);
      }
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  if (!service) {
    return (
      <Box textAlign="center" py={10}>
        <Heading size="md" mb={4}>
          Service not found
        </Heading>
        <Button onClick={() => router.back()}>Go Back</Button>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      {/* Header */}
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <IconButton
            aria-label="Go back"
            icon={<ArrowLeft size={20} />}
            variant="ghost"
            onClick={() => router.back()}
          />
          <VStack align="start" spacing={0}>
            <Heading size="lg">{service.title}</Heading>
            <HStack spacing={2} mt={1}>
              <Badge
                colorScheme={
                  service.status === "published"
                    ? "green"
                    : service.status === "draft"
                    ? "yellow"
                    : "gray"
                }
              >
                {service.status}
              </Badge>
              {service.featured && <Badge colorScheme="purple">Featured</Badge>}
            </HStack>
          </VStack>
        </HStack>
        <HStack spacing={3}>
          <Button
            leftIcon={<Edit size={18} />}
            colorScheme="blue"
            onClick={() =>
              router.push(`/admin/service-product/edit/${service._id}`)
            }
          >
            Edit Service
          </Button>
          <IconButton
            aria-label="Delete service"
            icon={<Trash2 size={18} />}
            colorScheme="red"
            variant="outline"
          />
        </HStack>
      </Flex>

      <SimpleGrid columns={[1, 1, 2]} spacing={6}>
        {/* Left Column */}
        <VStack align="stretch" spacing={6}>
          {/* Overview */}
          <Box
            bg="white"
            p={6}
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading size="md" fontSize="18px" mb={4}>
              Overview
            </Heading>
            <Text color="gray.700" lineHeight="1.7">
              {service.overview}
            </Text>
          </Box>

          {/* Service Images */}
          {service.serviceImages && service.serviceImages.length > 0 && (
            <Box
              bg="white"
              p={6}
              borderRadius="16px"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading size="md" fontSize="18px" mb={4}>
                Service Images
              </Heading>
              <SimpleGrid columns={2} spacing={4}>
                {service.serviceImages.map((img: any, idx: number) => (
                  <Image
                    key={idx}
                    src={getImageUrl(img, 400)}
                    alt={`Service image ${idx + 1}`}
                    borderRadius="8px"
                    objectFit="cover"
                    h="150px"
                    w="100%"
                  />
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* Category */}
          {service.category && (
            <Box
              bg="white"
              p={6}
              borderRadius="16px"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading size="md" fontSize="18px" mb={2}>
                Category
              </Heading>
              <Badge colorScheme="blue" fontSize="md" p={2}>
                {service.category.title}
              </Badge>
            </Box>
          )}
        </VStack>

        {/* Right Column */}
        <VStack align="stretch" spacing={6}>
          {/* What's Included */}
          {service.whatsIncluded && service.whatsIncluded.length > 0 && (
            <Box
              bg="white"
              p={6}
              borderRadius="16px"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading size="md" fontSize="18px" mb={4}>
                What's Included
              </Heading>
              <List spacing={2}>
                {service.whatsIncluded.map((item: any, idx: number) => (
                  <ListItem key={idx} display="flex" alignItems="start">
                    <ListIcon
                      as={CheckCircle}
                      color="green.500"
                      mt={0.5}
                      boxSize={5}
                    />
                    <Text>{item.item}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Packages */}
          {service.packages && service.packages.length > 0 && (
            <Box
              bg="white"
              p={6}
              borderRadius="16px"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading size="md" fontSize="18px" mb={4}>
                Service Packages ({service.packages.length})
              </Heading>
              <VStack spacing={4} align="stretch">
                {service.packages.map((pkg: any, idx: number) => (
                  <Box
                    key={idx}
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="8px"
                  >
                    <Flex justify="space-between" align="start" mb={3}>
                      <VStack align="start" spacing={1} flex={1}>
                        <Text fontWeight="600" fontSize="lg">
                          {pkg.name}
                        </Text>
                        {pkg.description && (
                          <Text fontSize="sm" color="gray.600">
                            {pkg.description}
                          </Text>
                        )}
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text fontWeight="700" fontSize="xl" color="brand.500">
                          {pkg.currency} {parseFloat(pkg.price).toLocaleString()}
                        </Text>
                        <Badge colorScheme="blue">{pkg.packageType}</Badge>
                      </VStack>
                    </Flex>

                    {pkg.features && pkg.features.length > 0 && (
                      <>
                        <Divider my={3} />
                        <List spacing={1}>
                          {pkg.features.map((feature: any, fIdx: number) => (
                            <ListItem
                              key={fIdx}
                              fontSize="sm"
                              display="flex"
                              alignItems="start"
                            >
                              <ListIcon
                                as={CheckCircle}
                                color="green.500"
                                boxSize={4}
                                mt={0.5}
                              />
                              <Text>
                                {feature.feature}
                                {feature.quantity && ` - ${feature.quantity}`}
                              </Text>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>
          )}

          {/* Metadata */}
          <Box
            bg="white"
            p={6}
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading size="md" fontSize="18px" mb={4}>
              Metadata
            </Heading>
            <VStack align="stretch" spacing={2}>
              <Flex justify="space-between">
                <Text color="gray.600">Service ID:</Text>
                <Text fontFamily="mono" fontSize="sm">
                  {service._id}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.600">Slug:</Text>
                <Text fontFamily="mono" fontSize="sm">
                  {service.slug.current}
                </Text>
              </Flex>
              {service.publishedAt && (
                <Flex justify="space-between">
                  <Text color="gray.600">Published:</Text>
                  <Text fontSize="sm">
                    {new Date(service.publishedAt).toLocaleDateString()}
                  </Text>
                </Flex>
              )}
            </VStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
}
