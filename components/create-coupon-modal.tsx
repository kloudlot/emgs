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
  Select,
  Switch,
  useToast,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import CustomButton from "./custom-button";

interface CreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCouponModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateCouponModalProps) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: "",
    expire_date: "",
    maximum_use_count: "",
    is_active: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, is_active: e.target.checked }));
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discount_type: "percentage",
      discount_value: "",
      expire_date: "",
      maximum_use_count: "",
      is_active: true,
    });
  };

  const validateForm = () => {
    if (!formData.code.trim()) {
      toast({
        title: "Validation Error",
        description: "Coupon code is required",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    if (!formData.discount_value || parseFloat(formData.discount_value) <= 0) {
      toast({
        title: "Validation Error",
        description: "Discount value must be greater than 0",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    if (
      formData.discount_type === "percentage" &&
      parseFloat(formData.discount_value) > 100
    ) {
      toast({
        title: "Validation Error",
        description: "Percentage discount cannot exceed 100",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    if (!formData.expire_date) {
      toast({
        title: "Validation Error",
        description: "Expire date is required",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    const expireDate = new Date(formData.expire_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (expireDate < today) {
      toast({
        title: "Validation Error",
        description: "Expire date must be in the future",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    if (
      !formData.maximum_use_count ||
      parseInt(formData.maximum_use_count) <= 0
    ) {
      toast({
        title: "Validation Error",
        description: "Maximum use count must be greater than 0",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code.toUpperCase(),
          discount_type: formData.discount_type,
          discount_value: parseFloat(formData.discount_value),
          expire_date: formData.expire_date,
          maximum_use_count: parseInt(formData.maximum_use_count),
          is_active: formData.is_active,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Coupon created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        resetForm();
        onClose();
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create coupon",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast({
        title: "Error",
        description: "Failed to create coupon",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent borderRadius="16px" maxW="800px">
        <ModalHeader fontSize="20px" fontWeight="600" pt={6}>
          Create New Coupon
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={4}>
            {/* Coupon Code */}
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize="14px" fontWeight="600">
                  Coupon Code
                </FormLabel>
                <Input
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="AFRI20"
                  bg="white"
                  borderColor="gray.200"
                  textTransform="uppercase"
                />
              </FormControl>
            </GridItem>

            {/* Discount Type */}
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize="14px" fontWeight="600">
                  Discount Type
                </FormLabel>
                <Select
                  name="discount_type"
                  value={formData.discount_type}
                  onChange={handleInputChange}
                  bg="white"
                  borderColor="gray.200"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </Select>
              </FormControl>
            </GridItem>

            {/* Discount Value */}
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize="14px" fontWeight="600">
                  Discount Value
                </FormLabel>
                <Input
                  name="discount_value"
                  type="number"
                  value={formData.discount_value}
                  onChange={handleInputChange}
                  placeholder={
                    formData.discount_type === "percentage" ? "20" : "10.00"
                  }
                  bg="white"
                  borderColor="gray.200"
                  min="0"
                  step={formData.discount_type === "percentage" ? "1" : "0.01"}
                />
              </FormControl>
            </GridItem>

            {/* Expire Date */}
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize="14px" fontWeight="600">
                  Expire Date
                </FormLabel>
                <Input
                  name="expire_date"
                  type="date"
                  value={formData.expire_date}
                  onChange={handleInputChange}
                  bg="white"
                  borderColor="gray.200"
                />
              </FormControl>
            </GridItem>

            {/* Maximum Use Count */}
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize="14px" fontWeight="600">
                  Maximum Use Count
                </FormLabel>
                <Input
                  name="maximum_use_count"
                  type="number"
                  value={formData.maximum_use_count}
                  onChange={handleInputChange}
                  placeholder="100"
                  bg="white"
                  borderColor="gray.200"
                  min="1"
                />
              </FormControl>
            </GridItem>

            {/* Is Active */}
            <GridItem>
              <FormControl display="flex" alignItems="center" h="full">
                <FormLabel fontSize="14px" fontWeight="600" mb={0}>
                  Active Status
                </FormLabel>
                <Switch
                  isChecked={formData.is_active}
                  onChange={handleSwitchChange}
                  colorScheme="green"
                  size="lg"
                />
              </FormControl>
            </GridItem>
          </Grid>

          {/* Submit Button */}
          <HStack justify="flex-end" mt={6}>
            <CustomButton
              text="Cancel"
              variant="ghost"
              onClick={handleClose}
              isDisabled={loading}
            />
            <CustomButton
              text="Create Coupon"
              colorScheme="brand"
              bg="#A70B1C"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Creating..."
              px={6}
              borderRadius="sm"
              _hover={{ bg: "#8A0916" }}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
