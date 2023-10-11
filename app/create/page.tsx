'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { Post } from '@types';

const Create = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    content: '',
    tag: '',
  });

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response: Response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          // userId: session?.user?.name,
          content: post.content,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      type="创建"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default Create;
