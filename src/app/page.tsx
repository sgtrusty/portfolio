import {
  Header,
  Hero,
  Skills,
  Experience,
  Testimonials,
  Projects,
  Contact,
  Footer
} from '@/sections';

import Preloader from '@/components/preloader/preloader';
import Cursor from '@/components/cursor/cursor';
import SmoothScroll from '@/components/smooth-scroll';

import styles from './style.module.scss';

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <div className="flex min-h-[100dvh] flex-col">
        <Header loader={true} />
        <main className="flex-1">
          <section className={styles.body}>
            <Hero />
            <Projects />
          </section>
          <Skills />
          <Experience />
          {/* <Testimonials /> */}
          <Contact />
          <Footer />
        </main>
      </div>
      <Cursor />
    </SmoothScroll>
  );
}
