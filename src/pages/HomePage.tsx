import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import GroupExpenseList from "../components/expenseGroups/GroupExpenseList";
import AddExpenseGroupModal from "../components/expenseGroups/AddExpenseGroupModal";
import AddExpenseModal from "../components/expenses/AddExpenseModal";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigateToSummary = () => {
    navigate("/summary");
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Splitwise Clone</h1>
        <p>Manage your expenses easily between two people.</p>
        <button
          className="open-group-btn"
          onClick={() => setShowAddGroupModal(true)}
        >
          Add Group
        </button>
        <button className="summary-btn" onClick={handleNavigateToSummary}>
          View Summary
        </button>
      </header>
      <AddExpenseGroupModal
        show={showAddGroupModal}
        onClose={() => setShowAddGroupModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
      />
      <GroupExpenseList />
      <button
        className="floating-add-expense-btn"
        onClick={() => setShowAddExpenseModal(true)}
      >
        +Add Expense
      </button>
    </div>
  );
};

export default HomePage;
