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

    console.log(process.env["STRAPI_URL"] + data.url);

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
    const found =
      userStrapi.forms.find((form) => form.form.id == formId) || null;

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
