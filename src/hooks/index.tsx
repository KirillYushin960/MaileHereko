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
