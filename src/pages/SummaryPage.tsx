// src/pages/SummaryPage.tsx
import React from "react";
import "./SummaryPage.css";
import { useGlobalState } from "../context/globalState";

interface SummaryPageProps {}

const SummaryPage: React.FC<SummaryPageProps> = () => {
  const { state } = useGlobalState();
  const { expenses } = state;
  const totalAmount = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className="summary-page">
      <header className="summary-header">
        <h2>Expense Summary</h2>
        <p>Total Expenses: ${totalAmount.toFixed(2)}</p>
      </header>

      <div className="expenses-list">
        {expenses.length === 0 ? (
          <p>No expenses logged yet.</p>
        ) : (
          expenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <h3>{expense.type}</h3>
              <p>{expense.description}</p>
              <p>Amount: ${expense.amount.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
