export interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  expire_date: string;
  use_count: number;
  maximum_use_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface CreateCouponInput {
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  expire_date: string;
  maximum_use_count: number;
  is_active?: boolean;
}

export interface UpdateCouponInput extends Partial<CreateCouponInput> {
  id: string;
}
