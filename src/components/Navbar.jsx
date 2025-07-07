import React, { useState } from 'react';
import { FaHome, FaSearch, FaPlus, FaUser, FaHandshake, FaCommentAlt } from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import FadeContent from '../blocks/Animations/FadeContent/FadeContent';
import SearchBar from './ui/SearchBar';
import ProfileCard from '../components/me/ProfileCard';
import ProfileModal from './ProfileModel';
import logoremove from '../assets/images/logo-remove.png'
import profileJPG from '../assets/images/profile.JPG'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-white w-full sticky top-0 z-50 shadow">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-blue-500 font-bold text-lg">
          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <img src={logoremove} alt="logo-remove.png" height={100} width={100} className='w-[50px] h-[50px] sm:w-[100px] sm:h-[80px]' />
          </FadeContent>
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center space-x-6 text-gray-600 text-2xl">
          <div className="flex flex-col items-center justify-center">
            <FaPlus className="cursor-pointer hover:text-gray-500" title="Post" />
            <p className="text-[10px]">Jobs</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaHome className="cursor-pointer hover:text-gray-500" title="Home" />
            <p className="text-[10px]">Home</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaHandshake className="cursor-pointer hover:text-gray-500" title="Connections" />
            <p className="text-[10px]">Connections</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FaCommentAlt className="cursor-pointer hover:text-gray-500" title="Messaging" />
            <p className="text-[10px]">Messaging</p>
          </div>

          <div className="relative flex flex-col items-center justify-center group">
            <FaUser className="cursor-pointer hover:text-gray-500" title="Me" />
            <p className="text-[10px]">Developer</p>

            <div className="absolute right-0 mt-2 hidden group-hover:block">
              <ProfileCard
                name="Muhammad Hamza"
                title="Full Stack Developer"
                handle="Hamzahere"
                status="Online"
                contactText="Contact Me"
                avatarUrl={profileJPG}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log('Contact clicked')}
                className="mt-[480px]"
              />
            </div>
          </div>


          <div className="flex flex-col items-center justify-center">

          <FaUser
            onClick={() => setShowProfile(true)}
            className="cursor-pointer hover:text-gray-500"
            title="Profile"
          />
          <p className="text-[10px]">Me</p>
          </div>

          {showProfile && (
            <ProfileModal onClose={() => setShowProfile(false)} />
          )}

          <LogoutButton />
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-600 focus:outline-none"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner py-2 px-4 text-blue-600 space-y-2">
          <div className="flex items-center space-x-2">
            <FaHome /> <span>Home</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaSearch /> <span>Search</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPlus /> <span>Add</span>
          </div>
          <div
            className="flex items-center space-x-2"
            onClick={() => setShowProfile(true)}
          >
            <FaUser /> <span>Profile</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>LogOut</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
