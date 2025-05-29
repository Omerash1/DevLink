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
