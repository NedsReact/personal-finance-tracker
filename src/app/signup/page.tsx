"use client";
import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { signup } from "@/lib/auth";
import type { MockUser } from "@/lib/mockUsers";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function SignupPage() {
  const [user, setUser] = useState<MockUser | null>(null);

  async function handleSignup({ name = "", email, password }: { name?: string; email: string; password: string }) {
    const user = signup(name, email, password);
    if (!user) return "Email already exists";
    setUser(user);
    return null;
  }

  if (user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Account created! Welcome, {user.name}!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <AuthForm type="signup" onSubmit={handleSignup} />
    </Container>
  );
} 