import React from "react";
import "./GroupMembersButton.css";
import MemberIcon from "../../assets/icons/member.svg";

interface GroupMembersButtonProps {
  onEditClick: () => void;
}

const GroupMembersButton: React.FC<GroupMembersButtonProps> = ({ onEditClick }) => {
  return (
    <img
      src={MemberIcon}
      alt="Edit icon"
      className="member-icon"
      onClick={() => {
        onEditClick();
      }}
    />
  );
};

export default GroupMembersButton;
