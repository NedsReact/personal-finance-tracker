"use client";
import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { login } from "@/lib/auth";
import type { MockUser } from "@/lib/mockUsers";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";

export default function LoginPage() {
  const [user, setUser] = useState<MockUser | null>(null);
  const router = useRouter();

  async function handleLogin({ email, password }: { email: string; password: string }) {
    const user = login(email, password);
    if (!user) return "Invalid email or password";
    setUser(user);
    router.push("/");
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
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "primary.main" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
} 