"use client"; 
import React, { useState } from "react";
import Container from "@mui/material/Container";
import DashboardSummary from "@/components/DashboardSummary";
import TransactionsList from "@/components/TransactionsList";
import TransactionForm from "@/components/TransactionForm";
import { mockTransactions, MockTransaction } from "@/lib/mockTransactions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function Home() {
  // For demo, use userId '1'
  const userId = '1';
  const [transactions, setTransactions] = useState<MockTransaction[]>(
    mockTransactions.filter(tx => tx.userId === userId)
  );
  const [editTx, setEditTx] = useState<MockTransaction | null>(null);
  const [deleteTx, setDeleteTx] = useState<MockTransaction | null>(null);

  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpenses = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const balance = totalIncome - totalExpenses;

  function handleAdd(tx: Omit<MockTransaction, "id" | "userId">) {
    setTransactions(prev => [
      {
        ...tx,
        id: (Math.random() * 1000000).toFixed(0),
        userId,
      },
      ...prev,
    ]);
  }

  function handleEdit(tx: Omit<MockTransaction, "id" | "userId">) {
    if (!editTx) return;
    setTransactions(prev => prev.map(t => t.id === editTx.id ? { ...editTx, ...tx } : t));
    setEditTx(null);
  }

  function handleDelete() {
    if (!deleteTx) return;
    setTransactions(prev => prev.filter(t => t.id !== deleteTx.id));
    setDeleteTx(null);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <DashboardSummary totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
      <TransactionForm onSubmit={handleAdd} submitLabel="Add Transaction" />
      <Box mt={2}>
        <TransactionsList
          transactions={transactions.slice(0, 10).map(tx => ({
            ...tx,
            actions: (
              <>
                <IconButton size="small" onClick={() => setEditTx(tx)}><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => setDeleteTx(tx)}><DeleteIcon fontSize="small" /></IconButton>
              </>
            )
          }))}
        />
      </Box>
      {/* Edit Dialog */}
      <Dialog open={!!editTx} onClose={() => setEditTx(null)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          {editTx && (
            <TransactionForm
              initial={editTx}
              onSubmit={handleEdit}
              submitLabel="Save Changes"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTx(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={!!deleteTx} onClose={() => setDeleteTx(null)}>
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTx(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
