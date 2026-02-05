"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Text,
  HStack,
  IconButton,
  Image,
  Badge,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import { useState, useRef } from "react";

interface PackageFormData {
  name: string;
  description: string;
  price: string;
  currency: string;
  packageType: string;
  features: string[];
  image?: any;
}

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (packageData: PackageFormData) => void;
  editData?: PackageFormData;
}

export default function PackageModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: PackageModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<PackageFormData>(
    editData || {
      name: "",
      description: "",
      price: "",
      currency: "NGN",
      packageType: "basic",
      features: [""],
      image: null,
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append("files", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({ ...prev, image: result.data }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const getImageUrl = (img: any) => {
    if (!img?.asset?._ref) return "";
    const ref = img.asset._ref;
    const [, id, dimensions, format] = ref.split("-");
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent maxW="600px">
        <ModalHeader fontSize="18px" fontWeight="600">
          {editData ? "Edit Package" : "New Package"}
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <VStack spacing={4} align="stretch">
            {/* Package Image */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">
                Package Image
              </FormLabel>
              
              {formData.image ? (
                <Box position="relative" w="full">
                  <Image
                    src={getImageUrl(formData.image)}
                    alt="Package"
                    borderRadius="8px"
                    h="150px"
                    w="full"
                    objectFit="cover"
                  />
                  <HStack
                    position="absolute"
                    top={2}
                    right={2}
                    spacing={2}
                  >
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="solid"
                      onClick={handleImageUploadClick}
                    >
                      Change
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </Button>
                  </HStack>
                </Box>
              ) : (
                <Box
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="8px"
                  p={6}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ borderColor: "brand.500", bg: "gray.50" }}
                  onClick={handleImageUploadClick}
                >
                  {uploading ? (
                    <VStack spacing={2}>
                      <Spinner size="md" color="brand.500" />
                      <Text fontSize="sm" color="gray.600">
                        Uploading...
                      </Text>
                    </VStack>
                  ) : (
                    <VStack spacing={2}>
                      <Upload size={24} color="#999" />
                      <Text fontSize="sm" color="gray.600">
                        Upload your image here
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        .jpeg, .jpg, .png
                      </Text>
                      <Button size="sm" borderRadius={"sm"} colorScheme="brand" mt={2} px={6}>
                        Browse
                      </Button>
                    </VStack>
                  )}
                </Box>
              )}
            </FormControl>

            {/* Title */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">Title</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Basic IELTS Prep"
              />
            </FormControl>

            {/* Short Description */}
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">Short Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Best for self-paced learners, Which includes:"
                colorScheme="brand"
                outline={"none"}
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                  borderColor: "brand.300",
                }}
              />
            </FormControl>

            {/* Package Type NOT NEEDED FOR NOW */}
            {/* <FormControl>
              <FormLabel fontSize="sm" color="gray.600">Package Type</FormLabel>
              <Select
                name="packageType"
                value={formData.packageType}
                onChange={handleInputChange}
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </Select>
            </FormControl> */}

            {/* Options/Features */}
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">Options</FormLabel>
              <VStack spacing={2} align="stretch">
                {formData.features.map((feature, index) => (
                  <HStack key={index} spacing={2}>
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="e.g., 2 speaking sessions"
                      size="sm"
                    />
                    <IconButton
                      aria-label="Remove option"
                      icon={<Trash2 size={16} />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleRemoveFeature(index)}
                      isDisabled={formData.features.length === 1}
                    />
                  </HStack>
                ))}
                <Button
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  variant="link"
                  colorScheme="brand"
                  onClick={handleAddFeature}
                  alignSelf="flex-start"
                  fontWeight={400}
                  fontSize={"13px"}
                >
                  Add New Option
                </Button>
              </VStack>
            </FormControl>

            {/* Price and Currency */}
            <HStack spacing={3}>
              <FormControl flex={2} isRequired>
                <FormLabel fontSize="sm" color="gray.600">Price</FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="15000"
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm" color="gray.600">Currency</FormLabel>
                <Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  size="md"
                >
                  <option value="NGN">₦ NGN</option>
                  <option value="USD">$ USD</option>
                  <option value="GBP">£ GBP</option>
                  <option value="EUR">€ EUR</option>
                </Select>
              </FormControl>
            </HStack>

            {/* Submit Button */}
            <Button
              colorScheme="red"
              w="full"
              onClick={handleSubmit}
              isDisabled={!formData.name || !formData.price}
            >
              {editData ? "Update Package" : "Add Package"}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
