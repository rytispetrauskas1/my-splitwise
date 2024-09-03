import React from "react";
import { useGlobalState } from "../context/globalState";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ExpenseGroup.css";

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
      <div className="expense-list">
        {groupExpenses.length > 0 ? (
          groupExpenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <div>
                <strong>Type:</strong> {expense.type} <br />
                <strong>Description:</strong> {expense.description} <br />
                <strong>Amount:</strong> €{expense.amount.toFixed(2)} <br />
                <strong>Date Added:</strong>{" "}
                {new Date(expense.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p>No expenses for this group.</p>
        )}
      </div>
      <Link to="/" className="back-btn">
        Back to Groups
      </Link>
    </div>
  );
};

export default GroupExpenses;
