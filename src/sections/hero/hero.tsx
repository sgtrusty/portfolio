'use client';

import React, { useEffect, useRef, useState } from 'react';
import MotionWrap from '@/components/motion-wrap';
import Image from 'next/image';
import styles from './style.module.scss';

import { hero } from './config';
import { useTheme } from 'next-themes';
import { motion, useInView } from 'framer-motion';
import { useWindowSize } from '@uidotdev/usehooks';
import { Typed } from 'typed.ts';
import { cycle, sleep } from '@/utility/extended-js';

const heroTagTexts = [
  "I design and build beautiful websites.",
  "How about a quick collab? Your ideas, my code.",
  "Some jobs are better when they're finished.",
  "⚡☢️ Look out! There is a bear behind you 🐻.",
  "i think it's gone now 😆",
  "thinking🤔...",
  "hmpf...‌ ‌ ‌ ‌ ‌rock'n'roll! 🎸...",
  "...‌ ‌ hey!",
]

function Hero() {
  const [ heroGradient, setHeroGradient ] = useState<string>();
  const [ hovered, setHovered ] = useState<boolean>(false);
  const [ genIndex, setGenIndex ] = useState<number>(0);
  const [ heroText, setHeroText ] = useState<string>(heroTagTexts[0]);
  const [ regenerate, setRegenerate ] = useState<boolean>(true);
  
  const { resolvedTheme } = useTheme();
  const { width } = useWindowSize();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView || !regenerate) {
      return;
    }
    setRegenerate(false);
    generateHeroText();
  }, [isInView, regenerate]);

  const generateHeroText = async () => {
    const typed = new Typed({ callback: setHeroText });
    typed.type(heroTagTexts[genIndex], {
      eraseDelay: { min: 40, max: 80 },
      perLetterDelay: { min: 50, max: 85 },
      noSpecialCharErrors: true,
      errorMultiplier: 0.15
    });
    await typed.run();

    const toIndex = cycle(genIndex + 1, 0, heroTagTexts.length);
    setGenIndex(toIndex);
    setTimeout(() => setRegenerate(true), 5000);
  };

  const gradientThemeLight = "bg-[linear-gradient(to_right,theme(colors.red.200),theme(colors.red.100),theme(colors.amber.400),theme(colors.red.200),theme(colors.amber.400),theme(colors.amber.100),theme(colors.red.200))] ";
  const gradientThemeDark = "dark:bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))]";

  return (
      <MotionWrap className="w-full pt-12 md:mt-0 xl:pt-24">
        <div ref={ref} className="grid xl:flex xl:align-center justify-center gap-4 xl:space-x-32 px-4 text-center"> {/* md:px-6 lg:gap-10 */}
          <div
            className={`${styles.bg_grad_custom} basis-1/3 pt-8 pb-12 px-4 xl:px-0 xl:h-1/2 bg-black/15 rounded-3xl border border-yellow-300 dark:border-yellow-500 backdrop-blur-lg dark:bg-neutral-600/45 2xl:mt-8`}
          >
            <div className="inline-block rounded-lg bg-gray-100 mr-2 px-3 pb-1 text-sm dark:bg-foreground/10">
              {hero.label}
            </div>
            <h1 className="text-3xl mt-2 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none">
              <p className="text-amber-200 dark:text-foreground">Hi, I&apos;m &nbsp;</p>
              <p className="relative">
                <span className="text-2xl md:text-3xl text-red-500">&#123;</span>
                <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl bg-clip-text text-transparent ${gradientThemeLight} ${gradientThemeDark} bg-[length:200%_auto] animate-gradient`}> {hero.name} </span>
                <span className="text-2xl md:text-3xl text-red-500">&#125;</span>
              </p>
              {/* tooltip with email here? */}
            </h1>
            <p className="mx-auto max-w-[600px] text-amber-200 dark:text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {heroText}
            </p>
          </div>

          <motion.section
            whileInView={{ y: ["-80%", "-25%", "0"], opacity: [0, 1]}}
            transition={{ duration: 0.5 }}
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className={`${styles.c_glitch} mx-auto aspect-square lg:aspect-video overflow-hidden h-96 -mb-8`}
            >
              {Array.from({length: 5}, (_, index) => {
                return (<Image
                  key={index}
                  alt="personal portrait"
                  aria-hidden={index != 0}
                  className={`${styles.c_glitch__img} ${index == 0 ? "border border-yellow-300 dark:border-red-400 backdrop-blur-lg" : ""} rounded-xl object-cover object-center`}
                  sizes="100vw"
                  src={'/images/hero-2025.jpg'}
                  width="600"
                  height="320"
                  priority={true}
                />);
              })}
            </div>
            <motion.div
              animate={(width && width > 1280) ? {
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : "100%",
                display: hovered ? 'flex' : 'none'
              } : {display: 'none'}}
              tabIndex={-1}
              className="sm:hidden flex items-center justify-start absolute -right-16 2xl:left-auto 2xl:-right-32 -top-4 w-1/2"
              >
              <div className="w-3 overflow-hidden">
                <div className="h-4 bg-green-400 dark:bg-gray-500 rotate-45 transform origin-bottom-right rounded-sm"></div>
              </div>
              <div className="text-2xl bg-green-400 bg-gradient-to-r from-green-400 to-indigo-500 dark:from-gray-500 dark:to-red-300 p-4 my-6 rounded-lg flex-1">
                <h3 className="text-3xl mt-2 font-bold tracking-tighter">💡 Did you know; 😎?!...</h3>
                <p>&nbsp;</p>
                <p>🔥🔥🔥🔥 Hey there!</p>
                <p>&nbsp;</p>
                <p>Well, I put my heart💜 into my work 💼, I believe that&apos;s why it ends up looking so cool❄️.</p>
                {/* on second/third popover, easter egg: */}
                {/* add comment: by the way -- can you find all the cool little features I've added? send me an e-mail with the list of things you've found. */}
                {/* maybe make it glitch only on that call? or extra hard glitching */}
                {/* maybe alternate opened side? */}
              </div>
            </motion.div>
          </motion.section>
        </div>
      </MotionWrap>
  );
}

export default Hero;
