"use client";
import {
  Box,
  VStack,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  IconButton,
  useToast,
  Spinner,
  Text,
  Flex,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Plus, Edit, Trash2, Eye, Menu, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  status: string;
  featured: boolean;
  description: string;
  packages: any[];
  publishedAt?: string;
}

export default function ServiceProductPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      const result = await response.json();
      
      if (result.success) {
        setServices(result.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch services',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Service deleted successfully',
          status: 'success',
          duration: 3000,
        });
        fetchServices();
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to delete service',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'green';
      case 'draft':
        return 'yellow';
      case 'archived':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <VStack align="stretch" spacing={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">Service & Product Management</Heading>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="red"
          onClick={() => router.push('/admin/service-product/create')}
        >
          Add Service
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" minH="400px">
          <Spinner size="xl" color="brand.500" />
        </Flex>
      ) : services.length === 0 ? (
        <Box
          p={12}
          bg="white"
          borderRadius="16px"
          border="1px solid"
          borderColor="gray.100"
          textAlign="center"
        >
          <Text color="gray.500" fontSize="lg" mb={4}>
            No services found
          </Text>
          <Button
            leftIcon={<Plus size={20} />}
            colorScheme="red"
            onClick={() => router.push('/admin/service-product/create')}
          >
            Create Your First Service
          </Button>
        </Box>
      ) : (
        <Box
          bg="white"
          p={6}
          borderRadius="16px"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
          overflowX="auto"
        >
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr textTransform={"none"}>
                <Th textTransform={"none"}>Title</Th>
                <Th textTransform={"none"}>Description</Th>
                <Th textTransform={"none"}>Status</Th>
                <Th textTransform={"none"}>Featured</Th>
                <Th textTransform={"none"}>Service Packages</Th>
                <Th textTransform={"none"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {services.map((service) => (
                <Tr key={service._id}>
                  <Td>{service.title}</Td>
                  <Td>{service.description}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </Td>
                  <Td>
                    {service.featured ? (
                      <Badge colorScheme="purple">Featured</Badge>
                    ) : (
                      <Text color="gray.400">-</Text>
                    )}
                  </Td>
                  <Td>{service.packages?.length || 0}</Td>
                  <Td>
                    {/* dropdown */}
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="View service"
                        icon={<Eye size={18} />}
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          router.push(`/admin/service-product/view/${service._id}`)
                        }
                      />
                      <IconButton
                        aria-label="Edit service"
                        icon={<Edit size={18} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() =>
                          router.push(`/admin/service-product/edit/${service._id}`)
                        }
                      />
                      <IconButton
                        aria-label="Delete service"
                        icon={<Trash2 size={18} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(service._id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </VStack>
  );
}
