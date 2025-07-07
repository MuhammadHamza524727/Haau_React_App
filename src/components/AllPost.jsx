import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaCommentAlt, FaShareAlt } from "react-icons/fa";
import { supabase } from "../supabaseClient";

const AllPost = ({ reloadTrigger }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);  // 🟢 New: store user profile
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    getUser();
    fetchPosts();
  }, [reloadTrigger]);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      fetchUserProfile(user.id);
    }
  };

  const fetchUserProfile = async (uid) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", uid)
      .single();

    if (error) {
      console.error("Profile fetch error:", error.message);
      return;
    }

    if (data?.avatar_url) {
      const { data: urlData } = await supabase
        .storage
        .from("avatars")
        .createSignedUrl(data.avatar_url, 60);

      setUserProfile({
        ...data,
        avatar_signed_url: urlData?.signedUrl || null
      });
    } else {
      setUserProfile(data);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select(`*, likes(user_id), comments(*)`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      const postsWithUrls = await Promise.all(
        data.map(async (post) => {
          if (post.image_url) {
            const { data: signedUrlData } = await supabase
              .storage
              .from("posts")
              .createSignedUrl(post.image_url, 60);
            return { ...post, signed_url: signedUrlData?.signedUrl };
          }
          return post;
        })
      );
      setPosts(postsWithUrls);
    }
    setLoading(false);
  };

  const toggleLike = async (post_id, isLiked) => {
    if (!userId) {
      alert("Login required");
      return;
    }

    if (isLiked) {
      await supabase.from("likes").delete().eq("user_id", userId).eq("post_id", post_id);
    } else {
      await supabase.from("likes").insert({ user_id: userId, post_id });
    }
    fetchPosts();
  };

  const handleCommentSubmit = async (post_id, text) => {
    if (!userId) {
      alert("Login required");
      return;
    }

    if (!text.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    const fullName = user.user_metadata?.full_name || "Anonymous";

    await supabase
      .from("comments")
      .insert({ user_id: user.id, post_id, comment: text, user_name: fullName });

    fetchPosts();
    setCommentInputs({ ...commentInputs, [post_id]: "" });
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="w-full h-1 bg-blue-100 max-w-md mx-auto">
          <div className="h-1 bg-blue-500 animate-pulse w-full"></div>
        </div>
      )}

      {/* 🔥 User profile header */}
      {userProfile && (
        <div className="max-w-md mx-auto flex items-center space-x-3 p-2 bg-white rounded shadow">
          <img
            src={userProfile.avatar_signed_url || "/src/assets/images/user.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-semibold">{userProfile.full_name || "Anonymous"}</p>
        </div>
      )}

      {posts.map((post) => {
        const isLiked = post.likes.some((like) => like.user_id === userId);
        return (
          <div key={post.id} className="p-4 rounded-lg max-w-md mx-auto bg-white shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src="/src/assets/images/user.png"
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              
              <div>
                <p className="font-semibold text-gray-700 text-sm">
                  {post.user_name || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-700 p-2">
              {post.message.length > 150 && !expandedPosts[post.id]
                ? `${post.message.slice(0, 150)}...`
                : post.message}

              {post.message.length > 150 && (
                <button
                  className="text-blue-500 ml-1 text-xs"
                  onClick={() =>
                    setExpandedPosts({
                      ...expandedPosts,
                      [post.id]: !expandedPosts[post.id],
                    })
                  }
                >
                  {expandedPosts[post.id] ? "See less" : "See more"}
                </button>
              )}
            </div>

            {post.signed_url && (
              <img src={post.signed_url} alt="post" className="w-full rounded mb-2" />
            )}

            <div className="flex justify-between text-sm mt-2">
              <button
                className={`flex items-center space-x-1 ${
                  isLiked ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() => toggleLike(post.id, isLiked)}
              >
                <FaThumbsUp /> <span>{isLiked ? "Liked" : "Like"}</span>
              </button>
              <button
                className="flex items-center space-x-1 text-gray-600"
                onClick={() =>
                  setCommentInputs({
                    ...commentInputs,
                    [post.id]: commentInputs[post.id] || "",
                  })
                }
              >
                <FaCommentAlt /> <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600">
                <FaShareAlt /> <span>Share</span>
              </button>
            </div>

            {commentInputs[post.id] !== undefined && (
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id]}
                  onChange={(e) =>
                    setCommentInputs({
                      ...commentInputs,
                      [post.id]: e.target.value,
                    })
                  }
                />
                <button
                  className="bg-blue-500 text-white rounded px-2 text-sm"
                  onClick={() =>
                    handleCommentSubmit(post.id, commentInputs[post.id])
                  }
                >
                  Send
                </button>
              </div>
            )}

            {post.comments.length > 0 && (
              <div className="mt-2 space-y-1">
                {post.comments.map((cmt) => (
                  <div key={cmt.id} className="bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <img
                        src="/src/assets/images/user.png"
                        alt="user"
                        className="w-4 h-4 rounded-full"
                      />
                      <p className="text-xs text-gray-800 font-semibold">
                        {cmt.user_name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 pl-6">{cmt.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500">Start Your Journey</p>
      )}
    </div>
  );
};

export default AllPost;
