"use client";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Spinner,
  Flex,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Coupon } from "@/lib/types/coupon";
import CouponCard from "@/components/coupon-card";
import EmptyCouponState from "@/components/empty-coupon-state";
import DeleteCouponModal from "@/components/delete-coupon-modal";
import CreateCouponModal from "@/components/create-coupon-modal";
import EditCouponModal from "@/components/edit-coupon-modal";
import CustomButton from "@/components/custom-button";

export default function AffiliateCouponsPage() {
  const toast = useToast();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/coupons");
      const result = await response.json();

      if (result.success) {
        setCoupons(result.data);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch coupons",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast({
        title: "Error",
        description: "Failed to fetch coupons",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    onEditOpen();
  };

  const handleDeleteClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCoupon) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/coupons/${selectedCoupon.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Coupon deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onDeleteClose();
        fetchCoupons(); // Refresh the list
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete coupon",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast({
        title: "Error",
        description: "Failed to delete coupon",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      {/* Header */}
      <HStack justify="space-between" align="start">
        <Box>
          <Heading size="lg" fontWeight="600" mb={2}>
            Affiliate and Coupons
          </Heading>
          <Text fontSize="14px" color="gray.600" maxW="600px">
            Manage all content for your platform. Handle posts, drafts, media, and settings in one organized space for quick updates.
          </Text>
        </Box>
        <CustomButton
          text="Create new Coupons"
          leftIcon={<Plus size={18} />}
          colorScheme="brand"
          bg="#A70B1C"
          onClick={onCreateOpen}
          px={6}
          borderRadius="sm"
          _hover={{ bg: "#8A0916" }}
        />
      </HStack>

      {/* Content */}
      {coupons.length === 0 ? (
        <EmptyCouponState onCreateClick={onCreateOpen} />
      ) : (
        <Grid
          templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap={6}
        >
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </Grid>
      )}

      {/* Create Modal */}
      <CreateCouponModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onSuccess={fetchCoupons}
      />

      {/* Edit Modal */}
      <EditCouponModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        onSuccess={fetchCoupons}
        coupon={selectedCoupon}
      />

      {/* Delete Modal */}
      <DeleteCouponModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        coupon={selectedCoupon}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </VStack>
  );
}

