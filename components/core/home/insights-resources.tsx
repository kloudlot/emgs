"use client";
import CustomButton from "@/components/custom-button";
import {
  Box,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import React from "react";

interface Post {
  title: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
}

const blogPosts: Post[] = [
  {
    title: "How to Prepare for International Exams: A Step-by-Step Guide",
    category: "Exam & Certification Prep",
    author: "Aanya Patel",
    authorAvatar: "https://bit.ly/tioluwani-kolawole",
    date: "28th feb, 2025",
    readTime: "4 min read",
    excerpt:
      "A clear, practical breakdown of how candidates can prepare for IELTS, CBT, NCLEX, or other international exams, including study strategies, timelines, and common mistakes to avoid.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Top Countries to Study Abroad in 2025 — And How to Get In",
    category: "Study Abroad",
    author: "Rishi Varma",
    authorAvatar: "https://bit.ly/sage-adebayo",
    date: "25th feb, 2025",
    readTime: "3 min read",
    excerpt:
      "An overview of the best destinations for students (UK, Canada, Australia, Ireland, Germany), what each country offers, admission requirements, and tips for securing scholarships.",
    image:
      "https://images.unsplash.com/photo-1523050338692-7b835a07973f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "How to Build a CV That Gets You Global Opportunities",
    category: "Career & Job",
    author: "Zara Mehra",
    authorAvatar: "https://bit.ly/zara-mehra",
    date: "23rd feb, 2025",
    readTime: "8 min read",
    excerpt:
      "A guide on crafting an international-standard CV, optimizing LinkedIn, highlighting global competencies, and improving employability for overseas roles.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
  },
];

const BlogPostCard = ({ post }: { post: Post }) => {
  return (
    <VStack align="stretch" spacing={4} data-group>
      <Box
        borderRadius="24px"
        overflow="hidden"
        height="240px"
        width="full"
        position="relative"
      >
        <Image
          src={post.image}
          alt={post.title}
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.5s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
      </Box>

      <VStack align="flex-start" spacing={3}>
        <Badge
          bg="brand.500"
          color="white"
          px={4}
          py={1.5}
          borderRadius="full"
          fontSize="12px"
          fontWeight="bold"
          textTransform="none"
        >
          {post.category}
        </Badge>
        <Heading
          fontSize="22px"
          fontWeight="700"
          lineHeight="1.3"
          _hover={{ color: "brand.500" }}
          cursor="pointer"
        >
          {post.title}
        </Heading>
        <HStack spacing={3} color="#7C7C7C" fontSize="14px">
          <HStack spacing={2}>
            <Avatar size="xs" src={post.authorAvatar} name={post.author} />
            <Text>{post.author}</Text>
          </HStack>
          <Text>•</Text>
          <Text>{post.date}</Text>
          <Text>•</Text>
          <Text>{post.readTime}</Text>
        </HStack>
        <Text color="#7C7C7C" fontSize="16px" lineHeight="1.6" noOfLines={3}>
          {post.excerpt}
        </Text>
      </VStack>
    </VStack>
  );
};

const InsightsResources = () => {
  return (
    <VStack spacing={16} align="stretch">
      <VStack spacing={4} textAlign="center">
        <Heading fontSize={["40px", "52px"]} fontWeight="800">
          Insights & Resources
        </Heading>
        <Text color="#7C7C7C" fontSize="lg" maxW="600px">
          Stay informed with expert tips, career insights, study abroad guides,
          and updates on global opportunities.
        </Text>
      </VStack>
      {/* blog posts */}
      <SimpleGrid columns={[1, 1, 3]} spacing={10}>
        {blogPosts.map((post, idx) => (
          <BlogPostCard key={idx} post={post} />
        ))}
      </SimpleGrid>

      {/* cta */}
      <Box display="flex" justifyContent="center">
        <CustomButton  text="View more post" onClick={() => {}} />
      </Box>
    </VStack>
  );
};

export default InsightsResources;
