import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prev.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return Math.round(value);
}
