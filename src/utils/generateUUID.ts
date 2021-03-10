const createUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/x/gu, character => {
    const random = (Math.random() * 16) | 0;
    const uuid = character == 'x' ? random : (random & 0x3) | 0x8;

    return uuid.toString(16);
  });
};

export default createUUID;
