import { NextResponse } from 'next/server';
import {
  getServiceById,
  updateService,
  deleteService,
  type UpdateServiceDto,
} from '@/lib/sanity/service.service';

// GET /api/services/[id] - Get single service
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await getServiceById(params.id);

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: 'Service not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch service',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update service
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: Partial<UpdateServiceDto> = await req.json();

    const service = await updateService({
      _id: params.id,
      ...body,
    });

    return NextResponse.json({
      success: true,
      data: service,
      message: 'Service updated successfully',
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update service',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/services/[id] - Update service status (publish/unpublish)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: { status: 'draft' | 'published' | 'archived' } = await req.json();

    if (!body.status) {
      return NextResponse.json(
        {
          success: false,
          message: 'Status is required',
        },
        { status: 400 }
      );
    }

    const service = await updateService({
      _id: params.id,
      status: body.status,
    });

    return NextResponse.json({
      success: true,
      data: service,
      message: `Service ${body.status === 'published' ? 'published' : 'unpublished'} successfully`,
    });
  } catch (error) {
    console.error('Error updating service status:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update service status',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete service
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteService(params.id);

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete service',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
