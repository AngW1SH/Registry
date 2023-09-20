import { IContactFormData } from "../types/types";

export const submitContactFormData = async (data: IContactFormData) => {
  const result = await fetch("").then((res) => res.status);

  return result;
};
