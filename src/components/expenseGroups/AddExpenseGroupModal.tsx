import React, { useState } from "react";
import "./AddExpenseGroupModal.css";
import { useGlobalState } from "../../context/globalState";
import { getMaxValue } from "../../utils/listUtils";

interface AddExpenseGroupModalProps {
  show: boolean;
  onClose: () => void;
}

const AddExpenseGroupModal: React.FC<AddExpenseGroupModalProps> = ({
  show,
  onClose,
}) => {
  const { state, dispatch } = useGlobalState();
  const { groups } = state;

  const [groupName, setGroupName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName) {
      alert("Please fill in all fields.");
      return;
    }

    const groupMap = groups.map((item) => {
      return {
        id: item.id,
      };
    });

    const newGroup = {
      id: getMaxValue(groupMap),
      name: groupName.trim(),
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: "ADD_GROUP", payload: newGroup });

    setGroupName("");
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="group-modal-overlay">
      <div className="group-modal-content">
        <h2>Add New Group</h2>
        <form onSubmit={handleSubmit} className="group-form">
          <div className="form-group">
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              required
            />
          </div>
          <div className="group-form-buttons">
            <button type="submit" className="group-submit-btn">
              Add Group
            </button>
            <button
              type="button"
              className="group-cancel-btn"
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

export default AddExpenseGroupModal;
