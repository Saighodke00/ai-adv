
export type UserRole = 'USER' | 'ADMIN' | 'CREATOR';

export interface BrandConfig {
  companyName: string;
  logoUrl?: string;
  website?: string;
  tagline?: string;
  contactNumber?: string;
  brandColors: string[];
  fontStyle: 'modern' | 'classic' | 'playful' | 'luxury' | 'minimal';
  industry: string;
  personality?: string;
  targetAudience?: string;
}

export interface GeneratedAsset {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  type: 'image' | 'video';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  brand?: BrandConfig;
  credits: {
    images: number;
    videos: number;
  };
  generationHistory?: GeneratedAsset[];
}

export type AssetType = 'image' | 'video' | 'audio';

export interface OccasionAsset {
  id: string;
  title: string;
  type: AssetType;
  url: string;
  thumbnail?: string;
  month: number; // 0-11
  date?: string; // ISO or Fixed Day
  occasion: string;
  language: 'en' | 'hi' | 'mr';
}

export interface BrandingPlacement {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage
  opacity: number;
  alignment: 'left' | 'center' | 'right';
}

export interface MarketplaceAsset extends OccasionAsset {
  creatorId: string;
  price: number;
  tags: string[];
}
