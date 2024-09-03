import React, { useState } from "react";
import "./AddExpenseModal.css";
import { useGlobalState } from "../../context/globalState";
import { getMaxValue } from "../../utils/listUtils";

interface AddExpenseModalProps {
  show: boolean;
  onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ show, onClose }) => {
  const { state, dispatch } = useGlobalState();
  const { expenses, groups, categories } = state;

  const [expenseType, setExpenseType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [groupId, setGroupId] = useState<number | string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseType || !description || !amount || !groupId) {
      alert("Please fill in all fields.");
      return;
    }
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
    };

    // Add new expense to the global state
    dispatch({ type: "ADD_EXPENSE", payload: newExpense });

    // Clean up local state
    setExpenseType("");
    setDescription("");
    setAmount("");
    setGroupId("");
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="expense-modal-overlay">
      <div className="expense-modal-content">
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
            <button type="submit" className="expense-submit-btn">
              Add Expense
            </button>
            <button
              type="button"
              className="expense-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
