import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';

const phrases = [
  'autonomous',
  'motivated',
  'using life experiences',
  'results-oriened',
  'collaboraators',
  'mastering new skills',
  'problem solvers'
];

const AsLearners = () => {
  const [index, setIndex] = useState(0);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: 'translate3d(0,-80px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,80px,0)' },
    config: { duration: 1000 }
  });

  useEffect(() => {
    if (index < phrases.length - 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [index]);

  return (
    <div className="mt-32 ml-32" style={{ position: 'relative' }}>
      <p className="text-foreground text-5xl">As learners, we are  {' '}
        {transitions((style, i) => (
          <animated.span style={{ ...style, position: 'absolute' }} key={i} className="highlight ml-4 text-nowrap">
            {phrases[i]}
          </animated.span>
        ))}
      </p>
    </div>
  );
};

export default AsLearners;
