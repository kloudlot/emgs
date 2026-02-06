"use client";
import {
  Box,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  IconButton,
  Image,
  Text,
  useToast,
  Flex,
  Grid,
  Heading,
  Spinner,
  GridItem,
} from "@chakra-ui/react";
import { ArrowLeft, Plus, X, CloudUpload } from "lucide-react";
import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom-button";
import { getImageUrl } from "@/lib/sanity/image.service";
import BackButton from "@/components/back-button";

interface BlogSection {
  _key: string;
  header: string;
  body: string;
  featuredImage?: any;
}

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingBlog, setFetchingBlog] = useState(true);
  const featuredImageInputRef = useRef<HTMLInputElement>(null);
  const sectionImageInputRefs = useRef<{
    [key: string]: HTMLInputElement | null;
  }>({});

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    publishedDate: "",
    introduction: "",
  });

  const [featuredImage, setFeaturedImage] = useState<any>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>("");
  const [existingFeaturedImage, setExistingFeaturedImage] = useState<any>(null);
  const [sections, setSections] = useState<BlogSection[]>([
    { _key: "section-1", header: "", body: "", featuredImage: null },
  ]);

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  const fetchBlogData = async () => {
    try {
      setFetchingBlog(true);
      const response = await fetch(`/api/blogs/${id}`);
      const result = await response.json();

      if (result.success && result.data) {
        const blog = result.data;

        // Set form data
        setFormData({
          title: blog.title || "",
          category: blog.category || "",
          tags: blog.tags?.join(", ") || "",
          publishedDate: blog.publishedDate
            ? blog.publishedDate.split("T")[0]
            : "",
          introduction: blog.introduction || "",
        });

        // Set featured image
        if (blog.featuredImage) {
          setExistingFeaturedImage(blog.featuredImage);
          setFeaturedImagePreview(getImageUrl(blog.featuredImage, 400));
        }

        // Set sections
        if (blog.sections && blog.sections.length > 0) {
          const formattedSections = blog.sections.map((section: any) => ({
            _key: section._key || `section-${Date.now()}-${Math.random()}`,
            header: section.header || "",
            body: section.body || "",
            featuredImage: section.featuredImage
              ? {
                  existing: section.featuredImage,
                  preview: getImageUrl(section.featuredImage, 300),
                }
              : null,
          }));
          setSections(formattedSections);
        }
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
      setFetchingBlog(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturedImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      setExistingFeaturedImage(null); // Clear existing image when uploading new one
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
    setFeaturedImagePreview("");
    setExistingFeaturedImage(null);
    if (featuredImageInputRef.current) {
      featuredImageInputRef.current.value = "";
    }
  };

  const handleAddSection = () => {
    const newSection: BlogSection = {
      _key: `section-${Date.now()}`,
      header: "",
      body: "",
      featuredImage: null,
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
    }
  };

  const handleSectionChange = (
    index: number,
    field: "header" | "body",
    value: string,
  ) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleSectionImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updated = [...sections];
      const reader = new FileReader();
      reader.onloadend = () => {
        updated[index].featuredImage = {
          file,
          preview: reader.result as string,
        };
        setSections(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSectionImage = (index: number) => {
    const updated = [...sections];
    updated[index].featuredImage = null;
    setSections(updated);
    const inputRef = sectionImageInputRefs.current[sections[index]._key];
    if (inputRef) {
      inputRef.value = "";
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.title ||
      !formData.category ||
      !formData.tags ||
      !formData.publishedDate ||
      !formData.introduction
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      // Handle featured image upload
      let uploadedFeaturedImage = existingFeaturedImage;
      if (featuredImage) {
        const formData = new FormData();
        formData.append("files", featuredImage);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadResult = await uploadResponse.json();
        if (uploadResult.success) {
          uploadedFeaturedImage = uploadResult.data;
        }
      }

      // Upload section images
      const processedSections = await Promise.all(
        sections.map(async (section) => {
          let sectionImage = section.featuredImage?.existing || null;

          // If there's a new file to upload
          if (section.featuredImage?.file) {
            const formData = new FormData();
            formData.append("files", section.featuredImage.file);
            const uploadResponse = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });
            const uploadResult = await uploadResponse.json();
            if (uploadResult.success) {
              sectionImage = uploadResult.data;
            }
          }

          return {
            _key: section._key,
            header: section.header,
            body: section.body,
            featuredImage: sectionImage,
          };
        }),
      );

      const slug = formData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const blogData = {
        title: formData.title,
        slug,
        category: formData.category,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        publishedDate: formData.publishedDate,
        featuredImage: uploadedFeaturedImage,
        introduction: formData.introduction,
        sections: processedSections,
        status: "published",
      };

      const response = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Blog post updated successfully",
          status: "success",
          duration: 3000,
        });
        router.push("/admin/cms-blog");
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update blog post",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingBlog) {
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
          Update Blog Post
        </Heading>
      </HStack>

      <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={6}>
        <GridItem>
          <VStack align="stretch" spacing={6}>
            {/* Title */}
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Title
              </FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="How to Prepare for International Exams: A Step-by-Step Guide"
                bg="white"
                borderColor="gray.200"
              />
            </FormControl>

            {/* Category */}
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Category
              </FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Select category"
                bg="white"
                borderColor="gray.200"
              >
                <option value="exam-certification-prep">
                  Exam & Certification Prep
                </option>
                <option value="career-development">Career Development</option>
                <option value="study-tips">Study Tips</option>
                <option value="technology">Technology</option>
                <option value="general">General</option>
              </Select>
            </FormControl>

            {/* Tags */}
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Tags
              </FormLabel>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="how, exam, preparation (comma separated)"
                bg="white"
                borderColor="gray.200"
              />
            </FormControl>

            {/* Published Date */}
            <FormControl isRequired>
              <FormLabel fontSize="14px" fontWeight="600">
                Published date
              </FormLabel>
              <Input
                name="publishedDate"
                type="date"
                value={formData.publishedDate}
                onChange={handleInputChange}
                bg="white"
                borderColor="gray.200"
              />
            </FormControl>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align="stretch" spacing={4}>
            <FormControl>
              <FormLabel fontSize="14px" fontWeight="600">
                Featured Image
              </FormLabel>
              <Box
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="8px"
                p={6}
                textAlign="center"
                bg="gray.50"
                position="relative"
                minH="300px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {featuredImagePreview ? (
                  <>
                    <Image
                      src={featuredImagePreview}
                      alt="Featured preview"
                      maxH="280px"
                      objectFit="cover"
                      borderRadius="4px"
                    />
                    <IconButton
                      aria-label="Remove image"
                      icon={<X size={16} />}
                      size="sm"
                      position="absolute"
                      top={2}
                      right={2}
                      borderRadius="full"
                      bg="red.500"
                      color="white"
                      onClick={removeFeaturedImage}
                      _hover={{ bg: "red.600" }}
                    />
                  </>
                ) : (
                  <>
                    <CloudUpload size={48} color="#A0AEC0" />
                    <Text fontSize="14px" color="gray.500" mt={3}>
                      Upload your media here
                    </Text>
                    <Text fontSize="12px" color="gray.400">
                      jpeg,png
                    </Text>
                    <Button
                      size="md"
                      mt={4}
                      bg="#A70B1C"
                      color="white"
                      _hover={{ bg: "#8A0916" }}
                      onClick={() => featuredImageInputRef.current?.click()}
                    >
                      Browse
                    </Button>
                  </>
                )}
                <input
                  ref={featuredImageInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFeaturedImageUpload}
                />
              </Box>
            </FormControl>
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          {/* Blog Introduction */}
          <FormControl isRequired>
            <FormLabel fontSize="14px" fontWeight="600">
              Blog Introduction
            </FormLabel>
            <Textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="Enter blog introduction..."
              bg="white"
              borderColor="gray.200"
              minH="150px"
            />
          </FormControl>
        </GridItem>
      </Grid>

      {/* Left Column - Form Fields */}
      <VStack align="stretch" spacing={6}>
        {/* Sections */}
        {sections.map((section, index) => (
          <Box key={section._key} bg="white">
            <HStack
              justify="space-between"
              mb={4}
              borderBottom="1px solid"
              borderColor="gray.200"
              pb={4}
            >
              <Heading size="sm" fontWeight="600">
                Section {index + 1}
              </Heading>
              {sections.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleRemoveSection(index)}
                >
                  Remove
                </Button>
              )}
            </HStack>

            <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={4}>
              <VStack align="stretch" spacing={4}>
                {/* Section Header */}
                <FormControl isRequired>
                  <FormLabel fontSize="14px" fontWeight="600">
                    Header
                  </FormLabel>
                  <Input
                    value={section.header}
                    onChange={(e) =>
                      handleSectionChange(index, "header", e.target.value)
                    }
                    placeholder="How to Write a professional CV"
                    bg="white"
                    borderColor="gray.200"
                  />
                </FormControl>

                {/* Section Body */}
                <FormControl isRequired>
                  <FormLabel fontSize="14px" fontWeight="600">
                    Body
                  </FormLabel>
                  <Textarea
                    value={section.body}
                    onChange={(e) =>
                      handleSectionChange(index, "body", e.target.value)
                    }
                    placeholder="Enter section content..."
                    bg="white"
                    borderColor="gray.200"
                    minH="120px"
                  />
                </FormControl>
              </VStack>

              {/* Section Featured Image */}
              <FormControl>
                <FormLabel fontSize="14px" fontWeight="600">
                  Featured Image
                </FormLabel>
                <Box
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="8px"
                  p={4}
                  textAlign="center"
                  bg="gray.50"
                  position="relative"
                  minH="200px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  {section.featuredImage?.preview ? (
                    <>
                      <Image
                        src={section.featuredImage.preview}
                        alt="Section preview"
                        maxH="180px"
                        objectFit="cover"
                        borderRadius="4px"
                      />
                      <IconButton
                        aria-label="Remove image"
                        icon={<X size={16} />}
                        size="sm"
                        position="absolute"
                        top={2}
                        right={2}
                        borderRadius="full"
                        bg="red.500"
                        color="white"
                        onClick={() => removeSectionImage(index)}
                        _hover={{ bg: "red.600" }}
                      />
                    </>
                  ) : (
                    <>
                      <CloudUpload size={32} color="#A0AEC0" />
                      <Text fontSize="12px" color="gray.500" mt={2}>
                        Upload your media here
                      </Text>
                      <Text fontSize="11px" color="gray.400">
                        jpeg,png
                      </Text>
                      <Button
                        size="sm"
                        mt={3}
                        bg="#A70B1C"
                        color="white"
                        _hover={{ bg: "#8A0916" }}
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e: any) =>
                            handleSectionImageUpload(index, e);
                          input.click();
                        }}
                      >
                        Browse
                      </Button>
                    </>
                  )}
                  <input
                    ref={(el) => {
                      sectionImageInputRefs.current[section._key] = el;
                    }}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleSectionImageUpload(index, e)}
                  />
                </Box>
              </FormControl>
            </Grid>
          </Box>
        ))}
      </VStack>

      {/* Publish Button */}
      <Flex justify="flex-start" mt={0} gap={4}>
        <CustomButton
          onClick={handleAddSection}
          px={6}
          borderRadius={"sm"}
          text="Add new section"
          rightIcon={<Plus size={18} />}
          variant="outline"
          borderColor="#A70B1C"
          color="#A70B1C"
        />
        <CustomButton
          colorScheme="brand"
          onClick={handleSubmit}
          isLoading={loading}
          px={12}
          borderRadius={"sm"}
          text="Publish"
        />
      </Flex>
    </VStack>
  );
}
