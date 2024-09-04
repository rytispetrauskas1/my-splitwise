import React, { useState } from "react";
import "./ExpenseGroupList.css";
import { useGlobalState } from "../../context/globalState";
import { Link } from "react-router-dom";
import EditButton from "components/common/EditButton";
import { Group } from "types";
import AddExpenseGroupModal from "./AddExpenseGroupModal";

interface ExpenseGroupListProps {}

const ExpenseGroupList: React.FC<ExpenseGroupListProps> = () => {
  const { groups, expenses } = useGlobalState().state;
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);

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
          <div key={group.id} className="group-expense-item">
            <Link to={`/group/${group.id}`} className="group-expense-link">
              <h2>{group.name}</h2>
              <h3>Total expenses: €{getTotalAmount(group.id)}</h3>
            </Link>

            <EditButton
              onEditClick={() => {
                setSelectedGroup(group);
              }}
            />
          </div>
        ))
      ) : (
        <p>No groups available. Please add a new group.</p>
      )}
      {selectedGroup && (
        <AddExpenseGroupModal
          show={true}
          onClose={() => setSelectedGroup(undefined)}
          group={selectedGroup}
        />
      )}
    </div>
  );
};

export default ExpenseGroupList;
