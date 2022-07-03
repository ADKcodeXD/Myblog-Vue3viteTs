import emojiRegex from 'emoji-regex';

export const encodeEmoji = (content: string): string => {
  // 使用emojiRegex将所有emoji 转换为数据库能够存储的格式
  const emojiR = emojiRegex();
  const fmt_str = content.replace(emojiR, p => `e(${p.codePointAt(0)})`);
  return fmt_str;
};

export const decodeEmoji = (content: string): string => {
  const emojiDecodeRegex = /e\([0-9]+\)/g;
  const ori_str = content.replace(emojiDecodeRegex, p => {
    const filterP = p.match(/[0-9]+/g);
    if (filterP && filterP.length > 0) {
      return String.fromCodePoint(parseInt(filterP[0])) || '';
    } else {
      return '';
    }
  });
  return ori_str;
};
