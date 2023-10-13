'use client';

import { useEffect, useState } from 'react';
import FeedCardList from './FeedCardList';
import { useRouter } from 'next/navigation';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchText) {
      fetchPosts();
    }

    if (searchText) {
      searchPosts();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    fetchPostsByTag(tag);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/post');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/post/search/${searchText}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsByTag = async (tag: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/post/tag/${tag}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="mt-6">
      <div className="container">
        <form onSubmit={handleSearchSubmit} className="w-full flex mb-10">
          <input
            type="text"
            placeholder="搜索内容、用户名或标签..."
            value={searchText}
            onChange={handleSearchChange}
            className="bg-white focus:shadow-md focus:shadow-gray-500/10 border w-full max-w-[560px] mx-auto pl-4 p-2 rounded-full focus:outline-none"
          />
        </form>
        {loading ? (
          <div className="text-lg text-gray-500 text-center">正在加载中...</div>
        ) : posts.length !== 0 ? (
          <FeedCardList data={posts} handleTagClick={handleTagClick} />
        ) : (
          <div className="text-lg text-gray-500 text-center">
            没有找到相关的小闲话
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
