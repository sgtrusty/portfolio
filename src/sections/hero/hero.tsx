'use client';

import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import HeroCard from './hero-card';
import HeroAvatar from './hero-avatar';
import { useIntersectionObserver } from '@uidotdev/usehooks';

function Hero() {
  const [ref, intersection] = useIntersectionObserver({ threshold: 0.85 });

  return (
    <MotionWrap className="w-full pt-12 md:mt-0 xl:pt-24">
      <div
        className="xl:align-center grid justify-center gap-4 px-4 text-center xl:flex xl:space-x-2"
        ref={ref}
        style={{
          filter: !intersection?.isIntersecting ? "grayscale(100%)" : "unset",
          transition: "filter 1s ease-in-out",
        }}
      >
        <HeroCard/>
        <HeroAvatar/>
      </div>
    </MotionWrap>
  );
}

export default Hero;
