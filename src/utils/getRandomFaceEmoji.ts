const getRandomFaceEmoji = () => {
  const emojiArr: string[] = [];
  for (let i = 0x1f600; i <= 0x1f64f; i += 1) emojiArr.push(String.fromCodePoint(i));
  const random = Math.floor(Math.random() * emojiArr.length);
  const targetEmoji: string = emojiArr[random];
  emojiArr.splice(random, 1);
  return targetEmoji;
};

export default getRandomFaceEmoji;
