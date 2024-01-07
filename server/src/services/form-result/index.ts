import { BadRequestError, ServerError } from "@/helpers/errors";
import formRepository from "@/repositories/form";
import userRepository from "@/repositories/user";
import { getEmailFromFormResults } from "./utils/getEmailFromFormResults";
import { User } from "@/entities/user";
import { Form, FormResultClient, FormType } from "@/entities/form";
import formService from "../form";
import formResultRepository from "@/repositories/form-result";

const formResultServiceFactory = () => {
  return {
    getAllByUser,
    submit,
  };

  async function getAllByUser(user: User): Promise<FormResultClient[] | null> {
    const [formsResponse, formResultsResponse] = await Promise.allSettled([
      formService.getActive(),
      formResultRepository.findByUser(user.id),
    ]);

    const forms =
      formsResponse.status == "fulfilled" ? formsResponse.value : [];
    const formResults =
      formResultsResponse.status == "fulfilled"
        ? formResultsResponse.value
        : [];

    if (!forms) throw new ServerError("Failed to fetch forms");

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

  async function findUser(response: any): Promise<User | null> {
    const email = getEmailFromFormResults(response);

    if (!email) throw new BadRequestError("Email not specified");

    return userRepository.findOne({
      email,
    });
  }

  async function findForm(formId: string): Promise<Form | null> {
    if (typeof formId != "string")
      throw new BadRequestError("Form id not specified");
    return formRepository.findOne({ formId: formId });
  }

  async function submit(formId: string, response: any) {
    const [user, form] = await Promise.all([
      findUser(response),
      findForm(formId),
    ]);

    if (!user) throw new ServerError("No such user found");
    if (!form) throw new ServerError("No such form found");

    switch (form.type.toLowerCase()) {
      case FormType.google.toLowerCase():
        return formResultRepository.submit(form.id, response, user.id);
      default:
        throw new BadRequestError("Form type not supported");
    }
  }
};

const formResultService = formResultServiceFactory();

export default formResultService;
