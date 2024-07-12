'use client';

import { useState, useEffect } from 'react';
import useMediaQuery from './useMediaQuery';

type ScreenSize = 'xl' | 'lg' | 'md' | 'sm';

interface IMobileSpecs {
  screenSize: ScreenSize;
  mobile: boolean;
  tablet: boolean;
  portrait: boolean;
  landscape: boolean;
}

const useMobile = () => {
  const [view, setView] = useState<IMobileSpecs>({} as IMobileSpecs);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );

  function handleWindowSizeChange() {
    setTimeout(() => {
      setView(checkDevice());
    }, 10);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  function checkDevice() : IMobileSpecs {
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i));
    userAgent = userAgent.toLowerCase();
    const tablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    let currentOrientation = null;
    let screenSize : ScreenSize = 'xl';
    if (isLargeDevice) {
      screenSize = 'lg';
    } else if(isMediumDevice) {
      screenSize = 'md';
    } else if(isSmallDevice) {
      screenSize = 'sm';
    }

    if (window.innerWidth <= window.innerHeight) {
      currentOrientation = "portrait";
    } else {
      currentOrientation = "landscape";
    }
    return { screenSize, mobile, tablet, portrait: currentOrientation === 'portrait', landscape: currentOrientation === 'landscape' };
  }

  return view;
}

export { useMobile };