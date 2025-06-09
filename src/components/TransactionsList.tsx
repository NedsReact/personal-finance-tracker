import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { MockTransaction } from "@/lib/mockTransactions";

interface TransactionsListProps {
  transactions: MockTransaction[];
  onEdit?: (transaction: MockTransaction) => void;
  onDelete?: (id: string) => void;
}

export default function TransactionsList({ transactions, onEdit, onDelete }: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography align="center">No transactions found</Typography>
      </Paper>
    );
  }

  const formatAmount = (amount: number, type: 'income' | 'expense') => {
    const formatted = amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${type === 'income' ? '+' : '-'}${formatted}`;
  };

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
            {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.category}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell align="right" style={{ color: tx.type === 'income' ? 'green' : 'red' }}>
                {formatAmount(tx.amount, tx.type)}
              </TableCell>
              <TableCell>{tx.type}</TableCell>
              {(onEdit || onDelete) && (
                <TableCell>
                  {onEdit && (
                    <IconButton 
                      size="small" 
                      onClick={() => onEdit(tx)}
                      aria-label="edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => onDelete(tx.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 