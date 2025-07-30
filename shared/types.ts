// Shared types for Satya Photography application

export type UserRole = 'user' | 'owner';

export type ServiceType = 
  | 'wedding' 
  | 'prewedding' 
  | 'newborn' 
  | 'birthdays' 
  | 'retirement' 
  | 'events' 
  | 'engagement';

export type MediaType = 'photo' | 'video';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Media {
  id: string;
  title?: string;
  type: MediaType;
  service_type: ServiceType;
  url: string;
  uploaded_by: string;
  created_at: string;
}

export interface ContactFormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: ServiceType;
  event_date: string;
  message?: string;
  submitted_at: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price_range: string;
  service_type: ServiceType;
  created_by: string;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  event_type: ServiceType;
  event_date: string;
  message?: string;
}

export const SERVICE_TYPES: { value: ServiceType; label: string }[] = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'prewedding', label: 'Pre-wedding' },
  { value: 'newborn', label: 'New Born Photoshoot' },
  { value: 'birthdays', label: 'Birthdays' },
  { value: 'retirement', label: 'Retirement' },
  { value: 'events', label: 'Events' },
  { value: 'engagement', label: 'Engagement' },
];

export const MEDIA_TYPES: { value: MediaType; label: string }[] = [
  { value: 'photo', label: 'Photo' },
  { value: 'video', label: 'Video' },
];
