import React from 'react';

const debounce =
  (
    timer: React.MutableRefObject<number>,
    callback: (event: React.ChangeEvent<HTMLInputElement>) => void,
    delay: number = 2000,
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current);
    // eslint-disable-next-line no-param-reassign
    timer.current = setTimeout(
      () => {
        callback(event);
      },
      delay,
      event,
    );
  };

export default debounce;
