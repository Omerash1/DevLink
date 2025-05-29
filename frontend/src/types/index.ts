// User types
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  token: string;
}

// Link types
export interface Link {
  _id?: string;
  id?: string;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  isFavorite: boolean;
  user?: string;
  createdAt: string;
  updatedAt: string;
  lastVisited?: string;
}

export interface LinkParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  favorite?: boolean;
}

export interface LinksResponse {
  links: Link[];
  page: number;
  totalPages: number;
  total: number;
}

// Tag types
export interface Tag {
  _id?: string;
  id?: string;
  name: string;
  color: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LinkForm {
  title: string;
  url: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
}

export interface TagForm {
  name: string;
  color: string;
}

// UI State types
export interface LoadingState {
  [key: string]: boolean;
}

export interface ErrorState {
  [key: string]: string | null;
}

// Pagination types
export interface PaginationData {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

// Search and Filter types
export interface SearchFilters {
  query?: string;
  tags?: string[];
  favorite?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Notification types
export interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

// URL Analysis types
export interface UrlAnalysis {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  suggestedTags?: string[];
}

// Export default types for convenience
export type {
  User as IUser,
  AuthUser as IAuthUser,
  Link as ILink,
  Tag as ITag
};