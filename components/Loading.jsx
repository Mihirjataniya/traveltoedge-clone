'use client'

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isFirstLoad = useRef(true); 

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return; 
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timeout);
  }, [pathname]);


  return loading ?(
    <div className='min-h-screen flex items-center justify-center'>
      <span class="loader"></span>
    </div>
  ) : null;
}

export default Loading
