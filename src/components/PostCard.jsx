// import React, { useState } from "react";
// import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { supabase } from "../supabaseClient";
// import Swal from 'sweetalert2';
// import profile from '../assets/images/profile.JPG';
// import logoremove from '../assets/images/logo-remove.png';

// const PostCard = ({ onPostSuccess }) => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file && !message.trim()) {
//       Swal.fire({
//         icon: 'info',
//         title: 'Please add a message or media',
//       });
//       return;
//     }

//     setLoading(true);
//     const { data: { user }, error: authError } = await supabase.auth.getUser();

//     if (authError || !user) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Please login first',
//       });
//       setLoading(false);
//       return;
//     }

//     const fullName = user.user_metadata?.full_name || "User";
//     let filePath = null;

//     if (file) {
//       const fileExt = file.name.split('.').pop();
//       filePath = `${user.id}/${Date.now()}.${fileExt}`;
//       const { error: uploadError } = await supabase
//         .storage
//         .from('posts')
//         .upload(filePath, file);

//       if (uploadError) {
//         console.error("Upload error:", uploadError.message);
//         Swal.fire({
//           icon: 'error',
//           title: 'Image upload failed',
//         });
//         setLoading(false);
//         return;
//       }
//     }

//     const { error: insertError } = await supabase
//       .from('posts')
//       .insert({
//         user_id: user.id,
//         user_name: fullName,
//         image_url: filePath,
//         message: message.trim()
//       });

//     if (insertError) {
//       console.error("Insert error:", insertError.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Post creation failed',
//       });
//     } else {
//       Swal.fire({
//         icon: 'success',
//         title: 'Post created successfully',
//       });
//       setMessage("");
//       setFile(null);
//       if (onPostSuccess) onPostSuccess();
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="w-full p-4 space-y-2 rounded-lg overflow-hidden max-w-md mx-auto bg-white shadow-sm">
//       <div className="flex flex-col gap-2 relative">
//         <div className="flex items-center w-full space-x-2 relative">
//           <img
//             src={profile}
//             alt="profile"
//             className="w-10 h-10 rounded-full"
//           />
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Write a post..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300 pr-10"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleUpload();
//               }}
//             />
//             <FaPaperPlane
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
//               onClick={handleUpload}
//             />
//           </div>
//         </div>

//         {loading && (
//           <div className="w-full h-1 bg-blue-100 overflow-hidden rounded">
//             <div className="h-full bg-blue-500 animate-loading-bar"></div>
//           </div>
//         )}

//         <div className="flex space-x-2 items-center justify-around text-gray-500">
//           <Link to="/postdoctorpage">
//             <div className="flex items-center">
//               <img src={logoremove} alt="ai" height={40} width={40} />
//               <p className="text-sm font-medium">Post Ai</p>
//             </div>
//           </Link>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <FaSmile className="text-yellow-600" />
//             <p className="text-sm font-medium">Emotions</p>
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <FaPaperclip className="text-green-700" />
//             <p className="text-sm font-medium">Media</p>
//             <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;


import React, { useEffect, useState } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Swal from 'sweetalert2';
import userIcon from '../assets/images/user.png'; // Default icon
import logoremove from '../assets/images/logo-remove.png';

const PostCard = ({ onPostSuccess }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error("Profile fetch error:", error.message);
      setProfileUrl(null);
      return;
    }

    if (data?.avatar_url) {
      const { data: urlData, error: urlError } = await supabase
        .storage
        .from('avatars')
        .createSignedUrl(data.avatar_url, 60);

      if (urlError) {
        console.error("Signed URL error:", urlError.message);
        setProfileUrl(null);
      } else {
        setProfileUrl(urlData.signedUrl);
      }
    } else {
      setProfileUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file && !message.trim()) {
      Swal.fire({
        icon: 'info',
        title: 'Please add a message or media',
      });
      return;
    }

    setLoading(true);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first',
      });
      setLoading(false);
      return;
    }

    const fullName = user.user_metadata?.full_name || "User";
    let filePath = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase
        .storage
        .from('posts')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        Swal.fire({
          icon: 'error',
          title: 'Image upload failed',
        });
        setLoading(false);
        return;
      }
    }

    const { error: insertError } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        user_name: fullName,
        image_url: filePath,
        message: message.trim()
      });

    if (insertError) {
      console.error("Insert error:", insertError.message);
      Swal.fire({
        icon: 'error',
        title: 'Post creation failed',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Post created successfully',
      });
      setMessage("");
      setFile(null);
      if (onPostSuccess) onPostSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-4 space-y-2 rounded-lg overflow-hidden max-w-md mx-auto bg-white shadow-sm">
      <div className="flex flex-col gap-2 relative">
        <div className="flex items-center w-full space-x-2 relative">
          <img
            src={profileUrl || userIcon}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Write a post..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300 pr-10"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpload();
              }}
            />
            <FaPaperPlane
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
              onClick={handleUpload}
            />
          </div>
        </div>

        {loading && (
          <div className="w-full h-1 bg-blue-100 overflow-hidden rounded">
            <div className="h-full bg-blue-500 animate-loading-bar"></div>
          </div>
        )}

        <div className="flex space-x-2 items-center justify-around text-gray-500">
          <Link to="/postdoctorpage">
            <div className="flex items-center">
              <img src={logoremove} alt="ai" height={40} width={40} />
              <p className="text-sm font-medium">Post Ai</p>
            </div>
          </Link>

          <label className="flex items-center gap-2 cursor-pointer">
            <FaSmile className="text-yellow-600" />
            <p className="text-sm font-medium">Emotions</p>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <FaPaperclip className="text-green-700" />
            <p className="text-sm font-medium">Media</p>
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
