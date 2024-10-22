import React, { useContext, useState, useMemo } from "react";
import { Context } from "../context/Context";

const PostList = () => {
  const { posts } = useContext(Context);
  const [selectedUserId, setSelectedUserId] = useState("");

  const userIds = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.userId)));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return selectedUserId
      ? posts.filter((post) => post.userId === Number(selectedUserId))
      : posts;
  }, [posts, selectedUserId]);

  return (
    <div className="post-list">
      <div style={{ width: "100%" }}>
        <h2>Posts degli utenti</h2>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Tutti gli autori</option>
          {userIds.map((userId) => (
            <option key={userId} value={userId}>
              ID autore: {userId}
            </option>
          ))}
        </select>
      </div>

      {filteredPosts.map((post) => (
        <div key={post.id} className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-author">ID autore: {post.userId}</p>
          <p className="post-body">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
