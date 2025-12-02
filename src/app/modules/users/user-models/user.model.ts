export interface User {
  id: number;
  email: string;
  role: 'ENTREPRENEUR' | 'CONSULTANT';
  consultantId?: number | null;
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  role: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  role: string;
  consultantId: number | null;
}