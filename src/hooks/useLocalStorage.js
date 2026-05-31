import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Ambil data dari localStorage saat pertama kali render
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
      return initialValue;
    } catch (error) {
      console.error("Gagal membaca localStorage:", error);
      return initialValue;
    }
  });

  // Simpan ke localStorage setiap kali state 'value' berubah
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
