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
  useToast,
  Flex,
  Badge,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { ArrowLeft, Eye, Plus, X, Upload, Edit, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getImageUrl } from "@/lib/sanity/image.service";
import PackageModal from "@/components/core/admin/package-modal";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingService, setFetchingService] = useState(true);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    overview: "",
    description: "",
    status: "draft",
    featured: false,
  });
  
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>([""]);
  const [serviceImages, setServiceImages] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  useEffect(() => {
    if (params.id) {
      fetchService(params.id as string);
    }
  }, [params.id]);

  const fetchService = async (id: string) => {
    try {
      setFetchingService(true);
      const response = await fetch(`/api/services/${id}`);
      const result = await response.json();

      if (result.success) {
        const service = result.data;
        setFormData({
          title: service.title || "",
          slug: service.slug?.current || "",
          overview: service.overview || "",
          description: service.description || "",
          status: service.status || "draft",
          featured: service.featured || false,
        });
        
        setWhatsIncluded(
          service.whatsIncluded?.length > 0
            ? service.whatsIncluded.map((item: any) => item.item)
            : [""]
        );
        
        setServiceImages(service.serviceImages || []);
        setPackages(service.packages || []);
      } else {
        toast({
          title: "Error",
          description: "Failed to load service",
          status: "error",
          duration: 3000,
        });
        router.push("/admin/service-product");
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      toast({
        title: "Error",
        description: "Failed to load service",
        status: "error",
        duration: 3000,
      });
      router.push("/admin/service-product");
    } finally {
      setFetchingService(false);
    }
  };

  const handleAddIncludedItem = () => {
    setWhatsIncluded([...whatsIncluded, ""]);
  };

  const handleRemoveIncludedItem = (index: number) => {
    setWhatsIncluded(whatsIncluded.filter((_, i) => i !== index));
  };

  const handleIncludedItemChange = (index: number, value: string) => {
    const updated = [...whatsIncluded];
    updated[index] = value;
    setWhatsIncluded(updated);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadingImages(true);
      const formData = new FormData();
      
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const newImages = Array.isArray(result.data) ? result.data : [result.data];
        setServiceImages([...serviceImages, ...newImages]);
        
        toast({
          title: "Success",
          description: `${files.length} image(s) uploaded successfully`,
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Error",
        description: "Failed to upload images",
        status: "error",
        duration: 3000,
      });
    } finally {
      setUploadingImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setServiceImages(serviceImages.filter((_, i) => i !== index));
  };

  const handleAddPackage = () => {
    setEditingPackage(null);
    setIsPackageModalOpen(true);
  };

  const handleEditPackage = (pkg: any, index: number) => {
    setEditingPackage({ ...pkg, index });
    setIsPackageModalOpen(true);
  };

  const handleDeletePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
    toast({
      title: "Package removed",
      status: "info",
      duration: 2000,
    });
  };

  const handleSavePackage = (packageData: any) => {
    if (editingPackage?.index !== undefined) {
      const updated = [...packages];
      updated[editingPackage.index] = packageData;
      setPackages(updated);
      toast({
        title: "Package updated",
        status: "success",
        duration: 2000,
      });
    } else {
      setPackages([...packages, packageData]);
      toast({
        title: "Package added",
        status: "success",
        duration: 2000,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const payload = {
        ...formData,
        whatsIncluded: whatsIncluded
          .filter((item) => item.trim())
          .map((item) => ({ item })),
        serviceImages: serviceImages,
        packages: packages,
      };

      const response = await fetch(`/api/services/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Service updated successfully",
          status: "success",
          duration: 3000,
        });
        router.push("/admin/service-product");
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update service",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast({
        title: "Error",
        description: "Failed to update service",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingService) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        multiple
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {/* Header */}
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <IconButton
            aria-label="Go back"
            icon={<ArrowLeft size={20} />}
            variant="ghost"
            onClick={() => router.back()}
          />
          <Heading size="lg">Edit Service</Heading>
        </HStack>
        <HStack spacing={3}>
          <Button
            leftIcon={<Eye size={18} />}
            variant="outline"
            colorScheme="gray"
            onClick={() => router.push(`/admin/service-product/view/${params.id}`)}
          >
            Preview
          </Button>
          <Button
            colorScheme="red"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Save & Close
          </Button>
        </HStack>
      </Flex>

      {/* Overview and What's Included */}
      <SimpleGrid columns={[1, 1, 2]} spacing={6}>
        <Box bg="white" p={6} borderRadius="16px" border="1px solid" borderColor="gray.100">
          <Heading size="md" fontSize="18px" mb={4}>
            Overview <Badge ml={2} colorScheme="red">Required</Badge>
          </Heading>
          <Text color="gray.700" lineHeight="1.7" fontSize="sm" mb={4}>
            {formData.overview}
          </Text>
          
          {formData.description && (
            <>
              <Heading size="sm" fontSize="16px" mb={2} mt={4}>
                Description
              </Heading>
              <Text color="gray.700" lineHeight="1.7" fontSize="sm">
                {formData.description}
              </Text>
            </>
          )}
        </Box>

        <Box bg="white" p={6} borderRadius="16px" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md" fontSize="18px">
              What's included <Badge ml={2} colorScheme="red">Required</Badge>
            </Heading>
            <Button
              size="sm"
              leftIcon={<Plus size={16} />}
              colorScheme="red"
              variant="link"
              onClick={handleAddIncludedItem}
            >
              Add New Option
            </Button>
          </Flex>

          <VStack align="stretch" spacing={2}>
            {whatsIncluded.map((item, index) => (
              <HStack key={index} spacing={2}>
                <IconButton
                  aria-label="Drag"
                  icon={<span style={{ fontSize: "18px" }}>⋮⋮</span>}
                  size="sm"
                  variant="ghost"
                  cursor="grab"
                  isDisabled
                />
                <Input
                  flex={1}
                  size="sm"
                  value={item}
                  onChange={(e) => handleIncludedItemChange(index, e.target.value)}
                  placeholder="e.g., 1-on-1 speaking coaching sessions"
                />
                <IconButton
                  aria-label="Remove item"
                  icon={<Trash2 size={16} />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleRemoveIncludedItem(index)}
                  isDisabled={whatsIncluded.length === 1}
                />
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Service Images */}
      <Box bg="white" p={6} borderRadius="16px" border="1px solid" borderColor="gray.100">
        <Heading size="md" fontSize="18px" mb={4}>
          Service Images <Badge ml={2} colorScheme="red">Required</Badge>
        </Heading>

        <Flex gap={4} align="center">
          <Box
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="12px"
            p={8}
            textAlign="center"
            cursor="pointer"
            _hover={{ borderColor: "brand.500", bg: "gray.50" }}
            onClick={handleImageUploadClick}
            minW="200px"
          >
            {uploadingImages ? (
              <VStack spacing={2}>
                <Spinner size="lg" color="brand.500" />
                <Text fontSize="sm" color="gray.600">Uploading...</Text>
              </VStack>
            ) : (
              <VStack spacing={2}>
                <Upload size={32} color="#999" />
                <Text fontSize="sm" color="gray.600">Upload your image here</Text>
                <Text fontSize="xs" color="gray.400">.jpeg, .jpg, .png</Text>
                <Button size="sm" colorScheme="red" mt={2}>Browse</Button>
              </VStack>
            )}
          </Box>

          {serviceImages.length > 0 && (
            <HStack spacing={4} flex={1} overflowX="auto">
              {serviceImages.map((img, idx) => (
                <Box key={idx} position="relative" flexShrink={0}>
                  <Image
                    src={getImageUrl(img, 300)}
                    alt={`Service image ${idx + 1}`}
                    borderRadius="8px"
                    objectFit="cover"
                    h="120px"
                    w="120px"
                  />
                  <IconButton
                    aria-label="Remove image"
                    icon={<X size={14} />}
                    size="xs"
                    position="absolute"
                    top={1}
                    right={1}
                    colorScheme="red"
                    borderRadius="full"
                    onClick={() => handleRemoveImage(idx)}
                  />
                </Box>
              ))}
            </HStack>
          )}
        </Flex>
      </Box>

      {/* Services Packages */}
      <Box bg="white" p={6} borderRadius="16px" border="1px solid" borderColor="gray.100">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="md" fontSize="18px">Services Packages</Heading>
          <Button size="md" colorScheme="red" onClick={handleAddPackage}>
            Add Package
          </Button>
        </Flex>

        {packages.length === 0 ? (
          <Text color="gray.500" fontSize="sm" textAlign="center" py={8}>
            No packages added yet. Click "Add Package" to create pricing tiers.
          </Text>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {packages.map((pkg, index) => (
              <Box
                key={index}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="12px"
                overflow="hidden"
                _hover={{ shadow: "md" }}
                transition="all 0.2s"
              >
                {pkg.image ? (
                  <Image
                    src={getImageUrl(pkg.image, 400)}
                    alt={pkg.name}
                    w="100%"
                    h="180px"
                    objectFit="cover"
                  />
                ) : (
                  <Box w="100%" h="180px" bg="gray.200" display="flex" alignItems="center" justifyContent="center">
                    <Text color="gray.500">No Image</Text>
                  </Box>
                )}

                <VStack align="stretch" p={4} spacing={3}>
                  <Flex justify="space-between" align="start">
                    <Text fontWeight="700" fontSize="lg">{pkg.name}</Text>
                    <Text fontWeight="700" fontSize="lg" color="brand.500">
                      ${pkg.price}
                    </Text>
                  </Flex>

                  {pkg.description && (
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {pkg.description}
                    </Text>
                  )}

                  {pkg.features && pkg.features.length > 0 && (
                    <VStack align="stretch" spacing={1}>
                      {pkg.features.slice(0, 3).map((feature: any, fIdx: number) => (
                        <HStack key={fIdx} spacing={2}>
                          <Box w="6px" h="6px" borderRadius="full" bg="red.500" flexShrink={0} />
                          <Text fontSize="sm" color="gray.700">
                            {feature.feature || feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  )}

                  <Flex gap={2} pt={2}>
                    <Button
                      size="sm"
                      variant="link"
                      colorScheme="blue"
                      leftIcon={<Edit size={14} />}
                      onClick={() => handleEditPackage(pkg, index)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="link"
                      colorScheme="red"
                      leftIcon={<Trash2 size={14} />}
                      onClick={() => handleDeletePackage(index)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>

      <PackageModal
        isOpen={isPackageModalOpen}
        onClose={() => {
          setIsPackageModalOpen(false);
          setEditingPackage(null);
        }}
        onSave={handleSavePackage}
        editData={editingPackage}
      />
    </VStack>
  );
}
