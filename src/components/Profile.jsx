import React, { useEffect, useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { supabase } from '../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileUpdate = () => {
  const [fullName, setFullName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setFullName(data.full_name || '');
    }
  };

  const updateProfile = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please login", toastOptions);
      setLoading(false);
      return;
    }

    let avatar_url = null;

    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop();
      const filePath = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        toast.error("Upload failed", toastOptions);
        console.error(uploadError);
        setLoading(false);
        return;
      }

      avatar_url = filePath;
    }

    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        full_name: fullName,
        avatar_url
      });

    if (error) {
      toast.error("Update failed", toastOptions);
      console.error(error);
    } else {
      toast.success("Profile updated!", toastOptions);
      loadProfile(); // ✅ fetch updated data after successful update
    }

    setAvatarFile(null); // ✅ reset file input
    setLoading(false);
  };

  const toastOptions = {
    position: "top-right",
    style: {
      backgroundColor: '#2563eb', // Tailwind blue-600
      color: 'white',
      padding: '6px 10px',
      fontSize: '12px',
      minHeight: '30px',
    },
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow space-y-3">
      <ToastContainer theme="colored" />
      <div className="flex items-center gap-3">
        <HiOutlineUserCircle className="text-blue-500" size={36} />
        <h2 className="text-lg font-bold text-gray-700">Update Your Profile</h2>
      </div>

      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      <label className="block text-sm font-medium text-gray-600">Upload Avatar</label>
      <input
        type="file"
        onChange={(e) => setAvatarFile(e.target.files[0])}
        className="w-full text-sm"
      />

      <button
        onClick={updateProfile}
        disabled={loading}
        className="bg-blue-500 text-white rounded-full w-full py-2 hover:bg-blue-600 transition"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default ProfileUpdate;
