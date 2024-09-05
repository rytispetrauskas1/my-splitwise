import React, { useState } from "react";
import { useGlobalState } from "../context/globalState";
import { useParams } from "react-router-dom";
import "./ExpenseGroup.css";
import ExpenseList from "../components/expenses/ExpenseList";
import AddExpenseButton from "../components/common/AddExpenseButton";
import AddExpenseModal from "../components/expenses/AddExpenseModal";

const GroupExpenses: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { groups, expenses } = useGlobalState().state;
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);

  const group = groups.find((group) => group.id === Number(groupId));
  const groupExpenses = expenses
    .filter((expense) => expense.groupId === Number(groupId))
    .sort(
      (expenseA, expenseB) =>
        new Date(expenseB.timestamp).getTime() - new Date(expenseA.timestamp).getTime()
    );

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="group-expense-container">
      <h1 className="group-title">{group.name}</h1>
      <ExpenseList expenses={groupExpenses} />
      <AddExpenseModal
        show={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        currentGroupId={groupId}
      />
      <AddExpenseButton onClick={() => setShowAddExpenseModal(true)} />
    </div>
  );
};

export default GroupExpenses;
