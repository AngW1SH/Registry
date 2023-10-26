import { User } from "@/entities/user";
import { UserStrapi, UserWithFormsStrapi } from "../../types/user";
import { FormResult } from "@/entities/form";
import { FormResultStrapi } from "../../types/components/form-result";

export const getUserFromStrapiDTO = (user: UserStrapi): User => {
  return {
    id: user.data.id,
    ...user.data.attributes,
  };
};

export const getUserFormResultsFromStrapiDTO = (
  user: UserWithFormsStrapi
): FormResult[] => {
  return user.data.attributes.forms.map((form) => ({
    id: form.id,
    file: form.file.data ? form.file.data.id : null,
    form: form.form.data ? form.form.data.id : null,
    date: form.date,
  }));
};
