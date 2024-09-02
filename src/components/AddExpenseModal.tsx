import React, { useState } from "react";
import "./AddExpenseModal.css";
import { Expense } from "../types";

interface AddExpenseModalProps {
  show: boolean;
  onClose: () => void;
  addExpense: (expense: Expense) => void;
  categories: string[];
  addCategory: (category: string) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  show,
  onClose,
  addExpense,
  categories,
  addCategory,
}) => {
  const [expenseType, setExpenseType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [newCategory, setNewCategory] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseType || !description || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense = {
      type: expenseType,
      description,
      amount: Number(amount),
      timestamp: new Date().toISOString(),
    };

    addExpense(newExpense);
    setExpenseType("");
    setDescription("");
    setAmount("");
    onClose();
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      addCategory(newCategory);
      setExpenseType(newCategory);
      setNewCategory("");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label htmlFor="expenseType">Expense Type</label>
            <select
              id="expenseType"
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="add-category">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
              />
              <button type="button" onClick={handleAddCategory}>
                Add
              </button>
            </div>
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Add Expense
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
