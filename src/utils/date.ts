export const timeLeft = (date: string) => {
  const now = new Date().getTime();
  const endDate = new Date(date).getTime();
  const diff = now - endDate;
  const oneDay = 1000 * 60 * 60 * 24;

  const day = Math.round(diff / oneDay);
  const hours = Math.floor(diff / 3.6e6);
  const minutes = Math.floor((diff % 3.6e6) / 6e4);
  const seconds = Math.floor((diff % 6e4) / 1000);

  if (day > 1) return `opened ${day} days ago`;
  if (hours > 1) return `opened ${hours} hours ago`;
  if (minutes > 1) return `opened ${minutes} minutes ago`;
  return `${seconds} seconds ago`;
};
