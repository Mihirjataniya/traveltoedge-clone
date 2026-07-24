'use client'

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  // Track the path itself rather than a "have I mounted yet" flag: StrictMode
  // runs mount effects twice, which flips a boolean flag and fires the loader
  // on the very first paint.
  const shownFor = useRef(pathname);

  useEffect(() => {
    if (shownFor.current === pathname) return;
    shownFor.current = pathname;

    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);


  return loading ? (
    <div className='fixed inset-0 z-[100] bg-white flex items-center justify-center'>
      <span className="loader"></span>
    </div>
  ) : null;
}

export default Loading
