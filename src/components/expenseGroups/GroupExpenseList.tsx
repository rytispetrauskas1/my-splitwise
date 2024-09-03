import React from "react";
import "./GroupExpenseList.css";
import { useGlobalState } from "../../context/globalState";

interface GroupExpenseListProps {}

const GroupExpenseList: React.FC<GroupExpenseListProps> = () => {
  const { groups, expenses } = useGlobalState().state;
  const totalAmount = expenses.reduce(
    (expenseSum, expense) => expenseSum + expense.amount,
    0
  );

  return (
    <div className="group-expense-list">
      <h2>Your Groups</h2>
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <div key={index} className="group-expense-item ">
            <h2>{group.name}</h2>
            <h3>Total expenses: {totalAmount}</h3>
          </div>
        ))
      ) : (
        <p>No groups available. Please add a new group.</p>
      )}
    </div>
  );
};

export default GroupExpenseList;
