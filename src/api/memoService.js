export const fetchMemoData = (name = "") => {
  return localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : [];
};

export const SetLocalMemoData = (params = {}) => {
  const { name, data } = params;
  localStorage.setItem(name, JSON.stringify(data));
};
