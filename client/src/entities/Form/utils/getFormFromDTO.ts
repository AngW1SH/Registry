import { IForm, IFormDTO } from "../types/types";

export const getFormFromDTO = (dto: IFormDTO): IForm => {
  return {
    ...dto,
    completed: dto.completed ? new Date(dto.completed) : null,
  };
};
