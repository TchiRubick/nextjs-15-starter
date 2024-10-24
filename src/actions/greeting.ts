export const greeting = (name: string) => {
  return { type: `${new Date().toISOString()} ${name}` };
};
