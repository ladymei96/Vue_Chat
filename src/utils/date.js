export function getCurrentDate() {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hour = now.getHours();
  const min = now.getMinutes();
  return `${year}/${month < 10 ? 0 : ""}${month}/${date} ${hour}:${min}`;
}
