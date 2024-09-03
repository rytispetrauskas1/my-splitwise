import React from "react";
import "./ExpenseGroupList.css";
import { useGlobalState } from "../../context/globalState";
import { Link } from "react-router-dom";

interface ExpenseGroupListProps {}

const ExpenseGroupList: React.FC<ExpenseGroupListProps> = () => {
  const { groups, expenses } = useGlobalState().state;
  const getTotalAmount = (groupId: number) =>
    expenses.reduce(
      (expenseSum, expense) =>
        expense.groupId === groupId ? expenseSum + expense.amount : expenseSum,
      0
    );

  return (
    <div className="group-expense-list">
      <h2>Your Groups</h2>
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <Link
            key={group.id}
            to={`/group/${group.id}`}
            className="group-expense-item"
          >
            <h2>{group.name}</h2>
            <h3>Total expenses: €{getTotalAmount(group.id)}</h3>
          </Link>
        ))
      ) : (
        <p>No groups available. Please add a new group.</p>
      )}
    </div>
  );
};

export default ExpenseGroupList;
