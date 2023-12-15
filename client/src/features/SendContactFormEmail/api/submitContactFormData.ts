import { IContactFormData } from "../types/types";

export const submitContactFormData = async (data: IContactFormData) => {
  const result = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.status);

  return result;
};
