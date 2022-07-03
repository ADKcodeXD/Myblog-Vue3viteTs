export const setItem = (key: string, item: any): void => {
  if (typeof item === 'object') {
    localStorage.setItem(key, JSON.stringify(item));
  } else if (typeof item === 'string') {
    try {
      localStorage.setItem(key, item);
    } catch (error) {
      throw new Error('item is not a object');
    }
  }
};

export const getItem = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    } else {
      return JSON.parse(item);
    }
  } catch (error) {
    return localStorage.getItem(key);
  }
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
