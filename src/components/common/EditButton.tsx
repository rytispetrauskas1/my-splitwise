import React from "react";
import "./EditButton.css";
import EditIcon from "../../assets/icons/edit.svg";

interface EditButtonProps {
  onEditClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onEditClick }) => {
  return (
    <img
      src={EditIcon}
      alt="Edit icon"
      className="edit-icon"
      onClick={() => {
        onEditClick();
      }}
    />
  );
};

export default EditButton;
