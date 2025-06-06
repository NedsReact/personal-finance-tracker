import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface DashboardSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export default function DashboardSummary({ totalIncome, totalExpenses, balance }: DashboardSummaryProps) {
  return (
    <Box display="flex" gap={2} mb={4}>
      <Paper sx={{ p: 2, flex: 1 }} elevation={3}>
        <Typography variant="subtitle2" color="text.secondary">Total Income</Typography>
        <Typography variant="h6" color="success.main">${totalIncome.toLocaleString()}</Typography>
      </Paper>
      <Paper sx={{ p: 2, flex: 1 }} elevation={3}>
        <Typography variant="subtitle2" color="text.secondary">Total Expenses</Typography>
        <Typography variant="h6" color="error.main">${totalExpenses.toLocaleString()}</Typography>
      </Paper>
      <Paper sx={{ p: 2, flex: 1 }} elevation={3}>
        <Typography variant="subtitle2" color="text.secondary">Balance</Typography>
        <Typography variant="h6" color={balance >= 0 ? "primary" : "error"}>${balance.toLocaleString()}</Typography>
      </Paper>
    </Box>
  );
} 