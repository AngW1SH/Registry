import { getUserFormResultsFromStrapiDTO } from "@/db/strapi/adapters/user";
import { strapi } from "@/db/strapi/client";
import { selectFormResult } from "@/db/strapi/queries/components/form-result";
import { FormResult } from "@/entities/form";
import { ServerError } from "@/helpers/errors";
import uploadRepository from "../upload";

const formResultRepositoryFactory = () => {
  return Object.freeze({
    findByUser,
    submit,
  });

  async function findByUser(userId: number): Promise<FormResult[]> {
    const params = {
      populate: {
        forms: selectFormResult(),
      },
    };

    const response = await strapi.get("students/" + userId, {
      token: process.env.USER_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch student");

    return getUserFormResultsFromStrapiDTO(response);
  }

  async function submit(formId: number, response: any, userId: number) {
    const results: FormResult[] = await findByUser(userId);

    const fileUploadResponse = await uploadRepository.upload({
      data: JSON.stringify(response),
      name: userId + "-" + formId + "-" + new Date().toTimeString() + ".json",
    });

    const timestampRow = response.find(
      (row: any) => row.question == "Timestamp"
    );

    const timestamp = timestampRow ? new Date(timestampRow.answer) : new Date();

    if (!timestampRow) {
      response = [
        { type: "DEFAULT", question: "Timestamp", answer: new Date() },
        ...response,
      ];
    }

    const newResult = {
      form: formId,
      date: timestamp,
      file: fileUploadResponse[0] ? fileUploadResponse[0].id : null,
    };

    const sameResultIndex = results.findIndex(
      (result) => Math.abs(Date.parse(result.date) - timestamp.getTime()) < 1000
    );

    if (sameResultIndex != -1) {
      // @ts-ignore
      results[sameResultIndex] = newResult;
    } else {
      // @ts-ignore
      results.push(newResult);
    }

    const body = {
      data: {
        forms: results,
      },
    };

    const createResponse = await strapi.put("students/" + userId, {
      token: process.env.USER_TOKEN!,
      body,
    });

    if (!createResponse) throw new ServerError("Couldn't submit form");

    return 1;
  }
};

const formResultRepository = formResultRepositoryFactory();

export default formResultRepository;
