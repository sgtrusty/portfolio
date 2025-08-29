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
import { cycle } from '@/utility/extended-js';
import Link from 'next/link';
import { contact } from '../contact/config';
import { useMessages } from '@/components/messages/MessageContext';
import { RocketIcon } from '@radix-ui/react-icons';
import { MessageTheme } from '@/components/messages/GameTextMessage';
import { Lightbulb } from 'lucide-react';

const heroTagTexts = [
  "Engineering elegant solutions to complex problems.",
  "Writing clean code is simply in my genes.",
  "I've done the math. Success is guaranteed.",
  "⚡☢️ Look out! Bear alert 🐻.",
  "ah nope. nevermind 💬",
  "thinking🤔...",
  "hmpf...‌ ‌ ‌ ‌ ‌1 + 1 = .. uh.. er..",
  "...‌ ‌ 2 ! Operation completed."
];

function Hero() {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<boolean>(false);
  const [genIndex, setGenIndex] = useState<number>(0);
  const [heroText, setHeroText] = useState<string>(heroTagTexts[0]);
  const [regenerate, setRegenerate] = useState<boolean>(true);

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

  const { addMessage } = useMessages();
  const [ notificationLightbulb, setNotificationLightbulb ] = useState<boolean>(false);
  const sendNotifyLightbulb = (e: React.MouseEvent) => {
    if (notificationLightbulb) return;
    
    addMessage("that's a lightbulb 😂", "info", <Lightbulb />, e.clientX, e.clientY);
    setNotificationLightbulb(true);
  };
  const sendNotifyContact = (e: React.MouseEvent) => {
    addMessage("hehe, nice", "info", <RocketIcon />, e.clientX, e.clientY, 1200);
  };

  const [clickCount, setClickCount] = useState(0);
  const [firstClickTime, setFirstClickTime] = useState(0);
  const sendNotifyAvatar = (e: any) => {
    const currentTime = new Date().getTime();
    
    // Reset the counter if the last click was more than 2.5 seconds ago
    let _clickCount = clickCount;
    if (currentTime - firstClickTime > 2500) {
      _clickCount = 0;
      setClickCount(_clickCount);
      setFirstClickTime(currentTime);
    } else {
      ++_clickCount;
      setClickCount(prevCount => prevCount + 1);
    }

    let messages = [
      { text: 'what?' },
      { text: 'uh, what?' },
      { text: "it's no OpenBSD/fortune, but it's fun!" },
      { text: "stop clicking me!", type: "warning" },
    ];

    let message: any;
    if (_clickCount >= 5) {
      message = { text: 'Access denied.', type: "danger" };
      setFirstClickTime(currentTime-1500);
    } else {
      message = messages[Math.floor(Math.random() * messages.length)];
    }
    addMessage(message.text, message.type ?? "default", message.icon, e.target.x + e.target.width / 2 - 175, e.target.y + 85);
  };

  const gradientThemeLight =
    'bg-[linear-gradient(to_right,theme(colors.red.200),theme(colors.red.100),theme(colors.amber.400),theme(colors.red.200),theme(colors.amber.400),theme(colors.amber.100),theme(colors.red.200))] ';
  const gradientThemeDark =
    'dark:bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))]';

  return (
    <MotionWrap className="w-full pt-12 md:mt-0 xl:pt-24">
      <div
        ref={ref}
        className="xl:align-center grid justify-center gap-4 px-4 text-center xl:flex xl:space-x-32"
      >
        <div
          className={`${styles.bg_grad_custom} basis-1/3 rounded-3xl border border-yellow-300 bg-black/15 px-4 pb-12 pt-8 backdrop-blur-lg dark:border-yellow-500 dark:bg-neutral-600/45 xl:h-1/2 xl:px-0 2xl:mt-8`}
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
        <motion.section
          whileInView={{ y: ["-80%", "-25%", "0"], opacity: [0, 1]}}
          transition={{ duration: 0.5 }}
          className="relative p-8"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -10; // tilt up/down
            const rotateY = ((x / rect.width) - 0.5) * 10;  // tilt left/right
            setTilt({ x: rotateX, y: rotateY });
          }}
          onMouseOut={() => setTilt({ x: 0, y: 0 })}
          style={{
            width: "640px"
          }}
        >
          <div
            // aspect-square lg:aspect-video 
            className={`mx-auto overflow-hidden h-96 w-auto rounded-xl relative
            border border-yellow-300 dark:border-red-400`}
          >
            <motion.div
              animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
                boxShadow: hovered
                  ? "0px 25px 50px rgba(0,0,0,0.4)"
                  : "0px 10px 20px rgba(0,0,0,0.2)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute w-full h-full"
            >
              <motion.div
                className="absolute inset-0"
              >
                <Image
                  alt="personal portrait sharp"
                  className="backdrop-blur-lg rounded-xl object-cover object-center h-full"
                  sizes="100vw"
                  src={'/images/hero-2025.jpg'}
                  width="600"
                  height="320"
                  priority={true}
                />
              </motion.div>
              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  alt="personal portrait pixelated"
                  className="rounded-xl object-cover object-center h-full"
                  sizes="100vw"
                  src={'/images/hero-pixel.png'}
                  width="600"
                  height="320"
                  style={{
                    imageRendering: "pixelated",
                  }}
                  onClick={sendNotifyAvatar}
                  priority={true}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            animate={(width && width > 1280) ? {
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : "100%",
              display: hovered ? 'flex' : 'none'
            } : {display: 'none'}}
            tabIndex={-1}
            className="sm:hidden flex items-center justify-start absolute -right-32 2xl:left-auto 2xl:-right-32 -top-4 w-1/2"
            >
            <span onClick={sendNotifyLightbulb} className="text-6xl float top-16 left-0 absolute">💡</span>
            <div 
              className="text-2xl border border-white text-white bg-gradient-to-r from-green-300 
                        to-blue-400 dark:from-gray-600 dark:to-blue-800 p-4 pl-16 my-6 rounded-lg flex-1"
            >
              <h3 className="text-3xl mt-2 font-bold tracking-tighter">Did you know?</h3>
              <p>I design and build beautiful websites.</p>
              <Link onClick={sendNotifyContact}  href={contact.socials.linkedin!} className={`${styles.link} ${styles.cursive} mt-3 -ml-6`}>Connect&nbsp;</Link><span className={`${styles.cursive} absolute mt-3 ml-2 text-4xl text-yellow-400`}>!</span>
            </div>
            <div className="absolute bottom-8 -ml-2 transform rotate-45">
              <div className="w-12 overflow-hidden">
                <div className="h-12 bg-green-300 dark:bg-gray-600 rotate-45 transform origin-left rounded-sm"></div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </MotionWrap>
  );
}

export default Hero;
