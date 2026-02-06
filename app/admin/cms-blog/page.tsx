"use client";
import {
  Box,
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useToast,
  Spinner,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/page-title";
import CustomButton from "@/components/custom-button";

interface Blog {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  status: string;
  _createdAt: string;
}

export default function CMSBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blogs");
      const result = await response.json();

      if (result.success) {
        setBlogs(result.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch blogs",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Blog deleted successfully",
          status: "success",
          duration: 3000,
        });
        fetchBlogs();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete blog",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog",
        status: "error",
        duration: 3000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "#09C353";
      case "draft":
        return "#F3D020";
      default:
        return "gray";
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
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <VStack align="stretch" spacing={6}>
      <PageTitle>
        <PageTitle.Left>
          <PageTitle.Header
            title="Manage Blog Section"
            description="Manage all content for your platform. Handle posts, drafts, media, and settings in one organized space for quick updates."
          />
        </PageTitle.Left>
        <PageTitle.Right>
          <CustomButton
            colorScheme="brand"
            onClick={() => router.push("/admin/cms-blog/create")}
            px={6}
            borderRadius={"sm"}
            text="Create New Post"
            leftIcon={<Plus size={18} />}
          />
        </PageTitle.Right>
      </PageTitle>

      {loading ? (
        <Flex justify="center" align="center" minH="400px">
          <Spinner size="xl" color="brand.500" />
        </Flex>
      ) : blogs.length === 0 ? (
        <Box
          p={12}
          bg="white"
          borderRadius="16px"
          border="1px solid"
          borderColor="gray.100"
          textAlign="center"
        >
          <Text color="gray.500" fontSize="lg" mb={4}>
            No blog posts found
          </Text>
          <Button
            leftIcon={<Plus size={20} />}
            colorScheme="red"
            onClick={() => router.push("/admin/cms-blog/create")}
          >
            Create Your First Blog Post
          </Button>
        </Box>
      ) : (
        <Box bg="white" pt={6} overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr textTransform={"none"}>
                <Th textTransform={"none"}>Title</Th>
                <Th textTransform={"none"}>Category</Th>
                <Th textTransform={"none"}>Tags</Th>
                <Th textTransform={"none"} textAlign={"center"}>
                  Status
                </Th>
                <Th textTransform={"none"}>Date Created</Th>
                <Th textTransform={"none"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs.map((blog) => (
                <Tr key={blog._id}>
                  <Td>{blog.title}</Td>
                  <Td>{getCategoryLabel(blog.category)}</Td>
                  <Td>{blog.tags.join(", ")}</Td>
                  <Td textAlign={"center"}>
                    <Badge
                      bg={getStatusColor(blog.status)}
                      py={2}
                      px={6}
                      borderRadius={"full"}
                      color={"#fff"}
                      textTransform={"capitalize"}
                    >
                      {blog.status === "published" ? "Publish" : "Draft"}
                    </Badge>
                  </Td>
                  <Td>{formatDate(blog._createdAt)}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Actions"
                        icon={<MoreVertical size={18} />}
                        borderRadius={"full"}
                        w={"40px"}
                        h={"40px"}
                      />
                      <MenuList px={2}>
                        <MenuItem
                          icon={<Eye size={16} />}
                          onClick={() =>
                            router.push(`/admin/cms-blog/preview/${blog._id}`)
                          }
                          bg={"#fafaff"}
                          mb={2}
                          color={"#7d7d80"}
                          fontSize={"13px"}
                        >
                          Preview blog
                        </MenuItem>
                        <MenuItem
                          icon={<Edit size={16} />}
                          onClick={() =>
                            router.push(`/admin/cms-blog/edit/${blog._id}`)
                          }
                          bg={"#fafaff"}
                          mb={2}
                          color={"#7d7d80"}
                          fontSize={"13px"}
                        >
                          Edit Blog
                        </MenuItem>
                        <MenuItem
                          icon={<Trash2 size={16} />}
                          onClick={() => handleDelete(blog._id)}
                          bg={"#fafaff"}
                          mb={2}
                          fontSize={"13px"}
                          color="#ff0000"
                        >
                          Delete Blog
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </VStack>
  );
}
