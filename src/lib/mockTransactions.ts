export interface MockTransaction {
  id: string;
  userId: string;
  date: string; // ISO string
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
}

export const mockTransactions: MockTransaction[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-06-01',
    amount: 3000,
    category: 'Salary',
    description: 'June Salary',
    type: 'income',
  },
  {
    id: '2',
    userId: '1',
    date: '2024-06-02',
    amount: 100,
    category: 'Groceries',
    description: 'Supermarket',
    type: 'expense',
  },
  {
    id: '3',
    userId: '1',
    date: '2024-06-03',
    amount: 50,
    category: 'Transport',
    description: 'Bus pass',
    type: 'expense',
  },
  {
    id: '4',
    userId: '1',
    date: '2024-06-04',
    amount: 200,
    category: 'Freelance',
    description: 'Side project',
    type: 'income',
  },
]; 