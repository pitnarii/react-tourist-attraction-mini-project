import React, { useState, useEffect } from "react";
import axios from "axios";

function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.trim() === "") {
      setPosts(posts);
      return;
    }
    axios
      .get("http://localhost:4001/trips", {
        params: { keywords: search },
      })
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, [search]);
  console.log(posts);

  return (
    <div className="BlogPost flex flex-col items-center justify-center gap-4 pt-10">
      <h1 className="text-4xl font-bold text-blue-500">เที่ยวที่ไหนดี</h1>
      <div className="search-bar flex flex-col gap-2 pt-10 w-full max-w-5xl mx-auto px-4 ">
        <label htmlFor="search" className="pb-2 font-bold text-left">
          ค้นหาที่เที่ยวที่
        </label>
        <input
          type="search"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          className="w-full text-center border-0 border-b-2 border-gray-400 outline-none focus:border-b-blue-50r"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        
      </div>
      <div className="posts flex flex-col gap-20 pt-10">
        {posts.map((post) => (
          <div key={post.eid} className="post flex flex-row gap-10 items-start">
            <img
              src={post.photos[0]}
              alt={post.title}
              className="w-80 h-48 object-cover rounded-lg shrink-0"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-sm truncate max-w-[500px]">
                {post.description}
              </p>
              <a href={post.url} className="text-sm text-blue-500 underline">
                อ่านต่อ
              </a>
              <p className="text-sm text-gray-500 flex flex-row gap-2">
                หมวด
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="underline text-gray-500 cursor-pointer"
                    onClick={()=>setSearch(`${search} ${tag}`)}
                  >
                    {tag}
                  </span>
                ))}
              </p>
              <div className="sm-image flex flex-row gap-4 w-full">
                {post.photos.slice(1, 4).map((postImage, index) => (
                  <div key={index} className="relative">
                    <img
                      src={postImage}
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded-lg shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BlogPost;
