export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'support' | 'client';
  company?: string;
  position?: string;
}

export interface Robot {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  model: string;
  temperature: number;
  languages: string[];
  voiceType: string;
  interactionCount: number;
  lastActive: string;
  clientId: string;
}

export interface Interaction {
  id: string;
  robotId: string;
  type: string;
  timestamp: string;
  duration: number;
  success: boolean;
}

export interface BillingRecord {
  id: string;
  clientId: string;
  date: string;
  plan: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  robots: number;
  extraInteractions: number;
}