import type { IRequest } from "./types/types";
import { getRequestsByRequestIds } from "./utils/getRequestsByRequestIds";
import { staticRequests } from "./static/staticRequests";

export type { IRequest };
export { getRequestsByRequestIds, staticRequests };
