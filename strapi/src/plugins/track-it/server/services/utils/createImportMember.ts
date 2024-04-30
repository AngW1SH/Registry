import { ImportMember, PlatformName } from "../../entities/ImportProject";

interface Member {
  id: number;
  roles: {
    id: number;
    name: string;
  }[];
  user: {
    id: number;
    name: string;
    services: {
      id: number;
      provider: string;
      value: string;
    }[];
  };
}

export const createImportMember = (member: Member): ImportMember => {
  const validIdentifiers = member.user.services.filter((service) =>
    Object.keys(PlatformName)
      .map((key) => key.toLocaleLowerCase())
      .includes(service.provider.toLocaleLowerCase())
  );

  return {
    name: member.user.name,
    roles: member.roles.map((role) => role.name),
    identifiers: validIdentifiers.map((service) => ({
      platform: PlatformName[service.provider as keyof typeof PlatformName],
      value: service.value,
    })),
  };
};
