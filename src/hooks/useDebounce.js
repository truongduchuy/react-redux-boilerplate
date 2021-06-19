import { useEffect } from 'react';

function useDebounce(callback, milisecondsToDelay) {
  let timeOutId;

  return useEffect(() => {
    timeOutId = setTimeout(() => {
      callback();
    }, milisecondsToDelay);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [callback]);
}

export default useDebounce;
