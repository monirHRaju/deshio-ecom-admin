// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "super-admin";
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: string | Category;
  createdAt: string;
  updatedAt: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  _id: string;
  title: string;
  description: string;
  brand?: string;
  price: number;
  discount: number;         // 0-100 percentage
  stock: number;
  category: string | Category;
  images: string[];
  tags: string[];
  specifications: Record<string, string>; // Map<string,string> serialised
  rating: number;
  reviewCount: number;
  sold: number;
  isFeatured: boolean;
  createdBy?: string | User;
  createdAt: string;
  updatedAt: string;
}

// ─── Order ───────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface OrderItem {
  productId: string | Product;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  street?: string;
  city?: string;
  country?: string;
  zip?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string | User;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  couponCode?: string;
  couponDiscount: number;
  deliveryCharge: number;
  deliveryZoneId?: string;
  orderNote?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  _id: string;
  user: string | User;
  product: string | Product;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Coupon ──────────────────────────────────────────────────────────────────

export type CouponType = "percentage" | "fixed";

export interface Coupon {
  _id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount?: number;
  maxUsage?: number;
  usageCount: number;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Delivery Zone ───────────────────────────────────────────────────────────

export interface DeliveryZone {
  _id: string;
  name: string;
  countries: string[];
  shippingFee: number;
  estimatedDays: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueGrowth?: number;
  ordersGrowth?: number;
  productsGrowth?: number;
  usersGrowth?: number;
}

export interface MonthlyDataPoint {
  _id: { year: number; month: number };
  orders: number;
  revenue: number;
}

export interface TopProduct {
  _id: string;
  title: string;
  sold: number;
  rating: number;
  images: string[];
}

export interface TopCategory {
  _id: string;
  name: string;
  count: number;
}

export interface DashboardChartData {
  monthlyData: MonthlyDataPoint[];
  ordersByStatus: { _id: string; count: number }[];
  topProducts: TopProduct[];
  topCategories: TopCategory[];
}

// ─── API Response ────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
