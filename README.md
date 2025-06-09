# Personal Finance Tracker

A demo project to showcase Next.js, React, Material-UI, TypeScript, and senior-level fullstack skills.

---

## Project Plan

### 1. User Authentication (Mock Data)
- Simple login/signup using mock data (email, name, password).
- No real backend or API keys required for local development.
- Securely handle environment variables with `.env` and `.env.example`.

### 2. Dashboard
- Overview of current balance, total income, total expenses, and savings.
- Recent transactions list.

### 3. Transactions Management
- Add, edit, delete transactions.
- Fields: date, amount, category, description, type (income/expense).

### 4. Categories
- Predefined and/or user-defined categories (e.g., Food, Rent, Salary, Entertainment).

### 5. Data Visualization
- Charts for spending by category, income vs. expenses, and savings growth.

### 6. Filtering & Search
- Filter transactions by date range, category, or type.
- Search by description.

### 7. Responsive UI
- Works well on desktop and mobile.

### 8. Budgets & Goals (Optional)
- Set monthly budgets per category.
- Track progress toward savings goals.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Material-UI, TypeScript
- **State Management:** (To be decided: Context API, Redux, Zustand, etc.)
- **Database:** PostgreSQL (Supabase/Neon for production, mock data for local/dev)
- **Testing:** Jest, React Testing Library, Cypress (planned)
- **CI/CD:** GitHub Actions (planned)
- **Deployment:** Vercel (planned)
- **Extras:** Data visualization, responsive design, accessibility, documentation

---

## Getting Started

1. Clone the repo
2. Install dependencies
3. Run the development server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

- `/src/app` - Next.js app router pages (login, signup, dashboard, etc.)
- `/src/components` - React components
- `/src/lib` - Utility functions, mock data, and data models

---

## Next Steps

- Implement login/signup pages and mock authentication logic.
- Add dashboard and transaction management features.
- Continue with the plan above!

## Running Tests

To run unit and integration tests with Jest:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npm test
   ```

Test files should be named with `.test.ts` or `.test.tsx` and placed next to the code or in a `__tests__` folder.
