import React from "react";
import "./AddMemberButton.css";

interface AddMemberButtonProps {
  onClick: () => void;
}

const AddMemberButton: React.FC<AddMemberButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className="member-button" onClick={onClick}>
      Add Members
    </button>
  );
};

export default AddMemberButton;
