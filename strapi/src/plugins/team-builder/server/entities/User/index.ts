import { FormStrapi } from "../Form";
import axios from "axios";

export interface User {
  id: number;
  name: string;
}

export interface UserDetailed extends User {
  formResults: {
    form: number;
    data: any;
  };
}

export interface UserStrapi {
  id: number;
  name: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  forms: {
    date: string;
    file: {
      id: number;
      url: string;
      mime: string;
    };
    form: FormStrapi;
  }[];
}

export const userAdapter = async (
  userListStrapi: UserStrapi[],
  formId: number
) => {
  const fetchUserFormResult = async (
    data: { id: number; name: string; url: string | null },
    formId: number
  ) => {
    if (!data.url)
      return {
        id: data.id,
        name: data.name,
        form: {
          formId: formId,
          data: null,
        },
      };

    const { data: fileData } = await axios.get(
      process.env["STRAPI_URL"] + data.url
    );

    return {
      id: data.id,
      name: data.name,
      form: {
        formId: formId,
        data: fileData,
      },
    };
  };

  const fetchData = userListStrapi.map((userStrapi) => {
    const candidates = userStrapi.forms.filter(
      (form) => form.form.id == formId
    );

    if (!candidates.length)
      return {
        id: userStrapi.id,
        name: userStrapi.name,
        url: null,
      };

    const found = candidates.reduce(
      (acc, cur) => (acc.date < cur.date ? cur : acc),
      candidates[0]
    );

    return {
      id: userStrapi.id,
      name: userStrapi.name,
      url: found?.file.url || null,
    };
  });

  const result = await Promise.all(
    fetchData.map((data) => fetchUserFormResult(data, formId))
  );

  return result;
};

export const formatName = (name: string) => {
  const parts = name.split(" ");

  if (parts.length == 1) return parts[0];

  if (parts.length == 2) return parts[0] + " " + parts[1][0].toUpperCase();

  return (
    parts[0] +
    " " +
    parts[1][0].toUpperCase() +
    ". " +
    parts[2][0].toUpperCase() +
    "."
  );
};
