import { Header } from '@/sections';
import Cursor from '@/components/cursor/cursor';
import SmoothScroll from '@/components/smooth-scroll';

export default function ProjectLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      {/* <Preloader /> */}
      <div className="flex min-h-[100dvh] flex-col">
        <Header />
        <main className="my-14 flex-1">{children}</main>
      </div>
      <Cursor />
    </SmoothScroll>
  );
}
