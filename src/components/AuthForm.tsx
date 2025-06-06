"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

type AuthFormProps = {
  type: "login" | "signup";
  onSubmit: (data: { name?: string; email: string; password: string }) => Promise<string | null>;
};

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await onSubmit({ name, email, password });
    if (result) setError(result);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #eee",
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {type === "login" ? "Login" : "Sign Up"}
      </Typography>
      {type === "signup" && (
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      )}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" size="large">
        {type === "login" ? "Login" : "Sign Up"}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
} 