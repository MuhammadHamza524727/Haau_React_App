import React from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      toast.error("Logout failed", {
        position: "top-right",
       style: {
    backgroundColor: '#2563eb', 
    color: 'white',
    padding: '6px 10px',
    fontSize: '12px',
    minHeight: '30px',
  },
      });
    } else {
      toast.success("Logout successful", {
        position: "top-right",
       style: {
    backgroundColor: '#2563eb', 
    color: 'white',
    padding: '6px 10px',
    fontSize: '12px',
    minHeight: '30px',
  },
      });
      setTimeout(() => navigate("/"), 1500); 
    }
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <button
        onClick={handleLogout}
        className="text-blue px-4 py-2 rounded cursor-pointer hover:text-gray-900 flex flex-col items-center justify-center"
      >
        <FaSignOutAlt className="text-2xl text-gray-500 hover:text-gray-600" title="Logout" />
        <p className='text-[10px]'>Logout</p>
      </button>
    </>
  );
};

export default LogoutButton;
