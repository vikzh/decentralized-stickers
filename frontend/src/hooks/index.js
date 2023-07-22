import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth]);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);
  return size;
};
