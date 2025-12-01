export interface User {
  id: number;
  email: string;
  role: string;
  consultantId?: number | null;
}

export interface RegisterRequest {
  name: string;
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