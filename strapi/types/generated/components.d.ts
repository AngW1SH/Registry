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

export interface UserFormUserForm extends Schema.Component {
  collectionName: 'components_user_form_user_forms';
  info: {
    displayName: 'Form Result';
    icon: 'file';
    description: '';
  };
  attributes: {
    form: Attribute.Relation<
      'user-form.user-form',
      'oneToOne',
      'api::form.form'
    >;
    file: Attribute.Media;
    date: Attribute.DateTime;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'developer-requirement.developer-requirement': DeveloperRequirementDeveloperRequirement;
      'named-file.named-file': NamedFileNamedFile;
      'user-form.user-form': UserFormUserForm;
    }
  }
}
