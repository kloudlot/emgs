"use client";
import {
  Box,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  useToast,
  Grid,
  GridItem,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom-button";
import BackButton from "@/components/back-button";

export default function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingCoupon, setFetchingCoupon] = useState(true);

  const [formData, setFormData] = useState({
    code: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: "",
    expire_date: "",
    maximum_use_count: "",
    is_active: true,
  });

  useEffect(() => {
    fetchCouponData();
  }, [id]);

  const fetchCouponData = async () => {
    try {
      setFetchingCoupon(true);
      const response = await fetch(`/api/coupons/${id}`);
      const result = await response.json();

      if (result.success && result.data) {
        const coupon = result.data;
        setFormData({
          code: coupon.code || "",
          discount_type: coupon.discount_type || "percentage",
          discount_value: coupon.discount_value?.toString() || "",
          expire_date: coupon.expire_date
            ? coupon.expire_date.split("T")[0]
            : "",
          maximum_use_count: coupon.maximum_use_count?.toString() || "",
          is_active: coupon.is_active ?? true,
        });
      } else {
        toast({
          title: "Error",
          description: "Coupon not found",
          status: "error",
          duration: 3000,
        });
        router.push("/admin/affiliate-coupons");
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
      toast({
        title: "Error",
        description: "Failed to fetch coupon data",
        status: "error",
        duration: 3000,
      });
      router.push("/admin/affiliate-coupons");
    } finally {
      setFetchingCoupon(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, is_active: e.target.checked }));
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

    if (formData.discount_type === "percentage" && parseFloat(formData.discount_value) > 100) {
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

    if (!formData.maximum_use_count || parseInt(formData.maximum_use_count) <= 0) {
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

      const response = await fetch(`/api/coupons/${id}`, {
        method: "PATCH",
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
          description: "Coupon updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/admin/affiliate-coupons");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update coupon",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast({
        title: "Error",
        description: "Failed to update coupon",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCoupon) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      {/* Header */}
      <HStack spacing={4} mb={4}>
        <BackButton />
        <Heading size="lg" fontWeight="600">
          Edit Coupon
        </Heading>
      </HStack>

      {/* Form */}
      <Box bg="white" p={8} borderRadius="16px" border="1px solid" borderColor="gray.100">
        <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={6}>
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
                placeholder={formData.discount_type === "percentage" ? "20" : "10.00"}
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
        <HStack justify="flex-end" mt={8}>
          <CustomButton
            text="Update Coupon"
            colorScheme="brand"
            bg="#A70B1C"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Updating..."
            px={8}
            borderRadius="sm"
            _hover={{ bg: "#8A0916" }}
          />
        </HStack>
      </Box>
    </VStack>
  );
}
