import React from "react";
import "./ExpenseList.css";
import { Expense } from "../../types";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <div className="expense-list">
      {expenses.map((expense, index) => (
        <div key={index} className="expense-item">
          <div>
            <strong>Type:</strong> {expense.type} <br />
            <strong>Description:</strong> {expense.description} <br />
            <strong>Amount:</strong> €{expense.amount.toFixed(2)} <br />
            <strong>Date Added:</strong>{" "}
            {new Date(expense.timestamp).toLocaleString()}{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
