'use client';
import { use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { Post } from '@types';
import Nav from '@components/Nav';

const Edit = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    content: '',
    tag: '',
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        content: data.content,
        tag: data.tag,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert('Opps，小闲话Id未找到...');

    try {
      const response: Response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          userId: session?.user?.id,
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
    <>
      <Nav />
      <Form
        type="编辑"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}
      />
    </>
  );
};

export default Edit;
