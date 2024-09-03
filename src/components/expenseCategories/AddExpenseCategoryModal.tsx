import React, { useState } from "react";
import "./AddExpenseCategoryModal.css";
import { useGlobalState } from "../../context/globalState";

interface AddExpenseCategoryModalProps {
  show: boolean;
  onClose: () => void;
}

const AddExpenseCategoryModal: React.FC<AddExpenseCategoryModalProps> = ({
  show,
  onClose,
}) => {
  const { state, dispatch } = useGlobalState();
  const { categories } = state;

  const [categoryID, setCategoryID] = useState<number | string>("");
  const [categoryName, setCategoryName] = useState<string>("");

  const addCategory = () => {
    const newCategory = {
      id: Number(categoryID),
      name: categoryName.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add new expense to the global state
    dispatch({ type: "ADD_CATEGORY", payload: newCategory });

    setCategoryName("");
    setCategoryID("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName || !categoryID) {
      alert("Please fill in all fields.");
      return;
    }
    if (categories.some((item) => item.id === Number(categoryID))) {
      alert("Group id already exits");
      return;
    }
    addCategory();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Category</h2>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-category">
            <label htmlFor="categoryID">Category ID</label>
            <input
              type="number"
              id="categoryID"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
              placeholder="Enter category id"
              required
            />
          </div>
          <div className="form-category">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Add Group
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

export default AddExpenseCategoryModal;
