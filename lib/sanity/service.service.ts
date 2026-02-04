import { sanityClient } from './client';

export interface CreateServiceDto {
  title: string;
  slug: string;
  overview: string;
  whatsIncluded?: Array<{ item: string }>;
  serviceImages?: any[];
  packages?: string[];
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  category?: string;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {
  _id: string;
}

// Get all services
export async function getServices(params?: {
  status?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  const { status, featured, limit = 50, offset = 0 } = params || {};
  
  let query = '*[_type == "service"';
  const filters: string[] = [];
  
  if (status) filters.push(`status == "${status}"`);
  if (featured !== undefined) filters.push(`featured == ${featured}`);
  
  if (filters.length > 0) {
    query += ` && ${filters.join(' && ')}`;
  }
  
  query += `] | order(publishedAt desc) [${offset}...${offset + limit}] {
    _id,
    title,
    slug,
    overview,
    whatsIncluded,
    serviceImages,
    packages[]-> {
      _id,
      name,
      price,
      currency,
      packageType,
      features
    },
    status,
    featured,
    category->{
      _id,
      title,
      slug
    },
    publishedAt
  }`;
  
  return sanityClient.fetch(query);
}

// Get single service by ID
export async function getServiceById(id: string) {
  const query = `*[_type == "service" && _id == $id][0] {
    _id,
    title,
    slug,
    overview,
    whatsIncluded,
    serviceImages,
    packages[]-> {
      _id,
      name,
      price,
      currency,
      packageType,
      description,
      features,
      image,
      popular,
      active
    },
    status,
    featured,
    category->{
      _id,
      title,
      slug
    },
    publishedAt
  }`;
  
  return sanityClient.fetch(query, { id });
}

// Get service by slug
export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    overview,
    whatsIncluded,
    serviceImages,
    packages[]-> {
      _id,
      name,
      price,
      currency,
      packageType,
      description,
      features,
      image,
      popular,
      active
    },
    status,
    featured,
    category->{
      _id,
      title,
      slug
    },
    publishedAt
  }`;
  
  return sanityClient.fetch(query, { slug });
}

// Create service
export async function createService(data: CreateServiceDto) {
  return sanityClient.create({
    _type: 'service',
    title: data.title,
    slug: {
      _type: 'slug',
      current: data.slug,
    },
    overview: data.overview,
    whatsIncluded: data.whatsIncluded?.map((item) => ({
      _key: crypto.randomUUID(),
      ...item,
    })) || [],
    serviceImages: data.serviceImages?.map((img) => ({
      _key: crypto.randomUUID(),
      ...img,
    })) || [],
    packages: data.packages?.map((id) => ({
      _type: 'reference',
      _ref: id,
    })) || [],
    status: data.status || 'draft',
    featured: data.featured || false,
    ...(data.category && {
      category: {
        _type: 'reference',
        _ref: data.category,
      },
    }),
    publishedAt: data.status === 'published' ? new Date().toISOString() : undefined,
  });
}

// Update service
export async function updateService(data: UpdateServiceDto) {
  const { _id, ...updates } = data;
  
  const patch: any = {};
  
  if (updates.title) patch.title = updates.title;
  if (updates.slug) patch.slug = { _type: 'slug', current: updates.slug };
  if (updates.overview) patch.overview = updates.overview;
  if (updates.whatsIncluded) {
    patch.whatsIncluded = updates.whatsIncluded.map((item) => ({
      _key: crypto.randomUUID(),
      ...item,
    }));
  }
  if (updates.serviceImages) {
    patch.serviceImages = updates.serviceImages.map((img) => ({
      _key: crypto.randomUUID(),
      ...img,
    }));
  }
  if (updates.packages) {
    patch.packages = updates.packages.map((id) => ({
      _type: 'reference',
      _ref: id,
    }));
  }
  if (updates.status) {
    patch.status = updates.status;
    if (updates.status === 'published') {
      patch.publishedAt = new Date().toISOString();
    }
  }
  if (updates.featured !== undefined) patch.featured = updates.featured;
  if (updates.category) {
    patch.category = {
      _type: 'reference',
      _ref: updates.category,
    };
  }
  
  return sanityClient.patch(_id).set(patch).commit();
}

// Delete service
export async function deleteService(id: string) {
  return sanityClient.delete(id);
}

// Package operations
export interface CreatePackageDto {
  name: string;
  price: number;
  currency?: string;
  packageType?: 'basic' | 'standard' | 'premium';
  description?: string;
  features?: Array<{ feature: string; quantity?: string }>;
  popular?: boolean;
  active?: boolean;
}

export async function createPackage(data: CreatePackageDto) {
  return sanityClient.create({
    _type: 'package',
    name: data.name,
    slug: {
      _type: 'slug',
      current: data.name.toLowerCase().replace(/\s+/g, '-'),
    },
    price: data.price,
    currency: data.currency || 'USD',
    packageType: data.packageType || 'basic',
    description: data.description || '',
    features: data.features?.map((feature) => ({
      _key: crypto.randomUUID(),
      ...feature,
    })) || [],
    popular: data.popular || false,
    active: data.active !== undefined ? data.active : true,
  });
}

export async function getPackages() {
  const query = `*[_type == "package" && active == true] | order(price asc) {
    _id,
    name,
    slug,
    price,
    currency,
    packageType,
    description,
    features,
    image,
    popular,
    active
  }`;
  
  return sanityClient.fetch(query);
}
