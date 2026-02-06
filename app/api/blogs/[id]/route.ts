import { NextRequest, NextResponse } from 'next/server';
import { getBlogById, updateBlog, deleteBlog } from '@/lib/sanity/blog.service';
import { uploadImage } from '@/lib/sanity/image.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await getBlogById(params.id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    console.error('Error in GET /api/blogs/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch blog',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Handle featured image upload if it's a new file
    let featuredImage = body.featuredImage;
    if (body.featuredImage && typeof body.featuredImage === 'object' && body.featuredImage.file) {
      featuredImage = await uploadImage(body.featuredImage.file);
    }

    // Handle section images upload
    let processedSections = body.sections;
    if (body.sections) {
      processedSections = await Promise.all(
        body.sections.map(async (section: any) => {
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
    }

    const updateData: any = { ...body };
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
    if (processedSections !== undefined) updateData.sections = processedSections;

    const blog = await updateBlog(params.id, updateData);

    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog updated successfully',
    });
  } catch (error: any) {
    console.error('Error in PATCH /api/blogs/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update blog',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteBlog(params.id);

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error: any) {
    console.error('Error in DELETE /api/blogs/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to delete blog',
      },
      { status: 500 }
    );
  }
}
