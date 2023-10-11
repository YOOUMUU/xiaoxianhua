import Feed from '@components/Feed';
import Nav from '@components/Nav';

const Home = () => {
  return (
    <>
      <section className="w-full pt-10">
        <div className="container mx-auto flex flex-col justify-center items-center text-center">
          <h1 className="font-xiaoxianhua text-6xl">- 小閒話 -</h1>
          <p className="font-serif text-lg mt-4">
            小闲话是一个碎碎念的地方，记录、探索、分享一些有意思的想法。
          </p>
        </div>
      </section>
      <Feed />
    </>
  );
};

export default Home;
