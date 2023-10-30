import {
  getUserFormResultsFromStrapiDTO,
  getUserFromStrapiDTO,
} from "@/db/strapi/adapters/user";
import { strapi } from "@/db/strapi/client";
import { selectFormResult } from "@/db/strapi/queries/components/form-result";
import { selectUser } from "@/db/strapi/queries/user";
import { UserListStrapi, UserStrapi } from "@/db/strapi/types/user";
import { FormResult } from "@/entities/form";
import { User, UserCreate } from "@/entities/user";

const userRepositoryFactory = () => {
  return Object.freeze({
    findOne,
    create,
    getFormResults,
    submitForm,
  });

  async function findOne(filters: {
    email?: string;
    id?: number;
  }): Promise<User | null> {
    const params = {
      filters: {
        ...(filters.email && { email: filters.email }),
        ...(filters.id && { id: filters.id }),
      },
      ...selectUser(),
    };

    const response: UserListStrapi = await strapi.get("students", {
      token: process.env.USER_TOKEN!,
      params,
    });

    if (!response.data || !response.data.length) return null;

    return getUserFromStrapiDTO({ data: response.data[0] });
  }

  async function create(userCreate: UserCreate): Promise<User | null> {
    const params = {
      data: userCreate,
    };

    const response: UserStrapi = await strapi.post("students", {
      token: process.env.USER_TOKEN!,
      body: params,
    });

    if (!response.data.id) throw new Error("User not created");

    return getUserFromStrapiDTO(response);
  }

  async function getFormResults(userId: number): Promise<FormResult[]> {
    const params = {
      populate: {
        forms: selectFormResult(),
      },
    };

    const response = await strapi.get("students/" + userId, {
      token: process.env.USER_TOKEN!,
      params,
    });

    return getUserFormResultsFromStrapiDTO(response);
  }

  async function submitForm(formId: string, response: any, userId: number) {
    const forms: FormResult[] = await getFormResults(userId);

    const formData = new FormData();

    formData.append(
      "files",
      new Blob([JSON.stringify(response)]),
      userId + "-" + formId + "-" + new Date().toTimeString() + ".json"
    );

    const fileUploadResponse = await fetch(process.env.STRAPI_URL + "upload", {
      headers: {
        Authorization: "bearer " + process.env.UPLOAD_TOKEN,
      },
      method: "POST",
      body: formData as any,
    }).then((res) => (res.ok ? res.json() : null));

    const body = {
      data: {
        forms: [
          ...forms,
          {
            form: { connect: [{ id: formId }] },
            date: new Date(),
            file: fileUploadResponse[0] ? fileUploadResponse[0].id : null,
          },
        ],
      },
    };

    const createResponse = await strapi.put("students/" + userId, {
      token: process.env.USER_TOKEN!,
      body,
    });

    return 1;
  }
};

const userRepository = userRepositoryFactory();

export default userRepository;
