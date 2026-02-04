import { sanityClient } from './client';

export interface CreatePostDto {
  title: string;
  slug: string;
  body?: any;
}

export async function createPost(data: CreatePostDto) {
  return sanityClient.create({
    _type: 'post',
    title: data.title,
    slug: {
      _type: 'slug',
      current: data.slug,
    },
    body: data.body ?? [],
    publishedAt: new Date().toISOString(),
  });
}
