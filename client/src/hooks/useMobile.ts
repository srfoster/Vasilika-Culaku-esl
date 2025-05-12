import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is mobile-sized
 * @param breakpoint The max width in pixels to consider as mobile
 * @returns Boolean indicating if the viewport is mobile-sized
 */
const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkSize);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;
