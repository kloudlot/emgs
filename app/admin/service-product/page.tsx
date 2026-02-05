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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  MoreVertical,
  Upload,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/page-title";
import CustomButton from "@/components/custom-button";

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
      const response = await fetch("/api/services");
      const result = await response.json();

      if (result.success) {
        setServices(result.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch services",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to fetch services",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Service deleted successfully",
          status: "success",
          duration: 3000,
        });
        fetchServices();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete service",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "published" }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Service published successfully",
          status: "success",
          duration: 3000,
        });
        fetchServices();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to publish service",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error publishing service:", error);
      toast({
        title: "Error",
        description: "Failed to publish service",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "draft" }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Service unpublished successfully",
          status: "success",
          duration: 3000,
        });
        fetchServices();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to unpublish service",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error unpublishing service:", error);
      toast({
        title: "Error",
        description: "Failed to unpublish service",
        status: "error",
        duration: 3000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "#09C353";
      case "draft":
        return "#F3D020";
      case "archived":
        return "gray";
      default:
        return "gray";
    }
  };

  return (
    <VStack align="stretch" spacing={6}>
      <PageTitle>
        <PageTitle.Left>
          <PageTitle.Header
            title="Service & Product"
            description="Manage all content for your platform. Handle posts, drafts, media, and settings in one organized space for quick updates."
          />
        </PageTitle.Left>
        <PageTitle.Right>
          <CustomButton
            colorScheme="brand"
            onClick={() => router.push("/admin/service-product/create")}
            px={6}
            borderRadius={"sm"}
            text="Add New Service"
          />
        </PageTitle.Right>
      </PageTitle>

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
            onClick={() => router.push("/admin/service-product/create")}
          >
            Create Your First Service
          </Button>
        </Box>
      ) : (
        <Box bg="white" pt={6} overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr textTransform={"none"}>
                <Th textTransform={"none"}>Title</Th>
                <Th textTransform={"none"}>Description</Th>
                <Th textTransform={"none"} textAlign={"center"}>
                  Service Packages
                </Th>
                <Th textTransform={"none"} textAlign={"center"}>
                  Status
                </Th>
                <Th textTransform={"none"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {services.map((service) => (
                <Tr key={service._id}>
                  <Td>{service.title}</Td>
                  <Td>{service.description}</Td>
                  <Td textAlign={"center"}>{service.packages?.length || 0}</Td>
                  <Td textAlign={"center"}>
                    <Badge
                      bg={getStatusColor(service.status)}
                      py={2}
                      px={6}
                      borderRadius={"full"}
                      color={"#fff"}
                      textTransform={"capitalize"}
                    >
                      {service.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Actions"
                        icon={<MoreVertical size={18} />}
                        borderRadius={"full"}
                        w={"40px"}
                        h={"40px"}
                      />
                      <MenuList px={2}>
                        <MenuItem
                          icon={<Edit size={16} />}
                          onClick={() =>
                            router.push(
                              `/admin/service-product/edit/${service._id}`,
                            )
                          }
                          bg={"#fafaff"}
                          mb={2}
                          color={"#7d7d80"}
                          fontSize={"13px"}
                        >
                          Edit Service
                        </MenuItem>
                        <MenuItem
                          icon={<Eye size={16} />}
                          onClick={() =>
                            router.push(
                              `/admin/service-product/view/${service._id}`,
                            )
                          }
                          bg={"#fafaff"}
                          mb={2}
                          color={"#7d7d80"}
                          fontSize={"13px"}
                        >
                          Preview
                        </MenuItem>

                        {service.status === "published" ? (
                          <MenuItem
                            icon={<Download size={16} />}
                            onClick={() => handleUnpublish(service._id)}
                            bg={"#fafaff"}
                            mb={2}
                            color={"#7d7d80"}
                            fontSize={"13px"}
                          >
                            Unpublish
                          </MenuItem>
                        ) : (
                          <MenuItem
                            icon={<Upload size={16} />}
                            onClick={() => handlePublish(service._id)}
                            bg={"#fafaff"}
                            mb={2}
                            color={"#7d7d80"}
                            fontSize={"13px"}
                          >
                            Publish
                          </MenuItem>
                        )}

                        <MenuItem
                          icon={<Trash2 size={16} />}
                          onClick={() => handleDelete(service._id)}
                          bg={"#fafaff"}
                          mb={2}
                          fontSize={"13px"}
                          color="#ff0000"
                        >
                          Delete Service
                        </MenuItem>
                      </MenuList>
                    </Menu>
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
