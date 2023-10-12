'use client';

import { useState, useEffect, use } from 'react';
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
  const [username, setUsername] = useState('');

  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const postResponse = await fetch(`/api/users/${params?.id}/posts`);
      const userResponse = await fetch(`/api/users/${params?.id}`);
      const posts = await postResponse.json();
      const user = await userResponse.json();

      setPosts(posts);
      setUsername(user.username);
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
        name={username}
        desc={`${username}, 欢迎来到你的个人主页。你可以在此编辑你的小闲话。`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default page;
