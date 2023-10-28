import type { IForm } from "./types/types";
import FormCard from "./ui/FormCard";
import { staticForms } from "./static/staticForms";
import { getFormFromDTO } from "./utils/getFormFromDTO";

export type { IForm };
export { FormCard, staticForms, getFormFromDTO };
