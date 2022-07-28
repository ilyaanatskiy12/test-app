type StoreInBrowserStorage = <T>(key: string, item: T) => void;
type GetValueForKeyInBrowserStorage = <T>(key: string) => T | null;

export const storeInBrowserStorage: StoreInBrowserStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getValueForKeyInBrowserStorage: GetValueForKeyInBrowserStorage = (
  key,
) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};
