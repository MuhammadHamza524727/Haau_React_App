
import React, { useState } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const PostCard = ({ onPostSuccess }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file && !message.trim()) {
      alert("Please add a message or media");
      return;
    }

    setLoading(true);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const fullName = user.user_metadata?.full_name || "Anonymous";
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
        alert("Image upload failed");
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
      alert("Post creation failed");
    } else {
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
            src="/src/assets/images/profile.JPG"
            alt="profile"
            className="w-10 h-10 rounded-full"
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
              <img src="/src/assets/images/logo-remove.png" alt="ai" height={40} width={40} />
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
