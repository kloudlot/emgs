import { NextResponse } from 'next/server';
import {
  getServices,
  createService,
  type CreateServiceDto,
} from '@/lib/sanity/service.service';

// GET /api/services - List all services
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const services = await getServices({
      status,
      featured,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch services',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/services - Create new service
export async function POST(req: Request) {
  try {
    const body: CreateServiceDto = await req.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.overview) {
      return NextResponse.json(
        {
          success: false,
          message: 'title, slug, and overview are required',
        },
        { status: 400 }
      );
    }

    const service = await createService(body);

    return NextResponse.json(
      {
        success: true,
        data: service,
        message: 'Service created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create service',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
