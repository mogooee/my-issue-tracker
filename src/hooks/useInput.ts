import React, { useState } from 'react';

function useInput() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) return setIsTyping(false);
    // eslint-disable-next-line no-param-reassign
    return setIsTyping(true);
  };

  const onClickInput = () => setIsActive(true);
  const onBlurInput = () => setIsActive(false);

  return { isActive, isTyping, onChangeInput, onClickInput, onBlurInput };
}

export default useInput;
