import React from "react";
import "./GroupMembersButton.css";
import MemberIcon from "../../../assets/icons/member.svg";

interface GroupMembersButtonProps {
  onClick: () => void;
}

const GroupMembersButton: React.FC<GroupMembersButtonProps> = ({ onClick }) => {
  return (
    <img
      src={MemberIcon}
      alt="Edit icon"
      className="member-icon"
      onClick={() => {
        onClick();
      }}
    />
  );
};

export default GroupMembersButton;
