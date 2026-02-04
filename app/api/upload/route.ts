import { NextResponse } from 'next/server';
import { uploadImage, uploadImages } from '@/lib/sanity/image.service';

// POST /api/upload - Upload single or multiple images
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No files provided',
        },
        { status: 400 }
      );
    }

    // Upload single or multiple files
    let result;
    if (files.length === 1) {
      result = await uploadImage(files[0]);
    } else {
      result = await uploadImages(files);
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `${files.length} image(s) uploaded successfully`,
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to upload images',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
