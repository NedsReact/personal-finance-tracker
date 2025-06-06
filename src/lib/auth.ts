import { mockUsers, MockUser } from './mockUsers';

export function login(email: string, password: string): MockUser | null {
  return mockUsers.find(user => user.email === email && user.password === password) || null;
}

export function signup(name: string, email: string, password: string): MockUser | null {
  if (mockUsers.some(user => user.email === email)) {
    return null; // Email already exists
  }
  const newUser: MockUser = {
    id: (mockUsers.length + 1).toString(),
    email,
    name,
    password,
  };
  mockUsers.push(newUser);
  return newUser;
} 