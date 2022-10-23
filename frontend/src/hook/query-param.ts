export const useQueryParam = (p: string[]) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  let values: string[] = [];
  for (let i = 0; i < p.length; i++) {
    const param = p[i];
    const val = params.get(param);
    if (val === null) throw new Error("parameter is null");
    if (val === "") throw new Error("parameter is empty");
    values = [...values, val];
  }

  return values;
};
