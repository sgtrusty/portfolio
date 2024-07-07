'use client';

import React, { useEffect, useState } from 'react';
import MotionWrap from '@/components/motion-wrap';
import Image from 'next/image';
import styles from './style.module.scss';

import { hero } from './config';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useWindowSize } from '@uidotdev/usehooks';
import { Typed } from 'typed.ts';
import { cycle, sleep } from '@/utility/extended-js';

const heroTagTexts = [
  "I design and build beautiful websites.",
  "How about a quick collab? Your ideas, my code.",
  "Some jobs are better left finished.",
  "⚡☢️ Look out! There is a bear behind you 🐻.",
  "just kidding 😆",
  "thinking🤔...",
  "hmpf...‌ ‌ ‌ ‌ ‌rock'n'roll! 🎸...",
  "...‌ ‌ hey!",
  "hm?‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ",
]

function Hero() {
  const { setTheme, resolvedTheme } = useTheme();
  const [ heroGradient, setHeroGradient ] = useState<string>();
  const [ hovered, setHovered ] = useState<boolean>(false);
  const { width } = useWindowSize();
  const [ genIndex, setGenIndex ] = useState<number>(0);
  const [ heroText, setHeroText ] = useState<string>(heroTagTexts[0]);

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
    await sleep(5000);
    console.log('toIndex', toIndex)
    setGenIndex(toIndex);
  };

  useEffect(() => {
    generateHeroText();
  }, [genIndex])

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
              Hi, I&apos;m &nbsp;<span className="text-2xl md:text-3xl text-red-500">&#123;</span><span className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl bg-clip-text text-transparent ${heroGradient} bg-[length:200%_auto] animate-gradient`}> {hero.name} </span><span className="text-2xl md:text-3xl text-red-500">&#125;</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {heroText}
            </p>
          </div>
          {/* add https://www.radix-ui.com/primitives/docs/components/hover-card here? */}
          <div
            className={`${styles.c_glitch} mx-auto aspect-square lg:aspect-video overflow-hidden h-96 -mb-8`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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
        <motion.div
          animate={(width && width > 1024) ? {
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : "100%",
            display: hovered ? 'flex' : 'none'
          } : {display: 'none'}}
          className="sm:hidden flex items-center justify-start absolute right-24 top-1/4 w-1/4"
          >
          <div className="w-3 overflow-hidden">
            <div className="h-4 bg-green-400 rotate-45 transform origin-bottom-right rounded-sm"></div>
          </div>
          <div className="text-2xl bg-gradient-to-r from-green-400 to-indigo-500 p-4 my-6 rounded-lg flex-1">
            <p>🔥🔥🔥🔥 Hey there!</p>
            <p>&nbsp;</p>
            <p>💡 Did you know; I love my job 😎?!...</p>
            <p>&nbsp;</p>
            <p>Well, I really do. I put my heart💜 into my work 💼, I believe that's why it ends up looking so cool❄️.</p>
            {/* on second/third popover, easter egg: */}
            {/* add comment: by the way -- can you find all the cool little features I've added? send me an e-mail with the list of things you've found. */}
            {/* maybe make it glitch only on that call? or extra hard glitching */}
            {/* maybe alternate opened side? */}
          </div>
        </motion.div>
      </MotionWrap>
  );
}

export default Hero;
