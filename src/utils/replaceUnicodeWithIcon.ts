const replaceUnicodeWithIcon = (unicode: string) => String.fromCodePoint(Number(unicode.replace('U+', '0x')));

export default replaceUnicodeWithIcon;
