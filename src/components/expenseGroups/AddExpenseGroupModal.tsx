import React, { useRef, useState } from "react";
import "./AddExpenseGroupModal.css";
import { useGlobalState } from "../../context/globalState";
import { getMaxValue } from "../../utils/listUtils";
import { Group } from "types";

interface AddExpenseGroupModalProps {
  show: boolean;
  onClose: () => void;
  group?: Group;
}

const AddExpenseGroupModal: React.FC<AddExpenseGroupModalProps> = ({
  show,
  onClose,
  group = null,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useGlobalState();
  const { groups } = state;

  const [groupName, setGroupName] = useState<string>(group ? group.name : "");

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // If the click is on the background (outside the modal content), close the modal
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (group) {
      const newGroup = {
        id: group.id,
        name: groupName.trim(),
        timestamp: group.timestamp,
        users: group.users,
      };
      dispatch({ type: "UPDATE_GROUP", payload: newGroup });
    } else {
      const groupMap = groups.map((item) => {
        return {
          id: item.id,
        };
      });

      const newGroup = {
        id: getMaxValue(groupMap),
        name: groupName.trim(),
        timestamp: new Date().toISOString(),
        users: [],
      };
      dispatch({ type: "ADD_GROUP", payload: newGroup });
    }

    setGroupName("");
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="group-modal-overlay" onClick={handleBackgroundClick}>
      <div className="group-modal-content" ref={modalRef}>
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
              {group ? "Edit Group" : "Add Group"}
            </button>
            <button type="button" className="group-cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseGroupModal;
