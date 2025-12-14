import React from "react";
import { Userprops } from "../types/user";

type Props = {
  user: Userprops;
  onSelect: () => void;
  isSelected?: boolean;
};

const User: React.FC<Props> = ({ user, onSelect, isSelected }) => {
  //   console.log(user);
  return (
    <tr
      onClick={onSelect}
      className={`cursor-pointer transition ${
        isSelected ? "bg-white/10" : "hover:bg-white/5"
      }`}
      title="برای نمایش جزئیات کلیک کنید"
    >
      <td className=" px-4 py-4">{user.name}</td>
      <td className=" px-4 py-4">{user.email}</td>
    </tr>
  );
};

export default User;
