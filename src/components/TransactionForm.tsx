import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import type { MockTransaction } from "@/lib/mockTransactions";

const categories = [
  "Salary",
  "Freelance",
  "Groceries",
  "Transport",
  "Entertainment",
  "Other",
];

type TransactionFormProps = {
  initial?: Partial<MockTransaction>;
  onSubmit: (tx: Omit<MockTransaction, "id" | "userId">) => void;
  submitLabel?: string;
};

export default function TransactionForm({ initial = {}, onSubmit, submitLabel = "Add Transaction" }: TransactionFormProps) {
  const [date, setDate] = useState(initial.date || "");
  const [amount, setAmount] = useState(initial.amount?.toString() || "");
  const [category, setCategory] = useState(initial.category || "");
  const [description, setDescription] = useState(initial.description || "");
  const [type, setType] = useState<"income" | "expense">(initial.type || "expense");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !amount || !category || !description || !type) return;
    onSubmit({
      date,
      amount: Number(amount),
      category,
      description,
      type,
    });
    setDate("");
    setAmount("");
    setCategory("");
    setDescription("");
    setType("expense");
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
      <Typography variant="h6">{submitLabel}</Typography>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <FormControl required>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <FormControl required>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={e => setType(e.target.value as "income" | "expense")}
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">{submitLabel}</Button>
    </Box>
  );
} 