'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './loader';
import { LOADER_LOADTIME } from './config';

function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        // observe: this change has not been observed for errors.
        // window.scrollTo(0, 0);
      }, LOADER_LOADTIME);
    })();
  }, []);

  return (
    <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
  );
}

export default Preloader;
