import React from "react";
import "./CancelButton.css";

interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className="cancel-btn" onClick={onClick}>
      Cancel
    </button>
  );
};

export default CancelButton;
