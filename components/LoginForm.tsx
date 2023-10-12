'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password: pass,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="p-4 border bg-white rounded-lg flex flex-col">
        <h1 className="text-xl font-bold mb-4 mx-auto">登录账号</h1>
        <form
          onSubmit={handleSubmit}
          action="POST"
          className="flex flex-col sm:w-96 w-72"
        >
          <div className="mb-4">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="text-gray-700 text-sm font-semibold"
              >
                邮箱
              </label>
              <span className="inline ml-0.5 text-red-500">*</span>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="输入邮箱..."
              // required
            />
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-bold mb-2"
              >
                密码
              </label>
              <span className="inline ml-0.5 text-red-500">*</span>
            </div>
            <input
              onChange={(e) => setPass(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="输入密码..."
            />
          </div>

          <button
            type="submit"
            className="mb-2 bg-zinc-300 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200"
          >
            登录
          </button>

          {error && (
            <div className="flex justify-start">
              <p className="py-0.5 px-3 text-sm rounded bg-red-500 text-white">
                {error}
              </p>
            </div>
          )}

          <Link
            href="/register"
            className="ml-auto mt-2 align-baseline font-semibold text-xs text-zinc-500 hover:text-zinc-800"
          >
            还没有账号？点此注册
          </Link>
        </form>
      </div>
      {/* 
      <button
        onClick={() => signIn('github')}
        className="mt-4 bg-zinc-600 hover:bg-white text-white hover:text-black text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline duration-200"
      >
        用 Github 登录
      </button> */}
    </section>
  );
};

export default LoginForm;
