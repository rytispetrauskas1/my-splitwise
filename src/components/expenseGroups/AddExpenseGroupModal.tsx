import React, { useState } from "react";
import "./AddExpenseGroupModal.css";
import { useGlobalState } from "../../context/globalState";

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

  const [groupID, setGroupID] = useState<number | string>("");
  const [groupName, setGroupName] = useState<string>("");

  const addGroup = () => {
    const newGroup = {
      id: Number(groupID),
      name: groupName.trim(),
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: "ADD_GROUP", payload: newGroup });

    setGroupName("");
    setGroupID("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName || !groupID) {
      alert("Please fill in all fields.");
      return;
    }
    if (groups.some((item) => item.id === Number(groupID))) {
      alert("Group id already exits");
      return;
    }
    addGroup();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Group</h2>
        <form onSubmit={handleSubmit} className="group-form">
          <div className="form-group">
            <label htmlFor="groupID">Group ID</label>
            <input
              type="number"
              id="groupID"
              value={groupID}
              onChange={(e) => setGroupID(e.target.value)}
              placeholder="Enter group id"
              required
            />
          </div>
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

export default AddExpenseGroupModal;
