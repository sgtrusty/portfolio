'use client';
import { Suspense, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './loader';
import SmoothScroll from '@/components/smooth-scroll';
import Cursor from '@/components/cursor/cursor';

// Define the props interface for the Preloader component
interface PreloaderProps {
  children: ReactNode;
}

// This component now handles all client-side logic and wraps the children
export default function Preloader({ children }: PreloaderProps) {
  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      </AnimatePresence>
      <Cursor />
    </SmoothScroll>
  );
}