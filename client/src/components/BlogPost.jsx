import React, { useState, useEffect } from 'react';
import axios from "axios";

function BlogPost() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/trips", {
        params: { keywords: "เกาะ" },
      })
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(posts);
  return (
    <div className="BlogPost flex flex-col items-center justify-center gap-4 pt-10">
    <h1 className="text-4xl font-bold">เที่ยวที่ไหนดี</h1>
    <div className="search-bar flex flex-col gap-2 pt-10">
      <label htmlFor="search" className="pb-2">ค้นหาที่เที่ยวที่</label>
      <input id="search" type="text" placeholder="หาที่เที่ยวแล้วไปกัน..." />
    </div>
    <div className="posts flex flex-col gap-4 pt-10">
      {posts.map((post) => (
        <div key={post.eid} className="post flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-sm">{post.description}</p>
        </div>
      ))}
    </div>
  </div>

  );
}

export default BlogPost;