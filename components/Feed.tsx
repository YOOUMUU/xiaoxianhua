'use client';

import { useEffect, useState } from 'react';
import FeedCardList from './FeedCardList';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="mt-6">
      <div className="container">
        <form className="w-full flex mb-10">
          <input
            type="text"
            placeholder="搜索用户名或标签..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="bg-white focus:shadow-md focus:shadow-gray-500/10 border w-full max-w-[560px] mx-auto pl-4 p-2 rounded-full focus:outline-none"
          />
        </form>
        <FeedCardList data={posts} handleTagClick={() => {}} />
        {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold">username</span>
            </div>
            <div>
              鱼和熊掌不可兼得。鱼和熊掌不可兼得。鱼和熊掌不可兼得。鱼和熊掌不可兼得。
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Feed;
