// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';
// import user from '../assets/images/user.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ProfileModal = ({ onClose }) => {
//   const [profile, setProfile] = useState(null);
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [fullName, setFullName] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('user_id', user.id)
//       .single();

//     if (error) {
//       console.error(error);
//       return;
//     }

//     if (data?.avatar_url) {
//       const { data: urlData } = await supabase
//         .storage
//         .from('avatars')
//         .createSignedUrl(data.avatar_url, 60);
//       data.avatar_signed_url = urlData?.signedUrl;
//     }

//     setProfile(data);
//     setFullName(data.full_name || '');
//   };

//   const updateProfile = async () => {
//     setLoading(true);
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       toast.error("Please login", toastOptions);
//       setLoading(false);
//       return;
//     }

//     let avatar_url = profile?.avatar_url;

//     if (avatarFile) {
//       const ext = avatarFile.name.split('.').pop();
//       const filePath = `${user.id}/avatar.${ext}`;

//       const { error: uploadError } = await supabase
//         .storage
//         .from('avatars')
//         .upload(filePath, avatarFile, { upsert: true });

//       if (uploadError) {
//         toast.error("Upload failed", toastOptions);
//         console.error(uploadError);
//         setLoading(false);
//         return;
//       }

//       avatar_url = filePath;
//     }

//     const { error } = await supabase
//       .from('profiles')
//       .upsert({
//         user_id: user.id,
//         full_name: fullName,
//         avatar_url
//       });

//     if (error) {
//       toast.error("Update failed", toastOptions);
//       console.error(error);
//     } else {
//       toast.success("Profile updated!", toastOptions);
//       fetchProfile();
//     }

//     setAvatarFile(null);
//     setLoading(false);
//   };

//   const toastOptions = {
//     position: "top-right",
//     style: {
//       backgroundColor: '#2563eb', // Tailwind blue-600
//       color: 'white',
//       padding: '6px 10px',
//       fontSize: '12px',
//       minHeight: '30px',
//     },
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <ToastContainer theme="colored" />
//       <div className="bg-white p-6 rounded shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
//         <h2 className="text-lg font-bold mb-3">Your Profile</h2>

//         <div className="flex flex-col items-center space-y-2">
//           <div className="relative">
//             <img
//               src={profile?.avatar_signed_url || user}
//               alt="avatar"
//               className="w-24 h-24 rounded-full object-cover border"
//             />
//             <input
//               type="file"
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               onChange={(e) => setAvatarFile(e.target.files[0])}
//               title="Click to change avatar"
//             />
//           </div>

//           <input
//             type="text"
//             className="w-full border rounded px-2 py-1"
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />

//           <button
//             onClick={updateProfile}
//             disabled={loading}
//             className="bg-blue-500 text-white rounded px-4 py-2"
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;


import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import user from '../assets/images/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCamera } from 'react-icons/fi';

const ProfileModal = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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

    if (data?.avatar_url) {
      const { data: urlData } = await supabase
        .storage
        .from('avatars')
        .createSignedUrl(data.avatar_url, 60);
      data.avatar_signed_url = urlData?.signedUrl;
    }

    setProfile(data);
    setFullName(data.full_name || '');
  };

  const updateProfile = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please login", toastOptions);
      setLoading(false);
      return;
    }

    let avatar_url = profile?.avatar_url;

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
      fetchProfile();
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <ToastContainer theme="colored" />
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">X</button>
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
                onChange={(e) => setAvatarFile(e.target.files[0])}
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
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
