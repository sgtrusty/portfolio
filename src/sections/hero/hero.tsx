'use client';

import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import Image from 'next/image';
import styles from './style.module.scss';

import { hero } from './config';

function Hero() {

  return (
    <MotionWrap className="w-full pt-12 md:mt-0">
      <div className="grid items-center justify-center gap-4 px-4 text-center"> {/* md:px-6 lg:gap-10 */}
        <div className="">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-foreground/10">
            {hero.label}
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Hi, I&apos;m {hero.name}
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {hero.description}
          </p>
        </div>
        <div
          className={`${styles.c_glitch} mx-auto aspect-video h-96`}
        >
          {Array.from({length: 5}, (_, index) => {
            return (<Image
              key={index}
              alt="personal portrait"
              aria-hidden={index != 0}
              className={`${styles.c_glitch__img} rounded-xl object-cover object-center`}
              sizes="100vw"
              src={'/images/hero.jpg'}
              width="600"
              height="320"
              priority={true}
            />);
          })}
        </div>
      </div>
    </MotionWrap>
  );
}

export default Hero;
