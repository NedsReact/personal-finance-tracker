import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { MockTransaction } from "@/lib/mockTransactions";

interface TransactionsListProps {
  transactions: (MockTransaction & { actions?: React.ReactNode })[];
}

export default function TransactionsList({ transactions }: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography align="center">No transactions found</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Recent Transactions
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Type</TableCell>
            {transactions.some(tx => tx.actions) && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.category}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell align="right" style={{ color: tx.type === 'income' ? 'green' : 'red' }}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
              </TableCell>
              <TableCell>{tx.type}</TableCell>
              {tx.actions && <TableCell>{tx.actions}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 