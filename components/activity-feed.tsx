"use client";
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Plus, Users, ShoppingCart } from "lucide-react";
import type { Activity } from "@/lib/types/user";
import { format } from "date-fns";

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
}

export default function ActivityFeed({
  activities,
  loading = false,
}: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "points_added":
        return Plus;
      case "referral_joined":
        return Users;
      case "service_purchased":
        return ShoppingCart;
      default:
        return Plus;
    }
  };

  const getActivityIconBg = (type: string) => {
    switch (type) {
      case "points_added":
        return "gray.800";
      case "referral_joined":
        return "gray.800";
      case "service_purchased":
        return "gray.800";
      default:
        return "gray.800";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Box
        bg="white"
        borderRadius="12px"
        p={8}
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" color="brand.500" />
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      borderRadius="12px"
      overflow="hidden"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Box p={6} borderBottomWidth="1px" borderColor="gray.200">
        <Text fontSize="18px" fontWeight="600" color="gray.900">
          Activity
        </Text>
      </Box>

      {activities.length === 0 ? (
        <Box p={8} textAlign="center">
          <Text color="gray.500">No activities yet</Text>
        </Box>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th
                  fontSize="12px"
                  fontWeight="600"
                  color="gray.700"
                  textTransform="none"
                  letterSpacing="normal"
                >
                  Activity
                </Th>
                <Th
                  fontSize="12px"
                  fontWeight="600"
                  color="gray.700"
                  textTransform="none"
                  letterSpacing="normal"
                  textAlign="right"
                >
                  Date
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {activities.map((activity) => {
                const IconComponent = getActivityIcon(activity.activity_type);
                const iconBg = getActivityIconBg(activity.activity_type);

                return (
                  <Tr key={activity.id} _hover={{ bg: "gray.50" }}>
                    <Td py={4}>
                      <HStack spacing={3}>
                        {/* Activity Icon or User Avatar */}
                        {activity.related_user_name ? (
                          <Avatar
                            size="sm"
                            name={activity.related_user_name}
                            bg="gray.800"
                            color="white"
                            fontSize="sm"
                          />
                        ) : (
                          <Box
                            bg={iconBg}
                            w="40px"
                            h="40px"
                            borderRadius="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <IconComponent size={20} color="white" />
                          </Box>
                        )}

                        {/* Activity Description */}
                        <VStack align="start" spacing={0}>
                          {activity.related_user_name && (
                            <Text fontSize="14px" fontWeight="500" color="gray.900">
                              {activity.related_user_name}
                            </Text>
                          )}
                          <Text
                            fontSize="14px"
                            color={activity.related_user_name ? "gray.600" : "gray.900"}
                          >
                            {activity.description}
                          </Text>
                        </VStack>

                        {/* Points Badge */}
                        {activity.points_delta !== 0 && (
                          <Badge
                            colorScheme={activity.points_delta > 0 ? "green" : "red"}
                            fontSize="12px"
                            px={2}
                            py={1}
                            borderRadius="md"
                            ml="auto"
                          >
                            {activity.points_delta > 0 ? "+" : ""}
                            {activity.points_delta}
                          </Badge>
                        )}
                      </HStack>
                    </Td>
                    <Td py={4} textAlign="right">
                      <Text fontSize="14px" color="gray.600">
                        {formatDate(activity.created_at)}
                      </Text>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
