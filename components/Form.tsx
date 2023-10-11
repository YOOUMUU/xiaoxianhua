import { Post } from '@types';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

type FormProps = {
  type: string;
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="w-full max-2-full flex-start">
      <div className="container py-10">
        <h1 className="mb-4 text-4xl font-bold text-left">{type}小闲话</h1>
        <p className="text-lg text-black/50">
          {type}和分享你的小闲话，让我们一起记录起我们的点滴。
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-lg p-4 bg-gray-50"
        >
          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-base text-gray-700">
              你的小闲话
              <span className="ml-1 text-red-500">*</span>
            </span>

            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              placeholder="在此输入你的小闲话..."
              required
              className="rounded-lg p-2 min-h-[120px]"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-base text-gray-700">
              标签
              <span className="ml-1 text-red-500">*</span>
            </span>

            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="输入你的标签，比如：生活、工作、随想、摘抄等"
              required
              className="rounded-lg p-2"
            />
          </label>

          <div className="flex justify-end mx-3 md-5 gap-4 items-center">
            <Link href="/" className="text-gray-500 text-sm">
              取消
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="text-sm px-4 py-2 rounded bg-black text-white"
            >
              {submitting ? '提交中...' : '提交'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
