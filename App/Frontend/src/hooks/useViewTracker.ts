import { RefObject, useEffect, useRef } from "react";

export const useViewTracker = (
  elementRef: RefObject<HTMLElement>,
  onView: () => void,
  options: IntersectionObserverOptions = { threshold: 0.5 }
) => {
  const hasViewed = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // If already viewed, don't create a new observer
    if (hasViewed.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasViewed.current) {
        onView();
        hasViewed.current = true;

        // Disconnect the observer after the first view
        observer.disconnect();
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementRef, onView, options]);
};

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}
