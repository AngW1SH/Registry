import type { IResource } from "./types";
import type { IResourceField } from "./types/fields";
import { ResourceFieldType } from "./types/fields";
import { resourceSlice } from "./model/resourceSlice";
import ResourceField from "./ui/Fields/ResourceField";

export type { IResource, IResourceField };
export { resourceSlice, ResourceField, ResourceFieldType };
