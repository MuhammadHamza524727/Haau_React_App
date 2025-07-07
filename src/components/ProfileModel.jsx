import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import user from '../assets/images/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCamera, FiX } from 'react-icons/fi';

const ProfileModal = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('User:', user); // Debug: Check if user is logged in
      const userId = user?.id;
      if (!userId) {
        toast.error("Please login", toastOptions);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      console.log('Profile Data:', data); // Debug: Check profile data
      console.log('Profile Error:', error); // Debug: Check for errors

      if (error) {
        console.error('Fetch Profile Error:', error);
        return;
      }

      let avatar_signed_url = null;
      if (data?.avatar_url) {
        const { data: urlData, error: urlError } = await supabase
          .storage
          .from('avatars')
          .createSignedUrl(data.avatar_url, 60);
        console.log('Signed URL:', urlData?.signedUrl); // Debug: Check signed URL
        console.log('URL Error:', urlError); // Debug: Check for errors
        if (urlError) console.error('Signed URL Error:', urlError);
        avatar_signed_url = urlData?.signedUrl;
      }

      setProfile({
        ...data,
        avatar_signed_url
      });
      setFullName(data.full_name || '');
    } catch (error) {
      console.error('Unexpected Error in fetchProfile:', error);
      toast.error("An unexpected error occurred", toastOptions);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      toast.error("Please upload a PNG or JPG image", toastOptions);
      return;
    }
    setAvatarFile(file);
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('User for Update:', user); // Debug: Check user
      const userId = user?.id;
      if (!userId) {
        toast.error("Please login", toastOptions);
        setLoading(false);
        return;
      }

      let avatar_url = profile?.avatar_url;

      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop();
        const filePath = `${userId}/avatar.${ext}`;
        console.log('Uploading file:', avatarFile, 'to path:', filePath); // Debug: Check file and path

        const { error: uploadError } = await supabase
          .storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });
        console.log('Upload Error:', uploadError); // Debug: Check for errors

        if (uploadError && uploadError.message !== 'The resource already exists') {
          toast.error("Upload failed", toastOptions);
          console.error('Upload Error:', uploadError);
          setLoading(false);
          return;
        }

        avatar_url = filePath;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          full_name: fullName,
          avatar_url
        });
      console.log('Update Error:', error); // Debug: Check for errors

      if (error) {
        toast.error("Update failed", toastOptions);
        console.error('Update Profile Error:', error);
      } else {
        toast.success("Profile updated!", toastOptions);
        await fetchProfile(); // Fetch updated profile with new signed URL
      }
    } catch (error) {
      console.error('Unexpected Error in updateProfile:', error);
      toast.error("An unexpected error occurred", toastOptions);
    }

    setAvatarFile(null);
    setLoading(false);
  };

  const toastOptions = {
    position: "top-right",
    style: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '6px 10px',
      fontSize: '12px',
      minHeight: '30px',
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <ToastContainer theme="colored" />
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX className="text-xl" />
        </button>
        <h2 className="text-xl font-bold text-center mb-6">Edit Profile</h2>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <img
              src={profile?.avatar_signed_url || user}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <label className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
              <FiCamera className="text-white text-xl" />
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <button
            onClick={updateProfile}
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;