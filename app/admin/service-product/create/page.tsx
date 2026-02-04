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
} from "@chakra-ui/react";
import { ArrowLeft, Save, Eye, Plus, X, Upload, Edit, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/sanity/image.service";
import PackageModal from "@/components/core/admin/package-modal";

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
    status: "draft",
    featured: false,
  });
  
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>([""]);
  const [serviceImages, setServiceImages] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
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
        const newImages = Array.isArray(result.data) ? result.data : [result.data];
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
          />
          <Heading size="lg">Create Service</Heading>
        </HStack>
        <HStack spacing={3}>
          <Button
            leftIcon={<Eye size={18} />}
            variant="outline"
            colorScheme="gray"
          >
            Preview
          </Button>
          <Button
            leftIcon={<Save size={18} />}
            colorScheme="red"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Save & Close
          </Button>
        </HStack>
      </Flex>

      <SimpleGrid columns={[1, 1, 2]} spacing={6}>
        {/* Left Column - Overview */}
        <VStack align="stretch" spacing={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack align="stretch" spacing={4}>
              <Heading size="md" fontSize="18px" mb={2}>
                Overview
                <Badge ml={2} colorScheme="red">Required</Badge>
              </Heading>

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

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </Select>
              </FormControl>
            </VStack>
          </Box>

          {/* Service Images */}
          <Box
            bg="white"
            p={6}
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading size="md" fontSize="18px" mb={4}>
              Service Images
              <Badge ml={2} colorScheme="orange">Optional</Badge>
            </Heading>

            <Box
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="12px"
              p={8}
              textAlign="center"
              cursor="pointer"
              _hover={{ borderColor: "brand.500", bg: "gray.50" }}
              onClick={handleImageUploadClick}
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
                  <Upload size={32} color="#999" />
                  <Text fontSize="sm" color="gray.600">
                    Click to upload images
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    .jpeg, .jpg, .png (multiple files supported)
                  </Text>
                </VStack>
              )}
            </Box>

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
        </VStack>

        {/* Right Column - What's Included */}
        <VStack align="stretch" spacing={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.100"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" fontSize="18px">
                What's Included
                <Badge ml={2} colorScheme="orange">Optional</Badge>
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

            <VStack align="stretch" spacing={3}>
              {whatsIncluded.map((item, index) => (
                <HStack key={index} spacing={2}>
                  <Input
                    value={item}
                    onChange={(e) => handleIncludedItemChange(index, e.target.value)}
                    placeholder="e.g., 1-on-1 speaking coaching sessions"
                  />
                  <IconButton
                    aria-label="Remove item"
                    icon={<X size={18} />}
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

          {/* Services Packages Section */}
          <Box
            bg="white"
            p={6}
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.100"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" fontSize="18px">
                Services Packages
              </Heading>
              <Button
                size="sm"
                colorScheme="red"
                leftIcon={<Plus size={16} />}
                onClick={handleAddPackage}
              >
                Add Package
              </Button>
            </Flex>

            {packages.length === 0 ? (
              <Text color="gray.500" fontSize="sm">
                No packages added yet. Click "Add Package" to create pricing tiers.
              </Text>
            ) : (
              <VStack spacing={3} align="stretch">
                {packages.map((pkg, index) => (
                  <Box
                    key={index}
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="8px"
                    _hover={{ borderColor: "brand.500" }}
                  >
                    <Flex justify="space-between" align="start">
                      <HStack spacing={3} flex={1}>
                        {pkg.image && (
                          <Image
                            src={getImageUrl(pkg.image, 80)}
                            alt={pkg.name}
                            w="60px"
                            h="60px"
                            objectFit="cover"
                            borderRadius="6px"
                          />
                        )}
                        <VStack align="start" spacing={1} flex={1}>
                          <Text fontWeight="600" fontSize="md">
                            {pkg.name}
                          </Text>
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {pkg.description || "No description"}
                          </Text>
                          <HStack spacing={2}>
                            <Badge colorScheme="blue">{pkg.packageType}</Badge>
                            <Text fontWeight="600" color="brand.500">
                              {pkg.currency} {parseFloat(pkg.price).toLocaleString()}
                            </Text>
                          </HStack>
                        </VStack>
                      </HStack>
                      <HStack spacing={1}>
                        <IconButton
                          aria-label="Edit package"
                          icon={<Edit size={16} />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditPackage(pkg, index)}
                        />
                        <IconButton
                          aria-label="Delete package"
                          icon={<Trash2 size={16} />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeletePackage(index)}
                        />
                      </HStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>
      </SimpleGrid>

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
