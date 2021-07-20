const readableBytes = (size: number, toFixed: number = 2) => {
  if (size === 0) return '0 B';
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(toFixed) + ' ' + ['B', 'Kib', 'Mib', 'Gib', 'Tib'][i];
};

export default readableBytes;
