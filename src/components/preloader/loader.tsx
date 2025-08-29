'use client';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOADER_ANIM_OPACITY, LOADER_ANIM_SLIDEUP } from './config';

export default function Loading() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // This hook is still needed to get the window dimensions for the SVG path
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div
      variants={LOADER_ANIM_SLIDEUP}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={LOADER_ANIM_OPACITY} initial="initial" animate="enter">
            Loading...
          </motion.p>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}