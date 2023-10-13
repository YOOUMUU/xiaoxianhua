'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Post } from '@types';

type FeedCardProps = {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: () => void;
};

const FeedCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: FeedCardProps) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);
    setTimeout(() => {
      setCopied('');
    }, 2000);
  };

  return (
    <div className="mx-2 h-auto w-full border rounded-lg text-gray-600">
      <div className="p-4 pb-2">
        <div className="flex justify-between items-center gap-2 mb-2">
          <span className="font-bold text-lg">{post?.creator?.username}</span>
          <div
            className="p-1 rounded bg-gray-50 cursor-pointer"
            onClick={handleCopy}
          >
            <Image
              width="16"
              height="16"
              alt="copy icon"
              src={
                copied === post.content
                  ? '/assets/icons/tick.svg'
                  : '/assets/icons/copy.svg'
              }
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className="text-lg mb-4">{post.content}</p>
          <p
            onClick={() => handleTagClick && handleTagClick(post.tag)}
            className="cursor-pointer text-sm py-0.5 px-1 mb-2 bg-gray-100 rounded font-medium text-gray-500"
          >
            #{post.tag}
          </p>
        </div>
      </div>
      {session?.user.id === post?.creator?._id &&
        pathname.includes('profile') && (
          <div className="grid grid-cols-2 border-t w-full">
            <p
              onClick={() => handleEdit && handleEdit(post)}
              className="text-center text-sm py-1 px-4 cursor-pointer hover:bg-gray-50"
            >
              编辑
            </p>
            <p
              onClick={handleDelete}
              className="text-center text-sm py-1 px-4 cursor-pointer border-l hover:bg-gray-50 hover:text-red-400"
            >
              删除
            </p>
          </div>
        )}
    </div>
  );
};

export default FeedCard;
