export const env = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`${key} not defined in environment`);
  return v;
};
