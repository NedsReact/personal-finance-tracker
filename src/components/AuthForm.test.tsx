/** @jest-environment jsdom */
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('AuthForm', () => {
  const mockSubmit = jest.fn().mockResolvedValue(null);

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders login form when type is login', () => {
    render(<AuthForm type="login" onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });

  it('renders signup form when type is signup', () => {
    render(<AuthForm type="signup" onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('submits form with email and password for login', async () => {
    render(<AuthForm type="login" onSubmit={mockSubmit} />);
    
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('shows error message when submission fails', async () => {
    const mockSubmitWithError = jest.fn().mockResolvedValue('Invalid credentials');
    render(<AuthForm type="login" onSubmit={mockSubmitWithError} />);
    
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    expect(mockSubmitWithError).toHaveBeenCalled();
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
}); 