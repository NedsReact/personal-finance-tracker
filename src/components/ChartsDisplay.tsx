import { PieChart, BarChart } from '@mui/x-charts';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ChartsDisplayProps {
  transactions: { amount: number; category: string; type: 'income' | 'expense'; }[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export default function ChartsDisplay({ transactions, totalIncome, totalExpenses, balance }: ChartsDisplayProps) {
  const spendingByCategory = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieChartData = Object.entries(spendingByCategory).map(([category, amount]) => ({
    id: category,
    value: amount,
    label: category,
  }));

  const incomeExpenseData = [
    { value: totalIncome, label: 'Income' },
    { value: totalExpenses, label: 'Expenses' },
  ];

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h5" component="h2">Data Visualization</Typography>

      <Box>
        <Typography variant="h6">Spending by Category</Typography>
        {pieChartData.length > 0 ? (
          <PieChart
            series={[
              {
                data: pieChartData,
                highlightScope: { fade: "global", highlight: "item" },
                faded: { innerRadius: 30, "additionalRadius": -30, color: "gray" },
              },
            ]}
            height={200}
            width={400}
            slotProps={{ legend: {} }}
          />
        ) : (
          <Typography>No expense data to display for categories.</Typography>
        )}
      </Box>

      <Box>
        <Typography variant="h6">Income vs. Expenses</Typography>
        <BarChart
          xAxis={[{ scaleType: 'band', data: incomeExpenseData.map(d => d.label) }]}
          series={[{ data: incomeExpenseData.map(d => d.value) }]}
          height={200}
          width={400}
        />
      </Box>

      <Box>
        <Typography variant="h6">Current Balance</Typography>
        <Typography variant="h4" color={balance >= 0 ? 'success.main' : 'error.main'}>
          ${balance.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (A full savings growth chart would require historical balance data over time.)
        </Typography>
      </Box>
    </Box>
  );
} 