import React from 'react';

export type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ElementEventType = TextAreaEvent | InputEvent;

type DebounceEventType<Event> = (event: Event) => void;

const debounce =
  <Element extends ElementEventType>(
    timer: React.MutableRefObject<number>,
    callback: DebounceEventType<Element>,
    delay: number = 2000,
  ) =>
  (event: Element) => {
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
