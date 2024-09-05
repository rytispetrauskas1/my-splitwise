import React, { useRef, useState } from "react";
import "./AddExpenseGroupModal.css";
import { useGlobalState } from "../../context/globalState";
import { getMaxValue } from "../../utils/listUtils";
import { Group } from "types";
import AddMember from "./AddMemberView";
import AddMemberButton from "components/common/buttons/AddMemberButton";
import CancelButton from "components/common/buttons/CancelButton";
import SubmitButton from "components/common/buttons/SubmitButton";

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
  const [selectedUsers, setSelectedUsers] = useState<number[]>(group ? group.users : []);
  const [showAddMembers, setShowAddMembers] = useState<boolean>(false);

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
        users: selectedUsers,
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
        users: selectedUsers,
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
        {showAddMembers ? (
          <AddMember
            groupMembers={selectedUsers}
            onCancel={() => {
              setShowAddMembers(false);
            }}
            onAddMembers={(selectedUsers: number[]) => {
              setSelectedUsers(selectedUsers);
              setShowAddMembers(false);
            }}
          />
        ) : (
          <div>
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

              <AddMemberButton
                onClick={() => {
                  setShowAddMembers(true);
                }}
              />

              <div className="group-form-buttons">
                <SubmitButton buttonText={group ? "Edit Group" : "Add Group"} />
                <CancelButton onClick={onClose} />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpenseGroupModal;
