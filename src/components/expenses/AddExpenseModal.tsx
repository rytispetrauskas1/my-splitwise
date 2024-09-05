import React, { useRef, useState } from "react";
import "./AddExpenseModal.css";
import { useGlobalState } from "../../context/globalState";
import { getMaxValue } from "../../utils/listUtils";
import { Expense } from "types";
import CancelButton from "components/common/buttons/CancelButton";
import SubmitButton from "components/common/buttons/SubmitButton";

interface AddExpenseModalProps {
  show: boolean;
  onClose: () => void;
  currentGroupId?: number | string;
  expense?: Expense;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  show,
  onClose,
  currentGroupId = "",
  expense = null,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useGlobalState();
  const { expenses, groups, categories, currentUser } = state;

  const [expenseType, setExpenseType] = useState<string>(expense ? expense.type : "");
  const [description, setDescription] = useState<string>(expense ? expense.description : "");
  const [amount, setAmount] = useState<number | string>(expense ? expense.amount : "");
  const [groupId, setGroupId] = useState<number | string>(currentGroupId);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // If the click is on the background (outside the modal content), close the modal
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (expense) {
      // If expense is provided in the props, update the existing expense
      const newExpense = {
        id: expense.id,
        type: expenseType,
        description,
        amount: Number(amount),
        timestamp: expense.timestamp,
        groupId: Number(groupId),
        userId: currentUser ? currentUser.id : 0,
      };

      // Update expense to the global state
      dispatch({ type: "UPDATE_EXPENSE", payload: newExpense });
    } else {
      // If expense is not provided in the props, create a new expense
      // Create expense Id map
      const expenseMap = expenses.map((item) => {
        return {
          id: item.id,
        };
      });

      const newExpense = {
        id: getMaxValue(expenseMap),
        type: expenseType,
        description,
        amount: Number(amount),
        timestamp: new Date().toISOString(),
        groupId: Number(groupId),
        userId: currentUser ? currentUser.id : 0,
      };

      // Add new expense to the global state
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    }

    // Clean up local state
    setExpenseType("");
    setDescription("");
    setAmount("");
    if (!groupId) {
      setGroupId("");
    }

    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="expense-modal-overlay" onClick={handleBackgroundClick}>
      <div className="expense-modal-content" ref={modalRef}>
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="expense-form-group">
            <label htmlFor="expenseType">Expense Type</label>
            <select
              id="expenseType"
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="expense-form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="expense-form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="expense-form-group">
            <label htmlFor="group">Group</label>
            <select
              id="group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
            >
              <option value="">Select group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className="expense-form-buttons">
            <SubmitButton buttonText={expense ? "Edit Expense" : "Add Expense"} />
            <CancelButton onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
