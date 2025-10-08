export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  website?: string;
  industry?: string;
  created_at: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
  score: number;
}
