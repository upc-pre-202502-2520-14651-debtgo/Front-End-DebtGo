export interface Consultant {
  id?: number;
  fullName: string;
  specialty: string;
  experience: string;   // "5 años", etc.
  description: string;
  profileImage?: string;
  rating?: number;      // 0..5
  hourlyRate?: number;  // tarifa por hora
}

export interface ConsultantServiceItem {
  id?: number;
  title: string;
  description: string;
  price: number;
  consultantId: number;
}

export interface ConsultantSummary {
  servedClients: number;
  activeAdvisories: number;
  publishedServices: number;
  avgRating: number;
}

export interface ConsultantCase {
  id: number;
  clientName: string;
  requestedAt: string;  // ISO date
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
}