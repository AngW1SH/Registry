import { IRequest } from "../types/types";

export const getRequestsByRequestIds = (
  requestIds: number[],
  allRequests: IRequest[],
): IRequest[] => {
  return requestIds.map(
    (requestId) => allRequests.find((request) => request.id == requestId)!,
  );
};
