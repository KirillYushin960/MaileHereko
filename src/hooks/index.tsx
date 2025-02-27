import { useMediaQuery, useTheme } from '@mui/material';
import { RefObject, useEffect } from 'react';

export const useIntersectionObserver = (
  targetRef: RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    });

    const currentRef = targetRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, targetRef]);
};

export const useDevice = () => {
  const theme = useTheme();

  return {
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    isTablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    isLaptop: useMediaQuery(theme.breakpoints.between('md', 'lg')),
    isDesktop: useMediaQuery(theme.breakpoints.up('lg')),
  };
};
