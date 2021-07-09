const trimName = (name: string, length: number) => {
  return name.length > length ? name.substring(0, length) + '...' : name;
};

export default trimName;
