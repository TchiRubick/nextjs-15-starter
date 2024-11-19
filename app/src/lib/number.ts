export const stringToNumber = (str: string | undefined) => {
  if (str === undefined) return 0;

  const num = Number(str);

  return isNaN(num) ? 0 : num;
};
