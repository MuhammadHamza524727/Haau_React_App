import React from "react";
import { FaUserCircle } from "react-icons/fa";

const users = [
  {
    username: "me.shaka",
    note: "Suggested for you",
  },
  {
    username: "bilal",
    note: "Followed by bilal_yaqoob06",
  },
  {
    username: "zeeshan.alam.1276487",
    note: "Following shahzaib.khan",
  },
  {
    username: "its_Zain",
    note: "Followed by sheroz",
  },
  {
    username: "tufail_sh",
    note: "Followed by haider.hanzala",
  },
];

export default function SuggestedSidebar() {
  return (
    <div className="w-full sticky top-0 h-screen  max-w-sm p-4 bg-white shadow rounded-lg ">
      {/* Current User */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FaUserCircle className="text-3xl text-gray-500" />
          <div>
            <p className="font-semibold">hmzarj77</p>
            <p className="text-xs text-gray-500">Muhammad Hamza</p>
          </div>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:underline">Switch</button>
      </div>

      {/* Suggestions Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-500">Suggested for you</p>
        <button className="text-xs text-blue-600 font-medium hover:underline">See All</button>
      </div>

      {/* Suggestions List */}
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-2xl text-gray-400" />
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-gray-500">{user.note}</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline">Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
