/** @jest-environment jsdom */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionForm from './TransactionForm';

describe('TransactionForm', () => {
  it('renders the form title', () => {
    render(
      <TransactionForm
        onSubmit={jest.fn()}
        categories={['Food', 'Transport']}
        onAddCategory={jest.fn()}
      />
    );
    const title = screen.getByRole('heading', { name: /add transaction/i });
    expect(title).toBeInTheDocument();
  });
}); 