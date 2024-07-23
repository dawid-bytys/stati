import { MMKV } from 'react-native-mmkv';

export interface Storage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const mmkv = new MMKV();

export const storage: Storage = {
  getItem: (key) => {
    const value = mmkv.getString(key);
    return value ?? null;
  },
  removeItem: (key) => {
    return mmkv.delete(key);
  },
  setItem: (key, value) => {
    return mmkv.set(key, value);
  },
};
