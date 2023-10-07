'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState<any>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="w-full py-2">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="小闲话 logo"
            width={32}
            height={32}
            className="cursor-pointer"
          />
          <p className="font-xiaoxianhua hidden md:block text-xl ml-1">
            小閒話
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden font-serif">
          {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-4">
              <Link
                href="/create"
                className="py-1 px-3 bg-black rounded-full border border-black text-white"
              >
                发布闲话
              </Link>

              <button
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => signOut()}
                className="border border-black rounded-full py-1 px-3 hover:bg-black hover:text-white transition-all"
              >
                登出
              </button>

              <Link href="/profile">
                <Image
                  src="/assets/images/user-profile.svg"
                  alt="用户头像"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      signIn(provider.id)
                    }
                    className="py-1 px-3 bg-black rounded-full border border-black text-white"
                  >
                    登入
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex items-center">
          {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-4 cursor-pointer">
              <Image
                src="/assets/images/user-profile.svg"
                alt="菜单"
                width={24}
                height={24}
                onClick={() => setToggleDropdown((prevState) => !prevState)}
              />
              {toggleDropdown && (
                <div className="absolute top-12 right-4 bg-white rounded-md shadow-lg p-2 flex flex-col text-center">
                  <Link
                    href="/create"
                    onClick={() => setToggleDropdown(false)}
                    className="rounded py-2 px-4 hover:bg-black hover:text-white transition-all"
                  >
                    发布闲话
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setToggleDropdown(false)}
                    className="rounded py-2 px-4 hover:bg-black hover:text-white transition-all"
                  >
                    个人资料
                  </Link>
                  <button
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="rounded py-2 px-4 hover:bg-black hover:text-white transition-all"
                  >
                    登出
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      signIn(provider.id)
                    }
                    className="py-1 px-3 bg-black rounded-full border border-black text-white"
                  >
                    登入
                  </button>
                ))}
            </>
          )}
          {/* <button type="button" className="focus:outline-none">
            <Image
              src="/assets/images/user-profile.svg"
              alt="菜单"
              width={24}
              height={24}
            />
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;