import { FormResultClient } from "@/entities/form";
import { User } from "@/entities/user";
import { ServerError } from "@/helpers/errors";
import formRepository from "@/repositories/form";
import userRepository from "@/repositories/user";

const formServiceFactory = () => {
  return Object.freeze({ getAll, submit });

  async function getAll(user: User): Promise<FormResultClient[] | null> {
    const [formsResponse, formResultsResponse] = await Promise.allSettled([
      formRepository.findMany({ active: true }),
      formRepository.findResults(user.id),
    ]);

    const forms =
      formsResponse.status == "fulfilled" ? formsResponse.value : [];
    const formResults =
      formResultsResponse.status == "fulfilled"
        ? formResultsResponse.value
        : [];

    const formResultsClient: FormResultClient[] = forms.map((form) => ({
      id: form.id,
      name: form.name,
      link: form.link,
      completed: null,
    }));

    /* 
        Assumes the forms are sorted by date in ASC order
        They should be, by default, because the new form results are pushed to the end of the list
        */
    formResults.forEach((result) => {
      const formIndex = forms.findIndex((form) => form.id == result.form);

      if (formIndex !== -1)
        formResultsClient[formIndex].completed = new Date(result.date);
    });

    return formResultsClient;
  }

  async function submit(formId: number, response: any) {
    // Will use an adapter later on
    const user = await userRepository.findOne({
      email:
        response["Единая учетная запись (например, ST000000)"].toLowerCase(),
    });

    if (!user) throw new ServerError("No such user found");

    const form = await formRepository.findOne({ formId: formId });
    if (!form) throw new ServerError("No such form found");

    return formRepository.submit(form.id, response, user.id);
  }
};

const formService = formServiceFactory();

export default formService;
