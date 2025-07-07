import React from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      alert("Logout failed");
    } else {
      alert("Logout successful");
      navigate("/"); // Redirect to home or login page
    }
  };

  return (
    <button
      onClick={handleLogout}
      className=" text-blue px-4 py-2 rounded cursor-pointer hover:text-gray-900 flex flex-col items-center justify-center "
    >
      

      
<FaSignOutAlt className="text-2xl text-gray-500 hover:text-gary-600" title="Logout" />
              <p className='text-[10px]'>Logout</p>

    </button>
  );
};

export default LogoutButton;
