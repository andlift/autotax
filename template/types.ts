
// Fix: Added React import to resolve 'Cannot find namespace React' error
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  ctaText: string;
  isPrimary?: boolean;
}

export interface Language {
  code: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ReviewProps {
  name: string;
  rating: number;
  content: string;
  date: string;
}
