/** @jest-environment jsdom */
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionsList from './TransactionsList';

const mockTransactions = [
  {
    id: '1',
    date: '2024-03-20',
    amount: 100,
    category: 'Food',
    description: 'Groceries',
    type: 'expense',
    userId: 'user1'
  },
  {
    id: '2',
    date: '2024-03-21',
    amount: 2000,
    category: 'Salary',
    description: 'Monthly salary',
    type: 'income',
    userId: 'user1'
  }
];

describe('TransactionsList', () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnEdit.mockClear();
  });

  it('renders transactions list with correct data', () => {
    render(
      <TransactionsList
        transactions={mockTransactions}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Monthly salary')).toBeInTheDocument();
    expect(screen.getByText('-$100.00')).toBeInTheDocument();
    expect(screen.getByText('+$2,000.00')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TransactionsList
        transactions={mockTransactions}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <TransactionsList
        transactions={mockTransactions}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const editButtons = screen.getAllByLabelText('edit');
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTransactions[0]);
  });

  it('displays empty message when no transactions', () => {
    render(
      <TransactionsList
        transactions={[]}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });

  it('does not show action buttons when handlers are not provided', () => {
    render(
      <TransactionsList
        transactions={mockTransactions}
      />
    );

    expect(screen.queryByLabelText('edit')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
  });
});