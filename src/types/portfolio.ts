export interface Technology {
  technology: string;
  id?: string;
}

export interface Result {
  result: string;
  id?: string;
}

export interface GalleryImage {
  image: {
    id: string;
    alt?: string;
    filename: string;
    url: string;
    width?: number;
    height?: number;
  };
  id?: string;
}

export interface Testimonial {
  quote?: string;
  author?: string;
  position?: string;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  client: string;
  category: string; // Made more flexible to accept any string
  technologies?: Technology[];
  featured: boolean;
  completedAt?: string;
  projectUrl?: string;
  challenge?: string;
  solution?: string;
  results?: Result[];
  featuredImage?: {
    id: string;
    alt?: string;
    filename: string;
    url: string;
    width?: number;
    height?: number;
  };
  gallery?: GalleryImage[];
  testimonial?: Testimonial;
  content?: Record<string, unknown>; // Rich text content
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioResponse {
  docs: Portfolio[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}
