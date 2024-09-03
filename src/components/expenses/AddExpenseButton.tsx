import React from "react";
import "./AddExpenseButton.css";

interface AddExpenseButtonProps {
  onClick: () => void;
}

const AddExpenseButton: React.FC<AddExpenseButtonProps> = ({ onClick }) => {
  return (
    <button className="floating-add-expense-btn" onClick={onClick}>
      +Add Expense
    </button>
  );
};

export default AddExpenseButton;
