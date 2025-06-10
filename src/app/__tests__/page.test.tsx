/** @jest-environment jsdom */
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';
import type { MockTransaction } from '@/lib/mockTransactions';

// Mock the components that are used in the page
jest.mock('@/components/DashboardSummary', () => {
  return function DashboardSummary({ 
    totalIncome, 
    totalExpenses, 
    balance 
  }: { 
    totalIncome: number; 
    totalExpenses: number; 
    balance: number; 
  }) {
    return (
      <div data-testid="dashboard-summary">
        <div>Total Income: {totalIncome}</div>
        <div>Total Expenses: {totalExpenses}</div>
        <div>Balance: {balance}</div>
      </div>
    );
  };
});

jest.mock('@/components/TransactionsList', () => {
  return function TransactionsList({ 
    transactions, 
    onEdit, 
    onDelete 
  }: { 
    transactions: MockTransaction[];
    onEdit?: (tx: MockTransaction) => void;
    onDelete?: (id: string) => void;
  }) {
    return (
      <div data-testid="transactions-list">
        {transactions.map(tx => (
          <div key={tx.id} data-testid="transaction-item">
            {tx.description}
            {onDelete && <button onClick={() => onDelete(tx.id)}>Delete</button>}
            {onEdit && <button onClick={() => onEdit(tx)}>Edit</button>}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('@/components/TransactionForm', () => {
  return function TransactionForm({ 
    onSubmit, 
    "data-editing": isEditing 
  }: { 
    onSubmit: (data: Omit<MockTransaction, "id" | "userId">) => void;
    "data-editing"?: boolean;
  }) {
    return (
      <form
        data-testid="transaction-form"
        data-editing={isEditing}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            date: '2024-03-20',
            amount: 100,
            category: 'Food',
            description: 'Test transaction',
            type: 'expense'
          });
        }}
      >
        <button type="submit">Add Transaction</button>
      </form>
    );
  };
});

describe('Dashboard Page', () => {
  it('renders all main components', () => {
    render(<Page />);
    
    expect(screen.getByTestId('dashboard-summary')).toBeInTheDocument();
    expect(screen.getByTestId('transactions-list')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-form')).toBeInTheDocument();
  });

  it('updates dashboard when adding a new transaction', async () => {
    render(<Page />);
    
    const form = screen.getByTestId('transaction-form');
    fireEvent.submit(form);

    await waitFor(() => {
      const transactionItems = screen.getAllByTestId('transaction-item');
      expect(transactionItems).toHaveLength(1);
      expect(transactionItems[0]).toHaveTextContent('Test transaction');
    });
  });

  it('updates dashboard when deleting a transaction', async () => {
    render(<Page />);
    
    // First add a transaction
    const form = screen.getByTestId('transaction-form');
    fireEvent.submit(form);

    // Then delete it
    await waitFor(() => {
      const deleteButton = screen.getByLabelText(/delete transaction/i);
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      const transactionItems = screen.queryAllByTestId('transaction-item');
      expect(transactionItems).toHaveLength(0);
    });
  });

  it('handles transaction editing flow', async () => {
    render(<Page />);
    
    // Add initial transaction
    const form = screen.getByTestId('transaction-form');
    fireEvent.submit(form);

    // Click edit button
    await waitFor(() => {
      const editButton = screen.getByLabelText(/edit transaction/i);
      fireEvent.click(editButton);
    });

    // Verify form is populated with transaction data
    await waitFor(() => {
      expect(screen.getByTestId('transaction-form')).toHaveAttribute('data-editing', 'true');
    });
  });
}); 