"use client";
import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { login } from "@/lib/auth";
import type { MockUser } from "@/lib/mockUsers";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function LoginPage() {
  const [user, setUser] = useState<MockUser | null>(null);

  async function handleLogin({ email, password }: { email: string; password: string }) {
    const user = login(email, password);
    if (!user) return "Invalid email or password";
    setUser(user);
    return null;
  }

  if (user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome, {user.name}!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <AuthForm type="login" onSubmit={handleLogin} />
    </Container>
  );
} 