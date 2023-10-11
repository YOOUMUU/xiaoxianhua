import Image from 'next/image';

const Feed = () => {
  return (
    <section className="mt-10">
      <div className="container">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Image
                alt="user avatar"
                src="/assets/images/user-profile.svg"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold">username</span>
            </div>
            <div>
              鱼和熊掌不可兼得。鱼和熊掌不可兼得。鱼和熊掌不可兼得。鱼和熊掌不可兼得。
            </div>
          </div>
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Image
                alt="user avatar"
                src="/assets/images/user-profile.svg"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold">username</span>
            </div>
            <div>鱼和熊掌不可兼得。</div>
          </div>
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Image
                alt="user avatar"
                src="/assets/images/user-profile.svg"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold">username</span>
            </div>
            <div>鱼和熊掌不可兼得。</div>
          </div>
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Image
                alt="user avatar"
                src="/assets/images/user-profile.svg"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold">username</span>
            </div>
            <div>鱼和熊掌不可兼得。</div>
          </div>
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Image
                alt="user avatar"
                src="/assets/images/user-profile.svg"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold">username</span>
            </div>
            <div>鱼和熊掌不可兼得。</div>
          </div>
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Image
                alt="user avatar"
                src="/assets/images/user-profile.svg"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold">username</span>
            </div>
            <div>鱼和熊掌不可兼得。</div>
          </div>
          <div className="w-full border rounded-lg p-4 text-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Image
                alt="user avatar"
                src="/assets/images/user-profile.svg"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold">username</span>
            </div>
            <div>鱼和熊掌不可兼得。</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
