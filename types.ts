export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'academic' | 'organize' | 'converter' | 'security';
  isPro?: boolean;
}

export interface User {
  uid: string;
  email: string;
  photoURL: string;
  isPremium: boolean;
}

export interface ProcessingOptions {
  [key: string]: any;
}
