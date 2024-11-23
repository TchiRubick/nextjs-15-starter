export const stringToNumber = (str: string | undefined) => {
  if (str === undefined) return undefined;

  const num = Number(str);

  return isNaN(num) ? 0 : num;
};
