import Cursor from '@/components/cursor/cursor';
import SmoothScroll from '@/components/smooth-scroll';
import Preloader from '@/components/preloader/preloader';
import LandingPage from './landing';

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader>
        <LandingPage/>
      </Preloader>
      <Cursor/>
    </SmoothScroll>
  );
}
