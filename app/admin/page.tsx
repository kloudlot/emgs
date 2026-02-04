"use client";
import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Heading,
  HStack,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { Users, ShoppingBag, Briefcase, PlayCircle, TrendingUp } from "lucide-react";

const STAT_CARDS = [
  { label: "Total Users", value: "300", icon: Users, color: "brand.500" },
  { label: "Total Purchase", value: "245", icon: ShoppingBag, color: "orange.500" },
  { label: "Total Services", value: "15", icon: Briefcase, color: "blue.500" },
  { label: "Active Class", value: "24", icon: PlayCircle, color: "green.500" },
];

const AdminPage = () => {
  return (
    <VStack spacing={8} align="stretch">
      {/* Stat Cards */}
      <SimpleGrid columns={[1, 2, 4]} spacing={6}>
        {STAT_CARDS.map((stat) => (
          <Box
            key={stat.label}
            bg="white"
            p={6}
            borderRadius="16px"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <HStack spacing={4}>
              <Box
                p={3}
                bg={`${stat.color.split('.')[0]}.50`}
                borderRadius="12px"
              >
                <Icon as={stat.icon} boxSize={6} color={stat.color} />
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  {stat.label}
                </Text>
                <Heading size="lg" color="gray.800">
                  {stat.value}
                </Heading>
              </VStack>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} spacing={8}>
        {/* Top Packages Purchased */}
        <Box
          bg="white"
          p={6}
          borderRadius="16px"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={6} fontSize="18px">Top Packages Purchased</Heading>
          <VStack align="stretch" spacing={4}>
            {[
              { name: "Basic IELTS Prep", count: 40, color: "red.400" },
              { name: "Advanced IELTS Prep", count: 60, color: "red.400" },
              { name: "IELTS Speaking Mastery", count: 30, color: "red.400" },
              { name: "IELTS Writing Enhancement", count: 50, color: "red.400" },
              { name: "Business English Course", count: 20, color: "red.400" },
            ].map((pkg, idx) => (
              <HStack key={idx} justify="space-between" align="center">
                <HStack spacing={4}>
                   <Box w="30px" h="30px" bg={pkg.color} borderRadius="4px" />
                   <Text fontWeight="medium" color="gray.700">{pkg.name}</Text>
                </HStack>
                <Text fontWeight="bold" color="gray.800">{pkg.count}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Top Referrals */}
        <Box
          bg="white"
          p={6}
          borderRadius="16px"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={6} fontSize="18px">Top Referrals</Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th textTransform="none" color="gray.400">User Name</Th>
                <Th isNumeric textTransform="none" color="gray.400">Total Referrals</Th>
                <Th isNumeric textTransform="none" color="gray.400">Total Points</Th>
              </Tr>
            </Thead>
            <Tbody>
               {[
                 { name: "Jamal Nnamdi", refs: 15, points: 200 },
                 { name: "Olivia Eze", refs: 12, points: 180 },
                 { name: "Victor Okoro", refs: 10, points: 150 },
                 { name: "Aisha Bello", refs: 8, points: 100 },
                 { name: "Tolu Salami", refs: 6, points: 50 },
               ].map((ref, idx) => (
                 <Tr key={idx}>
                   <Td>
                     <HStack spacing={3}>
                       <Avatar size="xs" name={ref.name} />
                       <Text fontWeight="medium">{ref.name}</Text>
                     </HStack>
                   </Td>
                   <Td isNumeric fontWeight="semibold">{ref.refs}</Td>
                   <Td isNumeric fontWeight="semibold">{ref.points}</Td>
                 </Tr>
               ))}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>

      {/* Recent Transactions */}
      <Box
        bg="white"
        p={6}
        borderRadius="16px"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.100"
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="md" fontSize="18px">Recent Transactions</Heading>
          <Text color="brand.500" fontWeight="bold" fontSize="sm" cursor="pointer">See all</Text>
        </Flex>
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th color="gray.500">Purchase ID</Th>
              <Th color="gray.500">Service Purchased</Th>
              <Th color="gray.500">User</Th>
              <Th color="gray.500">Amount</Th>
              <Th color="gray.500">Purchase date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[
              { id: "TRF123456789", service: "Basic IELTS Prep", user: "Jamal Nnamdi", amount: "N20,000", date: "14th Dec 2025" },
              { id: "TRF123456792", service: "Business English Course", user: "Olivia Eze", amount: "N28,000", date: "20th Dec 2025" },
              { id: "TRF123456794", service: "Conversational English", user: "Victor Okoro", amount: "N18,000", date: "24th Dec 2025" },
              { id: "TRF123456793", service: "Academic Writing Workshop", user: "Aisha Bello", amount: "N15,000", date: "22nd Dec 2025" },
              { id: "TRF123456795", service: "Grammar Mastery Course", user: "Tolu Salami", amount: "N12,000", date: "26th Dec 2025" },
            ].map((tx, idx) => (
              <Tr key={idx}>
                <Td fontSize="sm" color="gray.600">{tx.id}</Td>
                <Td fontSize="sm" fontWeight="medium">{tx.service}</Td>
                <Td fontSize="sm">{tx.user}</Td>
                <Td fontSize="sm" fontWeight="bold">{tx.amount}</Td>
                <Td fontSize="sm" color="gray.500">{tx.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default AdminPage;
