"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Coupon } from "@/lib/types/coupon";

interface DeleteCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: Coupon | null;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function DeleteCouponModal({
  isOpen,
  onClose,
  coupon,
  onConfirm,
  isDeleting,
}: DeleteCouponModalProps) {
  if (!coupon) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent borderRadius="16px" maxW="400px">
        <ModalHeader pt={8} pb={0}>
          <VStack spacing={4}>
            <Box
              p={4}
              bg="red.50"
              borderRadius="full"
            >
              <AlertTriangle size={32} color="#E53E3E" />
            </Box>
          </VStack>
        </ModalHeader>

        <ModalBody py={6}>
          <VStack spacing={2} textAlign="center">
            <Text fontSize="16px" fontWeight="600" color="#1a1a1a">
              The Coupon{" "}
              <Text as="span" color="#A70B1C" fontWeight="700">
                {coupon.code}
              </Text>{" "}
              is {coupon.is_active ? "Active" : "not Active"}
            </Text>
            <Text fontSize="14px" color="gray.600">
              Are you sure you want to delete this coupon? This action cannot be undone.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter gap={3} pb={6}>
          <Button
            variant="ghost"
            onClick={onClose}
            isDisabled={isDeleting}
            flex={1}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            bg="#E53E3E"
            onClick={onConfirm}
            isLoading={isDeleting}
            loadingText="Deleting..."
            leftIcon={<Trash2 size={16} />}
            flex={1}
            _hover={{ bg: "#C53030" }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
