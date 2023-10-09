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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'developer-requirement.developer-requirement': DeveloperRequirementDeveloperRequirement;
    }
  }
}
