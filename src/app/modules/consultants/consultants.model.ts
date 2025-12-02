export interface Consultant {
  id: number;
  fullName: string;
  specialty: string;
  rating: number;
  pricePerHour: number;
  photoUrl: string;
  available: boolean;
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