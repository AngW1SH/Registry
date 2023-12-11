import formRepository from "@/repositories/form";
import { Form } from "@/entities/form";

const formServiceFactory = () => {
  return Object.freeze({ getActive });

  async function getActive(): Promise<Form[] | null> {
    const formsResponse = await formRepository.findMany({ active: true });

    return formsResponse || null;
  }
};

const formService = formServiceFactory();

export default formService;
