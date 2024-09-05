import React from "react";
import "./SubmitButton.css";

interface SubmitButtonProps {
  buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ buttonText }) => {
  return (
    <button type="submit" className="submit-btn">
      {buttonText}
    </button>
  );
};

export default SubmitButton;
