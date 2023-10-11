import Link from 'next/link';

const Register = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-black">
      <div className="p-4 border bg-white rounded-lg flex flex-col">
        <h1 className="text-xl font-bold mb-4 mx-auto">注册账号</h1>
        <form action="POST" className="flex flex-col sm:w-96 w-72">
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
              type="text"
              name="username"
              id="username"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="你想要取什么用户名？"
              required
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
              type="email"
              name="email"
              id="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="输入邮箱..."
              required
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
              type="password"
              name="password"
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="设置密码..."
            />
          </div>

          <button
            type="submit"
            className="mb-2 bg-zinc-300 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200"
          >
            注册并登录
          </button>

          <div className="flex justify-start">
            <p className="py-0.5 px-3 text-sm rounded bg-red-500 text-white">
              error message
            </p>
          </div>

          <Link
            href="/login"
            className="ml-auto mt-4 align-baseline font-semibold text-xs text-zinc-500 hover:text-zinc-800"
          >
            已有账号？点此登录
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
