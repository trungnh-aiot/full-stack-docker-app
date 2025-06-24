import { useEffect, useState } from "react";

type CounterProps = {
  target: number;
};

const Counter: React.FC<CounterProps> = ({ target }) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const start = value;
    const end = target;
    const duration = 500; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target]);

  return <h1>Luong truy cap hien tai: {value}</h1>;
};

export default Counter;
