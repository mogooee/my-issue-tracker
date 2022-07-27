import React, { useState } from 'react';

function useInput() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!value) return setIsTyping(false);
    // eslint-disable-next-line no-param-reassign
    return setIsTyping(true);
  };

  const onClickInput = () => setIsActive(true);
  const onBlurInput = () => setIsActive(false);

  return { isActive, isTyping, onChangeInput, onClickInput, onBlurInput };
}

export default useInput;
