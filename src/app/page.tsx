"use client"; 
import React, { useState } from "react";
import Container from "@mui/material/Container";
import DashboardSummary from "@/components/DashboardSummary";
import TransactionsList from "@/components/TransactionsList";
import TransactionForm from "@/components/TransactionForm";
import ChartsDisplay from "@/components/ChartsDisplay";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import type { MockTransaction } from "@/lib/mockTransactions";

export default function Home() {
  const userId = "user123"; // Mock user ID
  const [transactions, setTransactions] = useState<MockTransaction[]>([]);
  const [editTx, setEditTx] = useState<MockTransaction | null>(null);
  const [deleteTx, setDeleteTx] = useState<MockTransaction | null>(null);

  // Filter state
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"" | "income" | "expense">("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpenses = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const balance = totalIncome - totalExpenses;

  const predefinedCategories = [
    "Salary",
    "Freelance",
    "Groceries",
    "Transport",
    "Entertainment",
    "Other",
  ];
  const [userCategories, setUserCategories] = useState<string[]>([]);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Budget state
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, number>>({});
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  // Savings Goal state
  const [savingsGoal, setSavingsGoal] = useState<number>(0);
  const [savingsGoalDialogOpen, setSavingsGoalDialogOpen] = useState(false);

  const categories = [...predefinedCategories, ...userCategories];

  // Filtered transactions
  const filteredTransactions = transactions.filter(tx => {
    // Date range filter
    if (startDate && new Date(tx.date) < new Date(startDate)) return false;
    if (endDate && new Date(tx.date) > new Date(endDate)) return false;

    // Category filter
    if (selectedCategory && tx.category !== selectedCategory) return false;

    // Type filter
    if (selectedType && tx.type !== selectedType) return false;

    // Description search
    if (searchQuery && !tx.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    return true;
  });

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

  function handleAddCategory(name: string) {
    if (!name || categories.includes(name)) return;
    setUserCategories(prev => [...prev, name]);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <DashboardSummary totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
      <TransactionForm
        onSubmit={editTx ? handleEdit : handleAdd}
        submitLabel={editTx ? "Update Transaction" : "Add Transaction"}
        categories={categories}
        onAddCategory={() => setAddCategoryOpen(true)}
        data-editing={!!editTx}
        initial={editTx || undefined}
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={() => setBudgetDialogOpen(true)}>Set Budgets</Button>
        <Button variant="outlined" onClick={() => setSavingsGoalDialogOpen(true)}>Set Savings Goal</Button>
      </Box>
      <Box mt={4} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" component="h2">Filter and Search Transactions</Typography>
        <TextField
          label="Search by Description"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 180 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 180 }}
          />
          <FormControl sx={{ flex: 1, minWidth: 180 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1, minWidth: 180 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={selectedType}
              label="Type"
              onChange={e => setSelectedType(e.target.value as "" | "income" | "expense")}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box mt={2}>
        <TransactionsList
          transactions={filteredTransactions.slice(0, 10).map(tx => ({
            ...tx,
            actions: (
              <>
                <IconButton 
                  size="small" 
                  onClick={() => setEditTx(tx)}
                  aria-label={`Edit transaction ${tx.description}`}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="error" 
                  onClick={() => setDeleteTx(tx)}
                  aria-label={`Delete transaction ${tx.description}`}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )
          }))}
        />
      </Box>
      <ChartsDisplay
        transactions={transactions}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
        categoryBudgets={categoryBudgets}
        savingsGoal={savingsGoal}
      />
      {/* Edit Dialog */}
      <Dialog open={!!editTx} onClose={() => setEditTx(null)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TransactionForm
            onSubmit={handleEdit}
            submitLabel="Update"
            categories={categories}
            onAddCategory={() => setAddCategoryOpen(true)}
            initial={editTx || undefined}
            data-editing={true}
          />
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTx} onClose={() => setDeleteTx(null)}>
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTx(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Add Category Dialog */}
      <Dialog open={addCategoryOpen} onClose={() => setAddCategoryOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCategoryOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            if (newCategory) {
              handleAddCategory(newCategory);
              setNewCategory("");
              setAddCategoryOpen(false);
            }
          }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Budget Dialog */}
      <Dialog open={budgetDialogOpen} onClose={() => setBudgetDialogOpen(false)}>
        <DialogTitle>Set Category Budgets</DialogTitle>
        <DialogContent>
          {categories.map(category => (
            <TextField
              key={category}
              label={category}
              type="number"
              fullWidth
              margin="dense"
              value={categoryBudgets[category] || ""}
              onChange={(e) => setCategoryBudgets(prev => ({
                ...prev,
                [category]: Number(e.target.value)
              }))}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBudgetDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Savings Goal Dialog */}
      <Dialog open={savingsGoalDialogOpen} onClose={() => setSavingsGoalDialogOpen(false)}>
        <DialogTitle>Set Savings Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Savings Goal"
            type="number"
            fullWidth
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSavingsGoalDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
