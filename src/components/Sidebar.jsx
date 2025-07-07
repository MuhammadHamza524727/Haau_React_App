// // import {
// //   FaHome,
// //   FaSearch,
// //   FaCompass,
// //   FaVideo,
// //   FaCommentDots,
// //   FaHeart,
// //   FaPlus,
// //   FaChartLine,
// // } from "react-icons/fa";

// // const Sidebar = () => {
// //   return (
// //     <div className="h-screen w-64 bg-white shadow-md p-4 space-y-4  rounded-lg ">
// //       <div className="flex items-center space-x-2 text-gray-600 font-semibold text-lg">
// //         <FaHome />
// //         <span>Home</span>
// //       </div>
// //       <div className="flex items-center space-x-2 text-gray-600">
// //         <FaSearch />
// //         <span>Search</span>
// //       </div>
// //       <div className="flex items-center space-x-2 text-gray-600">
// //         <FaCompass />
// //         <span>Explore</span>
// //       </div>
// //       <div className="flex items-center space-x-2 text-gray-600">
// //         <FaVideo />
// //         <span>Reels</span>
// //       </div>
// //       <div className="flex items-center space-x-2 text-gray-600">
// //         <FaCommentDots />
// //         <span>Messages</span>
// //       </div>
// //       <div className="flex items-center space-x-2 text-gray-600">
// //         <FaHeart />
// //         <span>Notifications</span>
// //       </div>
// //       <div className="flex items-center space-x-2 text-gray-600">
// //         <FaPlus />
// //         <span>Create</span>
// //       </div>
// //       <div className="flex items-center space-x-2 text-gray-600">
// //         <FaChartLine />
// //         <span>Dashboard</span>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;


// import {
//   FaHome,
//   FaSearch,
//   FaCompass,
//   FaVideo,
//   FaCommentDots,
//   FaHeart,
//   FaPlus,
//   FaChartLine,
// } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-white shadow-md p-4 space-y-4 sticky top-0">
//       <div className="flex items-center space-x-2 text-gray-700 font-semibold text-lg hover:bg-gray-100 p-2 rounded">
//         <FaHome />
//         <span>Home</span>
//       </div>
//       <div className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded">
//         <FaSearch />
//         <span>Search</span>
//       </div>
//       <div className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded">
//         <FaCompass />
//         <span>Explore</span>
//       </div>
//       <div className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded">
//         <FaVideo />
//         <span>Reels</span>
//       </div>
//       <div className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded">
//         <FaCommentDots />
//         <span>Messages</span>
//       </div>
//       <div className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded">
//         <FaHeart />
//         <span>Notifications</span>
//       </div>
//       <div className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded">
//         <FaPlus />
//         <span>Create</span>
//       </div>
//       <div className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded">
//         <FaChartLine />
//         <span>Dashboard</span>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaVideo,
  FaCommentDots,
  FaHeart,
  FaPlus,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = () => {
  const links = [
    { to: "/home", label: "Home", icon: <FaHome /> },
    { to: "/search", label: "Search", icon: <FaSearch /> },
    { to: "/explore", label: "Explore", icon: <FaCompass /> },
    { to: "/reels", label: "Reels", icon: <FaVideo /> },
    { to: "/messages", label: "Messages", icon: <FaCommentDots /> },
    { to: "/notifications", label: "Notifications", icon: <FaHeart /> },
    { to: "/create", label: "Create", icon: <FaPlus /> },
    { to: "/dashboardpage", label: "Dashboard", icon: <FaChartLine /> },
  ];

  return (
    <div className="h-screen w-64  bg-white shadow-md p-4 space-y-2 sticky top-0 rounded-lg ">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded 
            ${
              isActive
                ? "bg-gray-200 font-semibold text-gray-800"
                : "text-gray-500 hover:bg-gray-100"
            }`
          }
        >
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
