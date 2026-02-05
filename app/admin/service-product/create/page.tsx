"use client";
import {
  Box,
  VStack,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  useToast,
  Flex,
  Badge,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  X,
  Upload,
  Edit,
  Trash2,
  CloudUpload,
  Circle,
} from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/sanity/image.service";
import PackageModal from "@/components/core/admin/package-modal";
import CustomButton from "@/components/custom-button";

export default function CreateServicePage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setFormData((prev) => ({ ...prev, slug }));
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

  // Image upload handlers
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
        const newImages = Array.isArray(result.data)
          ? result.data
          : [result.data];
        setServiceImages([...serviceImages, ...newImages]);

        toast({
          title: "Success",
          description: `${files.length} image(s) uploaded successfully`,
          status: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to upload images",
          status: "error",
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

  // Package handlers
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
      // Edit existing package
      const updated = [...packages];
      updated[editingPackage.index] = packageData;
      setPackages(updated);
      toast({
        title: "Package updated",
        status: "success",
        duration: 2000,
      });
    } else {
      // Add new package
      setPackages([...packages, packageData]);
      toast({
        title: "Package added",
        status: "success",
        duration: 2000,
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.overview) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
      });
      return;
    }

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

      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Service created successfully",
          status: "success",
          duration: 3000,
        });
        router.push("/admin/service-product");
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create service",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating service:", error);
      toast({
        title: "Error",
        description: "Failed to create service",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack align="stretch" spacing={6}>
      {/* Hidden file input */}
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
            borderRadius={"full"}
            _hover={{
              bg: "brand.500",
              border: "none",
              outline: "none",
            }}
            w={"48px"}
            h={"48px"}
            bg="brand.500"
            color="white"
          />
          <Heading size="lg">Add New Service</Heading>
        </HStack>
        <HStack spacing={3}>
          <CustomButton
            rightIcon={<Eye size={18} />}
            variant="outline"
            text="Preview"
            size={"sm"}
            borderRadius={"md"}
            onClick={() => {}}
            bg="#A70B1C0A"
            border="none"
            outline="none"
            _hover={{
              bg: "#A70B1C0A",
              border: "none",
              outline: "none",
            }}
          />
          <CustomButton
            onClick={handleSubmit}
            isLoading={loading}
            text="Save (Unpublished)"
            size={"sm"}
            borderRadius={"md"}
          />
        </HStack>
      </Flex>

      {/* new */}

      <SimpleGrid columns={[1, 1, 2]} spacing={6}>
        <FormControl isRequired>
          <FormLabel>Service Title</FormLabel>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Basic IELTS Prep"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Slug</FormLabel>
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder="basic-ielts-prep"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Brief description of the service..."
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Brief description of the service..."
          />
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={[1, 1, 2]} spacing={6}>
        <FormControl isRequired>
          <FormLabel>Overview</FormLabel>
          <Textarea
            name="overview"
            value={formData.overview}
            onChange={handleInputChange}
            rows={6}
            placeholder="This comprehensive preparation program is designed to help you excel..."
          />
        </FormControl>
        <Box>
          <FormControl isRequired>
            <FormLabel>What's Included</FormLabel>
          </FormControl>

          <VStack align="stretch" spacing={3}>
            {whatsIncluded.map((item, index) => (
              <HStack key={index} spacing={2}>
                <Input
                  value={item}
                  onChange={(e) =>
                    handleIncludedItemChange(index, e.target.value)
                  }
                  placeholder="e.g., 1-on-1 speaking coaching sessions"
                />
                <IconButton
                  aria-label="Remove item"
                  icon={<Trash2 size={18} />}
                  size="sm"
                  colorScheme="brand"
                  color={"#E31D1C"}
                  variant="ghost"
                  onClick={() => handleRemoveIncludedItem(index)}
                  isDisabled={whatsIncluded.length === 1}
                  _hover={{
                    bg: "brand.500",
                    color: "white",
                  }}
                />
              </HStack>
            ))}
          </VStack>
          <Button
            size="sm"
            leftIcon={<Plus size={16} />}
            colorScheme="brand"
            variant="link"
            onClick={handleAddIncludedItem}
            _hover={{
              textDecoration: "none",
              color: "brand.500",
            }}
            mt={2}
            fontWeight={400}
          >
            Add New Option
          </Button>
        </Box>
      </SimpleGrid>
      <Flex gap={4} flexDirection={["column", "column", "row"]}>
        <FormControl maxW={["100%", "100%", "350px"]} isRequired>
          <FormLabel fontSize={"16px"}>Service Images</FormLabel>
          <Box
            border="1px solid"
            borderColor="gray.300"
            borderRadius="12px"
            p={8}
            textAlign="center"
          >
            {uploadingImages ? (
              <VStack spacing={2}>
                <Spinner size="lg" color="brand.500" />
                <Text fontSize="sm" color="gray.600">
                  Uploading images...
                </Text>
              </VStack>
            ) : (
              <VStack spacing={2}>
                <CloudUpload size={32} color="#999" />
                <Text fontSize="sm" color="gray.600">
                  Upload your image here
                </Text>
                <Text fontSize="xs" color="gray.400">
                  JPEG,JPG,PNG
                </Text>
                <Button
                  size="sm"
                  colorScheme="brand"
                  onClick={handleImageUploadClick}
                  _hover={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  mt={2}
                  fontWeight={400}
                  borderRadius={"sm"}
                  px={6}
                >
                  Browse
                </Button>
              </VStack>
            )}
          </Box>
        </FormControl>
        <Box pt={6}>
          {serviceImages.length > 0 && (
            <SimpleGrid columns={3} spacing={4} mt={4}>
              {serviceImages.map((img, idx) => (
                <Box key={idx} position="relative">
                  <Image
                    src={getImageUrl(img, 300)}
                    alt={`Service image ${idx + 1}`}
                    borderRadius="8px"
                    objectFit="cover"
                    h="100px"
                    w="100%"
                  />
                  <IconButton
                    aria-label="Remove image"
                    icon={<X size={16} />}
                    size="xs"
                    position="absolute"
                    top={2}
                    right={2}
                    colorScheme="red"
                    onClick={() => handleRemoveImage(idx)}
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>

      <Box>
        <HStack justifyContent={"space-between"} mb={4}>
          <Text>Service Packages</Text>
          <Button
            size={"sm"}
            borderRadius={"sm"}
            onClick={handleAddPackage}
            colorScheme="brand"
            px={4}
          >
            Add Package
          </Button>
        </HStack>
        {packages.length === 0 ? (
          <Box
            w={"280px"}
            h={"324px"}
            bg={"#F9FAFB"}
            borderRadius={"12px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            p={4}
            gap={4}
          >
            <Icon as={Plus} color={"#03453B"} size={24} />
            <Text color="gray.500" fontSize="sm">
              No Package added yet
            </Text>
            <Button
              size={"sm"}
              borderRadius={"sm"}
              onClick={handleAddPackage}
              colorScheme="brand"
              px={4}
            >
              Create One
            </Button>
          </Box>
        ) : (
          <SimpleGrid spacing={3} columns={[1, 2, 4]}>
            {packages.map((pkg, index) => (
              <VStack key={index} maxW={"280px"} color={"#03453B"}>
                {pkg.image && (
                  <Image
                    src={getImageUrl(pkg.image, 80)}
                    alt={pkg.name}
                    w="100%"
                    maxW={"280px"}
                    h="168px"
                    objectFit="cover"
                    borderRadius="6px"
                  />
                )}
                <VStack align="start" spacing={2} flex={1} w={"100%"}>
                  <HStack justifyContent={"space-between"} w={"100%"} gap={1}>
                    <Text fontSize={["sm", "md"]} color="#03453B">
                      {pkg.name}
                    </Text>
                    <Text color="#03453B">
                      {pkg.currency} {parseFloat(pkg.price).toLocaleString()}
                    </Text>
                  </HStack>
                  <Text fontSize={["xs", "13px"]} noOfLines={2}>
                    {pkg.description || "No description"}
                  </Text>
                  {pkg.features?.length > 0 && (
                    <VStack align="start" spacing={2} flex={1} w={"100%"}>
                      {pkg.features.map((feature: any, index: number) => (
                        <HStack key={index} spacing={2}>
                          <Icon
                            as={Circle}
                            color="brand.500"
                            w={2}
                            h={2}
                            fill={"brand.500"}
                          />
                          <Text fontSize={["13px"]} noOfLines={2}>
                            {typeof feature === 'string' ? feature : `${feature.quantity ? feature.quantity + ' ' : ''}${feature.feature}`}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  )}
                </VStack>

                <HStack spacing={1} w={"full"} mt={4}>
                  <Button
                    aria-label="Edit package"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditPackage(pkg, index)}
                    flex={1}
                    bg={"#A70B1C0A"}
                    borderRadius={"sm"}
                    _hover={{
                      bg: "#A70B1C0A",
                    }}
                    fontWeight={400}
                  >
                    Edit
                  </Button>

                  <IconButton
                    aria-label="Delete package"
                    icon={<Trash2 size={16} />}
                    size="sm"
                    colorScheme="brand"
                    bg={"#E31D1C"}
                    onClick={() => handleDeletePackage(index)}
                    borderRadius={"sm"}
                  />
                </HStack>
              </VStack>
            ))}
          </SimpleGrid>
        )}
      </Box>

      {/* Package Modal */}
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
