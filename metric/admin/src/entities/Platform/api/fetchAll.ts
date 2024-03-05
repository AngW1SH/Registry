import { IPlatform } from "..";

export const fetchAll = async (): Promise<IPlatform[]> => {
  const response = await fetch("http://localhost:5173/api/platform");

  if (!response.ok) throw new Error("Failed to fetch platforms");

  return response.json();
};
