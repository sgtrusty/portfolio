'use client';
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
  
import styles from './style.module.scss';
import { MessageProvider } from '@/components/messages/MessageContext';
  
export default function LandingPage() {
    return (
        <MessageProvider>
        <div className="flex min-h-[100dvh] flex-col">
        <Header />
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
        </MessageProvider>
    );
  }
  