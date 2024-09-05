import React, { useState } from "react";
import "./AddMemberView.css";
import { useGlobalState } from "../../context/globalState";
import AddMemberButton from "components/common/buttons/AddMemberButton";
import CancelButton from "components/common/buttons/CancelButton";

interface AddMemberViewProps {
  groupMembers: number[];
  onAddMembers: (selectedUsers: number[]) => void;
  onCancel: () => void;
}

const AddMemberView: React.FC<AddMemberViewProps> = ({ groupMembers, onAddMembers, onCancel }) => {
  const { state } = useGlobalState();
  const { users, currentUser } = state;

  const [selectedUsers, setSelectedUsers] = useState<number[]>(groupMembers);

  const handleUserSelection = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((selected) => selected !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  return (
    <div className="form-group">
      <label>Select Members:</label>
      <div className="members-list">
        {users
          .filter((user) => user.id !== currentUser?.id)
          .map((user) => (
            <div key={user.id} className="member-item">
              <input
                type="checkbox"
                checked={selectedUsers.some((selected) => selected === user.id)}
                onChange={() => handleUserSelection(user.id)}
              />
              <label>{user.username}</label>
            </div>
          ))}
      </div>
      <AddMemberButton
        onClick={() => {
          onAddMembers(selectedUsers);
        }}
      />
      <CancelButton onClick={onCancel} />
    </div>
  );
};

export default AddMemberView;
