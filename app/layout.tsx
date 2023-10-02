import '@/styles/global.css';

export const metadata = {
  title: '小闲话 ｜ 记录些有的没的',
  description: '一个记录闲话的网站，by yooumuu.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="zh">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
