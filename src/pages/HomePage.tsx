import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import AddExpenseModal from "../components/AddExpenseModal";
import { Expense } from "../types";

interface HomePageProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const HomePage: React.FC<HomePageProps> = ({
  expenses,
  setExpenses,
  categories,
  setCategories,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigateToSummary = () => {
    navigate("/summary");
  };

  const addCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Splitwise Clone</h1>
        <p>Manage your expenses easily between two people.</p>
        <button className="open-modal-btn" onClick={handleOpenModal}>
          Add Expense
        </button>
        <button className="summary-btn" onClick={handleNavigateToSummary}>
          View Summary
        </button>
      </header>

      <AddExpenseModal
        show={isModalOpen}
        onClose={handleCloseModal}
        addExpense={(expense) => setExpenses([...expenses, expense])}
        categories={categories}
        addCategory={addCategory}
      />

      <div className="expense-list">
        {expenses.map((expense, index) => (
          <div key={index} className="expense-item">
            <div>
              <strong>Type:</strong> {expense.type} <br />
              <strong>Description:</strong> {expense.description} <br />
              <strong>Amount:</strong> €{expense.amount.toFixed(2)} <br />
              <strong>Date Added:</strong>{" "}
              {new Date(expense.timestamp).toLocaleString()}{" "}
              {/* Display timestamp */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
