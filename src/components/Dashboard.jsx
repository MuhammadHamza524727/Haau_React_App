


// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import PostCard from './PostCard';
// import SuggestedSidebar from './SuggestedSidebar';
// import AllPost from './AllPost';

// const Dashboard = () => {
//   const [reloadTrigger, setReloadTrigger] = useState(0);

//   const handlePostSuccess = () => {
//     setReloadTrigger((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       {/* Normal Navbar at top */}
//       <Navbar />

//       {/* Page content: Sidebar | Center | Suggested */}
//       <div className="flex flex-1">
//         {/* Left Sidebar */}
//         <div className="hidden md:block w-64 h-screen sticky top-0">
//           <Sidebar />
//         </div>

//         {/* Center Content */}
//         <div className="flex-1 flex flex-col items-center py-4 overflow-y-auto">
//           <PostCard onPostSuccess={handlePostSuccess} />
//           <AllPost reloadTrigger={reloadTrigger} />
//         </div>

//         {/* Right Sidebar */}
//         <div className="hidden md:block w-64 h-screen sticky top-0">
//           <SuggestedSidebar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import PostCard from './PostCard';
import SuggestedSidebar from './SuggestedSidebar';
import AllPost from './AllPost';

const Dashboard = () => {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handlePostSuccess = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col ">
      {/* Navbar */}
      <Navbar />

      {/* Layout: Sidebar | Center | Suggested */}
      <div className="flex flex-1 sm:px-20 py-5  ">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 sticky top-0 h-screen bg-white shadow rounded-lg ">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-xl mx-auto space-y-4 mt-[-22px]">
            <PostCard onPostSuccess={handlePostSuccess} />
            <AllPost reloadTrigger={reloadTrigger} />
          </div>
        </main>

        {/* Right Suggested Sidebar */}
        <aside className="hidden lg:block w-[300px] sticky top-0 h-screen ">
          <SuggestedSidebar />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
