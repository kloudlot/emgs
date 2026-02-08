"use client";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Badge,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit, Copy } from "lucide-react";
import type { UserProfile } from "@/lib/types/user";
import EditProfileModal from "./edit-profile-modal";

interface UserProfileCardProps {
  profile: UserProfile;
  userEmail: string;
  onProfileUpdate: () => void;
}

export default function UserProfileCard({
  profile,
  userEmail,
  onProfileUpdate,
}: UserProfileCardProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(profile.referral_code);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Get initials from full name
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <Box
        bg="white"
        borderRadius="12px"
        overflow="hidden"
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
        position="sticky"
        top="20px"
      >
        {/* Header Background */}
        <Box
          h="120px"
          bgGradient="linear(to-br, brand.500, brand.600)"
          position="relative"
        />

        <VStack spacing={4} p={6} pt={0} align="stretch">
          {/* Avatar */}
          <Box position="relative" mt="-60px" textAlign="center">
            <Avatar
              size="2xl"
              name={profile.full_name || "User"}
              src={profile.avatar_url || undefined}
              bg="gray.800"
              color="white"
              fontSize="3xl"
              fontWeight="600"
              border="4px solid white"
            >
              {!profile.avatar_url && getInitials(profile.full_name)}
            </Avatar>
          </Box>

          {/* User Info */}
          <VStack spacing={1} textAlign="center">
            <Text fontSize="20px" fontWeight="600" color="gray.900">
              {profile.full_name || "User"}
            </Text>
            <Text fontSize="14px" color="gray.600">
              {userEmail}
            </Text>
            {profile.phone_number && (
              <Text fontSize="14px" color="gray.600">
                {profile.phone_number}
              </Text>
            )}
          </VStack>

          {/* Edit Profile Button */}
          <Button
            leftIcon={<Edit size={16} />}
            variant="outline"
            size="sm"
            onClick={onOpen}
            borderColor="brand.500"
            color="brand.500"
            _hover={{ bg: "brand.50" }}
          >
            Edit Profile
          </Button>

          {/* Copy Referral Code */}
          <Button
            leftIcon={<Copy size={16} />}
            variant="outline"
            size="sm"
            onClick={handleCopyReferralCode}
            borderColor="gray.300"
            _hover={{ bg: "gray.50" }}
          >
            Copy Referral Code
          </Button>

          {/* Class Details */}
          <Box pt={4} borderTopWidth="1px" borderColor="gray.200">
            <Text fontSize="14px" fontWeight="600" mb={3} color="gray.700">
              Class Details
            </Text>
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="13px" color="gray.600">
                  Class Status :
                </Text>
                <Badge
                  colorScheme={profile.class_status === "active" ? "green" : "gray"}
                  fontSize="11px"
                  px={2}
                  py={1}
                  borderRadius="md"
                  textTransform="capitalize"
                >
                  {profile.class_status}
                </Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="13px" color="gray.600">
                  Class Plan :
                </Text>
                <Text fontSize="13px" fontWeight="500" color="gray.900" textTransform="capitalize">
                  {profile.class_plan}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        profile={profile}
        onSuccess={onProfileUpdate}
      />
    </>
  );
}
