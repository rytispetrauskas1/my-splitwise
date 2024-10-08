import React, { useState } from "react";
import "./HomePage.css";
import ExpenseGroupList from "../components/expenseGroups/ExpenseGroupList";
import AddExpenseGroupModal from "../components/expenseGroups/AddExpenseGroupModal";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import AddExpenseButton from "../components/common/buttons/AddExpenseButton";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState<boolean>(false);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <button className="open-group-btn" onClick={() => setShowAddGroupModal(true)}>
          Add Group
        </button>
      </header>
      <AddExpenseGroupModal show={showAddGroupModal} onClose={() => setShowAddGroupModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} onClose={() => setShowAddExpenseModal(false)} />
      <AddExpenseButton onClick={() => setShowAddExpenseModal(true)} />
      <ExpenseGroupList />
    </div>
  );
};

export default HomePage;
