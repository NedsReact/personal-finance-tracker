export interface MockUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123',
  },
]; 