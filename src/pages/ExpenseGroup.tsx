import React, { useState } from "react";
import { useGlobalState } from "../context/globalState";
import { useParams } from "react-router-dom";
import "./ExpenseGroup.css";
import ExpenseList from "../components/expenses/ExpenseList";
import AddExpenseButton from "../components/common/buttons/AddExpenseButton";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import GroupMembersButton from "components/common/buttons/GroupMembersButton";

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

  const calculateExpenses = () => {
    return 15;
  };

  const userExpenses = calculateExpenses();
  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="group-expense-container">
      <div className="group-expense-header">
        <h1 className="group-title">{group.name}</h1>
        <GroupMembersButton onEditClick={() => {}} />
      </div>
      <h2 className={`expense-amount ${userExpenses < 0 ? "negative" : "positive"}`}>
        {userExpenses > 0 ? "You are owed" : "You owe"} {userExpenses}
      </h2>
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
