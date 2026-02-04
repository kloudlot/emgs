import { sanityClient } from './client';

// Upload image to Sanity
export async function uploadImage(file: File): Promise<any> {
  try {
    const asset = await sanityClient.assets.upload('image', file, {
      filename: file.name,
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Upload multiple images
export async function uploadImages(files: File[]): Promise<any[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}

// Delete image from Sanity
export async function deleteImage(assetId: string): Promise<void> {
  try {
    await sanityClient.delete(assetId);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

// Get image URL from Sanity asset
export function getImageUrl(image: any, width?: number, height?: number): string {
  if (!image?.asset?._ref) return '';
  
  const ref = image.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  
  let url = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`;
  
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('fit', 'max');
    url += `?${params.toString()}`;
  }
  
  return url;
}
