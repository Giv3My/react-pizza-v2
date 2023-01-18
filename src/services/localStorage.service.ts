export const getDataFromLS = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : null;
};

export const setDataToLS = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
