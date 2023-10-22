import type { Schema, Attribute } from '@strapi/strapi';

export interface DeveloperRequirementDeveloperRequirement
  extends Schema.Component {
  collectionName: 'components_developer_requirement_developer_requirements';
  info: {
    displayName: 'developerRequirement';
    icon: 'check';
    description: '';
  };
  attributes: {
    developerRequirement: Attribute.String;
  };
}

export interface NamedFileNamedFile extends Schema.Component {
  collectionName: 'components_named_file_named_files';
  info: {
    displayName: 'Named File';
    icon: 'filePdf';
  };
  attributes: {
    name: Attribute.String;
    file: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'developer-requirement.developer-requirement': DeveloperRequirementDeveloperRequirement;
      'named-file.named-file': NamedFileNamedFile;
    }
  }
}
