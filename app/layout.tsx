import '@/styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: '小闲话 ｜ 记录些有的没的',
  description: '一个记录闲话的网站，by yooumuu.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body>
        <main>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
