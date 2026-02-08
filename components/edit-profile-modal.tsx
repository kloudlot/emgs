"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import CustomButton from "./custom-button";
import type { UserProfile } from "@/lib/types/user";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSuccess: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSuccess,
}: EditProfileModalProps) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    phone_number: profile.phone_number || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.full_name.trim()) {
      toast({
        title: "Validation Error",
        description: "Full name is required",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update profile",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent borderRadius="16px">
        <ModalHeader fontSize="20px" fontWeight="600" pt={6}>
          Edit Profile
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Full Name
              </FormLabel>
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                bg="white"
                borderColor="gray.200"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight="600">
                Phone Number
              </FormLabel>
              <Input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                bg="white"
                borderColor="gray.200"
              />
            </FormControl>
          </VStack>

          {/* Submit Button */}
          <HStack mt={6}>
            <CustomButton
              text="Update Profile"
              colorScheme="brand"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Updating..."
              w="full"
              borderRadius="md"
              fontWeight={400}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
