import { RefObject, useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  targetRef: RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    });

    observer.current.observe(targetRef.current);

    return () => {
      if (observer.current && targetRef.current) {
        observer.current.unobserve(targetRef.current);
      }
    };
  }, [callback, targetRef]);
};
