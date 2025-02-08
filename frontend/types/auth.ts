export interface User {
  id: number;
  email: string;
  name: string;
  balance: number;
  created_at: string;
}

export interface LoginResponse {
  user: User;
  message: string;
  status: string;
}
