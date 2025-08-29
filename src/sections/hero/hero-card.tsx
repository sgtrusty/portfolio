'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './hero-card.module.scss';

import { hero } from './config';
import { useInView } from 'framer-motion';
import { Typed } from 'typed.ts';
import { cycle } from '@/utility/extended-js';

const heroTagTexts = [
  "Engineering elegant solutions to complex problems.",
  "Writing clean code is the simple guide.",
  "I've done the math. Success guaranteed!",
  "⚡☢️ Look out! Bear alert 🐻.",
  "ah nope. nevermind 💬",
  "thinking🤔...",
  "hmpf...‌ ‌ ‌ ‌ ‌1 + 1 = .. uh.. er..",
  "...‌ ‌ 2 ! Operation completed."
];

function HeroCard() {
  const [genIndex, setGenIndex] = useState<number>(0);
  const [heroText, setHeroText] = useState<string>(heroTagTexts[0]);
  const [regenerate, setRegenerate] = useState<boolean>(true);

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

  const gradientThemeLight =
    'bg-[linear-gradient(to_right,theme(colors.red.200),theme(colors.red.100),theme(colors.amber.400),theme(colors.red.200),theme(colors.amber.400),theme(colors.amber.100),theme(colors.red.200))] ';
  const gradientThemeDark =
    'dark:bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))]';

  return (
        <div
          ref={ref}
          className={`${styles.hero_card} basis-1/3 rounded-3xl border border-yellow-300 bg-black/15 px-4 pb-12 pt-8 backdrop-blur-lg dark:border-yellow-500 dark:bg-neutral-600/45 xl:h-1/2 xl:px-0 2xl:mt-8`}
        >
          <div className="mr-2 inline-block rounded-lg bg-gray-100 px-3 pb-1 text-sm dark:bg-foreground/10">
            {hero.label}
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none">
            <p className="text-amber-200 dark:text-foreground">
              Hi, I&apos;m &nbsp;
            </p>
            <p className="relative">
              <span className="text-2xl text-red-500 md:text-3xl">&#123;</span>
              <span
                className={`bg-clip-text text-4xl text-transparent  sm:text-5xl md:text-6xl lg:text-6xl ${gradientThemeLight} ${gradientThemeDark} animate-gradient bg-[length:200%_auto]`}
              >
                {" " + hero.name + " "}
              </span>
              <span className="text-2xl text-red-500 md:text-3xl">&#125;</span>
            </p>
            {/* tooltip with email here? */}
          </h1>
          <p className="mx-auto max-w-[600px] text-amber-200 dark:text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {heroText}
          </p>
        </div>
  );
}

export default HeroCard;
