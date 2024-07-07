'use client';

import React, { useEffect, useState } from 'react';
import MotionWrap from '@/components/motion-wrap';
import Image from 'next/image';
import styles from './style.module.scss';

import { hero } from './config';
import { useTheme } from 'next-themes';

function Hero() {
  const { setTheme, resolvedTheme } = useTheme();
  const [ heroGradient, setHeroGradient ] = useState<string>();

  useEffect(() => {
    if (resolvedTheme == "dark") {
      const themeBg = "bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))]";
      setHeroGradient(themeBg);
    } else {
      const themeBg = "bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] ";
      setHeroGradient(themeBg);
    }
  }, [resolvedTheme]);

  return (
      <MotionWrap className="w-full pt-12 md:mt-0">
        <div className="grid items-center justify-center gap-4 px-4 text-center"> {/* md:px-6 lg:gap-10 */}
          <div className="">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-foreground/10">
              {hero.label}
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none">
              Hi, I&apos;m (<span className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl bg-clip-text text-transparent ${heroGradient} bg-[length:200%_auto] animate-gradient`}> {hero.name} </span>)
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {hero.description}
            </p>
          </div>
          <div
            className={`${styles.c_glitch} mx-auto aspect-square lg:aspect-video overflow-hidden h-96 -mb-8`}
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
