import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './style.module.scss';
import { opacity } from '../../anim';

interface IndexProps {
  src: string;
  isActive: boolean;
}

const NavImage: React.FC<IndexProps> = ({ src, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? 'open' : 'closed'}
      className={styles.imageContainer}
    >
      <Image
        className='object-cover h-full'
        src={`/images/nav/${src}`}
        alt={'An image to describe the selected link'}
        width="1024"
        height="720"
        // priority={true}
      />
    </motion.div>
  );
};

export default NavImage;
