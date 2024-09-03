import React from "react";
import { useGlobalState } from "../context/globalState";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ExpenseGroup.css";
import ExpenseList from "../components/expenses/ExpenseList";

const GroupExpenses: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { groups, expenses } = useGlobalState().state;
  const group = groups.find((group) => group.id === Number(groupId));
  const groupExpenses = expenses.filter(
    (expense) => expense.groupId === Number(groupId)
  );

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="group-expenses">
      <h1>Expenses for {group.name}</h1>
      <ExpenseList expenses={groupExpenses} />
      <Link to="/" className="back-btn">
        Back to Groups
      </Link>
    </div>
  );
};

export default GroupExpenses;
