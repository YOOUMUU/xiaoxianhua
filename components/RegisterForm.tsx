'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const RegisterForm = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const passwordRegex = /^.{8,16}$/;

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target.value;
    if (passwordRegex.test(password)) {
      setPass(password);
      setError('');
    } else {
      setError('密码长度应为 8-16 位。');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !pass) {
      setError('请填写完整信息。');
      return;
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const UserExists = await resUserExists.json();

      if (UserExists) {
        setError('该用户名或邮箱已注册，请直接登录。');
        return;
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password: pass,
        }),
      });

      const resSignIn = await signIn('credentials', {
        email,
        password: pass,
        redirect: false,
      });

      if (resSignIn?.error) {
        setError(resSignIn.error);
        return;
      }

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.replace('/');
      } else {
        console.log('注册失败，请重试。');
        setError('注册失败，请重试。');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="p-4 border bg-white rounded-lg flex flex-col">
        <h1 className="text-xl font-bold mb-4 mx-auto">注册账号</h1>
        <form
          onSubmit={handleSubmit}
          action="POST"
          className="flex flex-col sm:w-96 w-72"
        >
          <div className="mb-4">
            <div className="mb-2">
              <label
                htmlFor="username"
                className="text-gray-700 text-sm font-semibold"
              >
                用户名
              </label>
              <span className="inline ml-0.5 text-red-500">*</span>
            </div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="username"
              id="username"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="你想要取什么用户名？"
            />
          </div>
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
              onChange={handlePasswordChange}
              type="password"
              name="password"
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="设置8-16位密码..."
            />
          </div>

          <button
            type="submit"
            className="mb-2 bg-zinc-300 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200"
          >
            注册并登录
          </button>

          {error && (
            <div className="flex justify-start">
              <p className="py-0.5 px-3 text-sm rounded bg-red-500 text-white">
                {error}
              </p>
            </div>
          )}

          <Link
            href="/login"
            className="ml-auto mt-4 align-baseline font-semibold text-xs text-zinc-500 hover:text-zinc-800"
          >
            已有账号？点此登录
          </Link>
        </form>
      </div>
      {/* <button
        onClick={() => signIn('github').then(() => router.push('/'))}
        className="mt-4 bg-zinc-600 hover:bg-white text-white hover:text-black text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline duration-200"
      >
        用 Github 登录
      </button> */}
    </section>
  );
};

export default RegisterForm;
