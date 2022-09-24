import { useEffect, useState } from 'react';

export const useCustomMediaQuery = ( mediaquery, px ) => {

  const [ isMatch, setIsMatch ] = useState( false );

  useEffect(() => {

    const media = window.matchMedia(`(${mediaquery}: ${px}px)`);

    const listener = () => setIsMatch( media.matches );

    listener();

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);

  }, [ isMatch, mediaquery, px ]);

  return [ isMatch ];

};
