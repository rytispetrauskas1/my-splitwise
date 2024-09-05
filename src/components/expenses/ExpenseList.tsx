import React, { useState } from "react";
import "./ExpenseList.css";
import { Expense } from "../../types";
import AddExpenseModal from "./AddExpenseModal";
import { useParams } from "react-router-dom";
import EditButton from "components/common/buttons/EditButton";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(undefined);

  const onEditClick = (expense: Expense) => {
    setSelectedExpense(expense);
  };

  return (
    <div className="expense-list">
      {expenses.map((expense, index) => (
        <div key={index} className="expense-item">
          <div>
            <strong>Type:</strong> {expense.type} <br />
            <strong>Description:</strong> {expense.description} <br />
            <strong>Amount:</strong> €{expense.amount.toFixed(2)} <br />
            <strong>Date Added:</strong> {new Date(expense.timestamp).toLocaleString()}{" "}
          </div>
          <EditButton
            onEditClick={() => {
              onEditClick(expense);
            }}
          />
        </div>
      ))}
      {selectedExpense && (
        <AddExpenseModal
          show={true}
          onClose={() => setSelectedExpense(undefined)}
          currentGroupId={groupId}
          expense={selectedExpense}
        />
      )}
    </div>
  );
};

export default ExpenseList;
