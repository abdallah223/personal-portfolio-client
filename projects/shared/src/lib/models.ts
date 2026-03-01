export type PublishStatus = 'draft' | 'published';

export interface ProfileSocials {
  github?: string;
  linkedin?: string;
  email?: string;
  website?: string;
}

export interface Profile {
  _id: string;
  name: string;
  headline: string;
  about: string;
  location: string;
  socials?: ProfileSocials;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectLinks {
  live?: string;
  repo?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  problem?: string;
  solution?: string;
  impact?: string[];
  stack?: string[];
  links?: ProjectLinks;
  coverImageUrl?: string;
  featured: boolean;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}
