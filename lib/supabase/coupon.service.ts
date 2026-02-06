import { createClient } from "./server";
import { Coupon, CreateCouponInput, UpdateCouponInput } from "../types/coupon";

/**
 * Get all coupons
 */
export async function getCoupons(): Promise<Coupon[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching coupons:", error);
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Get a single coupon by ID
 */
export async function getCouponById(id: string): Promise<Coupon | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching coupon:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get a coupon by code
 */
export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("Error fetching coupon by code:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Create a new coupon
 */
export async function createCoupon(
  input: CreateCouponInput
): Promise<Coupon> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const couponData = {
    code: input.code.toUpperCase(),
    discount_type: input.discount_type,
    discount_value: input.discount_value,
    expire_date: input.expire_date,
    maximum_use_count: input.maximum_use_count,
    is_active: input.is_active ?? true,
    created_by: user?.id,
  };

  const { data, error } = await supabase
    .from("coupons")
    .insert(couponData)
    .select()
    .single();

  if (error) {
    console.error("Error creating coupon:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update an existing coupon
 */
export async function updateCoupon(
  id: string,
  input: Partial<CreateCouponInput>
): Promise<Coupon> {
  const supabase = await createClient();

  const updateData: any = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  // Uppercase the code if provided
  if (input.code) {
    updateData.code = input.code.toUpperCase();
  }

  const { data, error } = await supabase
    .from("coupons")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating coupon:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Delete a coupon
 */
export async function deleteCoupon(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("coupons").delete().eq("id", id);

  if (error) {
    console.error("Error deleting coupon:", error);
    throw new Error(error.message);
  }
}

/**
 * Increment the use count of a coupon
 */
export async function incrementUseCount(id: string): Promise<Coupon> {
  const supabase = await createClient();

  // Get current coupon
  const coupon = await getCouponById(id);
  if (!coupon) {
    throw new Error("Coupon not found");
  }

  // Check if coupon can still be used
  if (coupon.use_count >= coupon.maximum_use_count) {
    throw new Error("Coupon has reached maximum use count");
  }

  // Increment use count
  const { data, error } = await supabase
    .from("coupons")
    .update({
      use_count: coupon.use_count + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error incrementing use count:", error);
    throw new Error(error.message);
  }

  return data;
}
