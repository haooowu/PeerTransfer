const readableBytes = (size: number) => {
  if (size === 0) return '0 B';
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'Kb', 'Mb', 'Gb', 'Tb'][i];
};

export default readableBytes;
