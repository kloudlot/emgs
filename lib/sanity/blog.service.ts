import { sanityClient } from './client';

export interface BlogSection {
  _key: string;
  header: string;
  body: string;
  featuredImage?: any;
}

export interface CreateBlogDto {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  publishedDate: string;
  featuredImage?: any;
  introduction: string;
  sections: BlogSection[];
  status?: 'draft' | 'published';
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {
  _id: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  tags: string[];
  publishedDate: string;
  featuredImage?: any;
  introduction: string;
  sections: BlogSection[];
  status: 'draft' | 'published';
  _createdAt: string;
  _updatedAt: string;
}

// Get all blogs
export async function getBlogs(params?: {
  status?: string;
  limit?: number;
  offset?: number;
}) {
  const { status, limit = 50, offset = 0 } = params || {};
  
  let query = '*[_type == "blog"';
  const filters: string[] = [];
  
  if (status) filters.push(`status == "${status}"`);
  
  if (filters.length > 0) {
    query += ` && ${filters.join(' && ')}`;
  }
  
  query += `] | order(_createdAt desc) [${offset}...${offset + limit}] {
    _id,
    title,
    slug,
    category,
    tags,
    publishedDate,
    featuredImage,
    introduction,
    sections[] {
      _key,
      header,
      body,
      featuredImage
    },
    status,
    _createdAt,
    _updatedAt
  }`;

  try {
    const blogs = await sanityClient.fetch(query);
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

// Get single blog by ID
export async function getBlogById(id: string) {
  const query = `*[_type == "blog" && _id == $id][0] {
    _id,
    title,
    slug,
    category,
    tags,
    publishedDate,
    featuredImage,
    introduction,
    sections[] {
      _key,
      header,
      body,
      featuredImage
    },
    status,
    _createdAt,
    _updatedAt
  }`;

  try {
    const blog = await sanityClient.fetch(query, { id });
    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
}

// Get blog by slug
export async function getBlogBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    tags,
    publishedDate,
    featuredImage,
    introduction,
    sections[] {
      _key,
      header,
      body,
      featuredImage
    },
    status,
    _createdAt,
    _updatedAt
  }`;

  try {
    const blog = await sanityClient.fetch(query, { slug });
    return blog;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
}

// Create new blog
export async function createBlog(data: CreateBlogDto) {
  try {
    const blog = await sanityClient.create({
      _type: 'blog',
      title: data.title,
      slug: {
        _type: 'slug',
        current: data.slug,
      },
      category: data.category,
      tags: data.tags,
      publishedDate: data.publishedDate,
      featuredImage: data.featuredImage,
      introduction: data.introduction,
      sections: data.sections,
      status: data.status || 'draft',
    });
    return blog;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}

// Update blog
export async function updateBlog(id: string, data: Partial<CreateBlogDto>) {
  try {
    const updateData: any = {};
    
    if (data.title) updateData.title = data.title;
    if (data.slug) updateData.slug = { _type: 'slug', current: data.slug };
    if (data.category) updateData.category = data.category;
    if (data.tags) updateData.tags = data.tags;
    if (data.publishedDate) updateData.publishedDate = data.publishedDate;
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage;
    if (data.introduction) updateData.introduction = data.introduction;
    if (data.sections) updateData.sections = data.sections;
    if (data.status) updateData.status = data.status;

    const blog = await sanityClient.patch(id).set(updateData).commit();
    return blog;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
}

// Delete blog
export async function deleteBlog(id: string) {
  try {
    await sanityClient.delete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

// Update blog status
export async function updateBlogStatus(id: string, status: 'draft' | 'published') {
  try {
    const blog = await sanityClient.patch(id).set({ status }).commit();
    return blog;
  } catch (error) {
    console.error('Error updating blog status:', error);
    throw error;
  }
}
