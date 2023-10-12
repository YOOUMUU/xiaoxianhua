'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';
import Nav from '@components/Nav';
import { Post } from '@types';

type Params = {
  params: {
    id: string;
  };
};

const page = ({ params }: Params) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const userName = searchParams.get('name');

  const [posts, setPosts] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, []);

  const handleEdit = (post: Post) => {
    router.push(`/edit?id=${post._id}`);
  };

  const handleDelete = (post: Post) => {
    const hasConfirmed = confirm('确定要删除这条小闲话吗？');

    if (hasConfirmed) {
      try {
        fetch(`/api/post/${post._id}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p: Post) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Nav />
      <Profile
        name="my"
        desc="欢迎来到你的个人主页"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default page;
