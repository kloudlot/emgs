import { NextResponse } from 'next/server';
import { createPost } from '@/lib/sanity/post.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { message: 'title and slug are required' },
        { status: 400 }
      );
    }

    const post = await createPost(body);

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Failed to create post' },
      { status: 500 }
    );
  }
}
