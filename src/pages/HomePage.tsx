import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import ExpenseGroupList from "../components/expenseGroups/ExpenseGroupList";
import AddExpenseGroupModal from "../components/expenseGroups/AddExpenseGroupModal";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import AddExpenseButton from "../components/common/AddExpenseButton";

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
      <AddExpenseButton onClick={() => setShowAddExpenseModal(true)} />
      <ExpenseGroupList />
    </div>
  );
};

export default HomePage;
