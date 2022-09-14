const replaceUnicodeWithIcon = (unicode: string) => {
  const replaceFn = (code: string) => String.fromCodePoint(Number(code.replace('U+', '0x')));
  const emojiIcon = unicode.split(' ').reduce((acc, cur) => acc + replaceFn(cur), '');
  return emojiIcon;
};

export default replaceUnicodeWithIcon;
