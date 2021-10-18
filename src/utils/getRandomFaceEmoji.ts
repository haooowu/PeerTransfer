const getRandomFaceEmoji = () => {
  const emojiArr: string[] = [];
  let targetEmoji: string;
  for (let i = 0x1f600; i <= 0x1f64f; i += 1) emojiArr.push(String.fromCodePoint(i));
  let random = Math.floor(Math.random() * emojiArr.length);
  targetEmoji = emojiArr[random];
  emojiArr.splice(random, 1);
  return targetEmoji;
};

export default getRandomFaceEmoji;
