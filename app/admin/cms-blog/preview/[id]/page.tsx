"use client";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Badge,
  Button,
  Flex,
  Spinner,
  useToast,
  Divider,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Tag,
  FolderOpen,
} from "lucide-react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/sanity/image.service";
import BackButton from "@/components/back-button";

interface BlogSection {
  _key: string;
  header: string;
  body: string;
  featuredImage?: any;
}

interface Blog {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  publishedDate: string;
  featuredImage?: any;
  introduction: string;
  sections: BlogSection[];
  status: string;
  _createdAt: string;
}

export default function PreviewBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${id}`);
      const result = await response.json();

      if (result.success && result.data) {
        setBlog(result.data);
      } else {
        toast({
          title: "Error",
          description: "Blog not found",
          status: "error",
          duration: 3000,
        });
        router.push("/admin/cms-blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blog data",
        status: "error",
        duration: 3000,
      });
      router.push("/admin/cms-blog");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "exam-certification-prep": "Exam & Certification Prep",
      "career-development": "Career Development",
      "study-tips": "Study Tips",
      "technology": "Technology",
      "general": "General",
    };
    return categoryMap[category] || category;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <VStack align="stretch" spacing={8}>
      {/* Header Actions */}
      <HStack justify="space-between">
        <BackButton />
        <Button
          leftIcon={<Edit size={18} />}
          colorScheme="brand"
          onClick={() => router.push(`/admin/cms-blog/edit/${id}`)}
          size="sm"
          borderRadius={"sm"}
          px={4}
        >
          Edit Blog
        </Button>
      </HStack>

      {/* Blog Content */}
      <Box bg="white" p={8} borderRadius="16px" border="1px solid" borderColor="gray.100">
        {/* Title */}
        <Heading size="xl" mb={4} color="#1a1a1a">
          {blog.title}
        </Heading>

        {/* Meta Information */}
        <HStack spacing={6} mb={6} flexWrap="wrap">
          <HStack spacing={2}>
            <FolderOpen size={18} color="#718096" />
            <Text fontSize="sm" color="gray.600">
              {getCategoryLabel(blog.category)}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Calendar size={18} color="#718096" />
            <Text fontSize="sm" color="gray.600">
              {formatDate(blog.publishedDate)}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Tag size={18} color="#718096" />
            <HStack spacing={2}>
              {blog.tags.map((tag, index) => (
                <Badge
                  key={index}
                  colorScheme="gray"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                >
                  {tag}
                </Badge>
              ))}
            </HStack>
          </HStack>
          <Badge
            colorScheme={blog.status === "published" ? "green" : "yellow"}
            px={4}
            py={1}
            borderRadius="full"
            textTransform="capitalize"
          >
            {blog.status}
          </Badge>
        </HStack>

        <Divider mb={6} />

        {/* Featured Image */}
        {blog.featuredImage && (
          <Box mb={8} borderRadius="12px" overflow="hidden">
            <Image
              src={getImageUrl(blog.featuredImage, 800)}
              alt={blog.title}
              w="full"
              maxH="500px"
              objectFit="cover"
            />
          </Box>
        )}

        {/* Introduction */}
        <Box mb={8}>
          <Heading size="md" mb={4} color="#1a1a1a">
            Introduction
          </Heading>
          <Text fontSize="md" color="gray.700" lineHeight="1.8" whiteSpace="pre-wrap">
            {blog.introduction}
          </Text>
        </Box>

        {/* Sections */}
        {blog.sections && blog.sections.length > 0 && (
          <VStack align="stretch" spacing={8}>
            {blog.sections.map((section, index) => (
              <Box key={section._key}>
                <Heading size="md" mb={4} color="#1a1a1a">
                  {section.header}
                </Heading>
                <Text fontSize="md" color="gray.700" lineHeight="1.8" mb={4} whiteSpace="pre-wrap">
                  {section.body}
                </Text>
                {section.featuredImage && (
                  <Box borderRadius="12px" overflow="hidden" mt={4}>
                    <Image
                      src={getImageUrl(section.featuredImage, 700)}
                      alt={section.header}
                      w="full"
                      maxH="400px"
                      objectFit="cover"
                    />
                  </Box>
                )}
                {index < blog.sections.length - 1 && <Divider mt={8} />}
              </Box>
            ))}
          </VStack>
        )}
      </Box>

    </VStack>
  );
}
