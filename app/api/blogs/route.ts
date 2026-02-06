import { NextRequest, NextResponse } from 'next/server';
import { getBlogs, createBlog } from '@/lib/sanity/blog.service';
import { uploadImage } from '@/lib/sanity/image.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

    const blogs = await getBlogs({ status, limit, offset });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch blogs',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.category || !body.tags || !body.publishedDate || !body.introduction) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Handle featured image upload if it's a file
    let featuredImage = body.featuredImage;
    if (body.featuredImage && typeof body.featuredImage === 'object' && body.featuredImage.file) {
      featuredImage = await uploadImage(body.featuredImage.file);
    }

    // Handle section images upload
    const sections = body.sections || [];
    const processedSections = await Promise.all(
      sections.map(async (section: any) => {
        let sectionImage = section.featuredImage;
        if (section.featuredImage && typeof section.featuredImage === 'object' && section.featuredImage.file) {
          sectionImage = await uploadImage(section.featuredImage.file);
        }
        return {
          ...section,
          featuredImage: sectionImage,
        };
      })
    );

    const blogData = {
      title: body.title,
      slug: body.slug,
      category: body.category,
      tags: body.tags,
      publishedDate: body.publishedDate,
      featuredImage,
      introduction: body.introduction,
      sections: processedSections,
      status: body.status || 'draft',
    };

    const blog = await createBlog(blogData);

    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog created successfully',
    });
  } catch (error: any) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to create blog',
      },
      { status: 500 }
    );
  }
}
