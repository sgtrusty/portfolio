'use client';
import { LegacyRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.scss';
import { opacity, background } from './anim';
import Nav from './nav';
import { useWindowScroll } from "@uidotdev/usehooks";

import { metadata as meta } from '@/app/config';
import { useClickAway } from '@uidotdev/usehooks';

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [{ x: scrollX, y: scrollY }, scrollTo] = useWindowScroll();
  const [animated, setAnimated] = useState<boolean>(false);
  
  const ref : LegacyRef<HTMLDivElement> = useClickAway(() => {
    setIsActive(false);
  }) as any;

  return (
    <>
      <motion.header
        className={`${styles.header} ${animated || (scrollY && scrollY > 12) ? styles.header_scrolled : ''}`}
        initial={{
          y: -80
        }}
        animate={{
          y: 0
        }}
        transition={{
          delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
          duration: 0.8
        }}
      >
        <div className="w-full" ref={ref}>
          <div className={styles.bar}>
            <Link href="/" className="flex items-center justify-center">
              <span className="text-md font-semibold transition-transform hover:translate-x-1 hover:translate-y-1">
                {meta.author.name}
              </span>
            </Link>
            <div onClick={() => setIsActive(!isActive)} className={styles.el}>
              <div className={styles.label}>
                <motion.p
                  variants={opacity}
                  animate={!isActive ? 'open' : 'closed'}
                >
                  Menu
                </motion.p>
                <motion.p variants={opacity} animate={isActive ? 'open' : 'closed'}>
                  Close
                </motion.p>
              </div>
              <div
                className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
              ></div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {isActive && <Nav setIsActive={setIsActive} />}
          </AnimatePresence>
        </div>
        <motion.div
          variants={background}
          initial="initial"
          animate={isActive ? 'open' : 'closed'}
          className={styles.background}
          onAnimationStart={() => setAnimated(true)}
          onAnimationComplete={() => setAnimated(isActive)}
        ></motion.div>
      </motion.header>
    </>
  );
};

export default Header;
