import type { Schema, Attribute } from '@strapi/strapi';

export interface DetailedCategoryDetailedCategory extends Schema.Component {
  collectionName: 'components_detailed_category_detailed_categories';
  info: {
    displayName: 'DetailedCategory';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    tags: Attribute.Relation<
      'detailed-category.detailed-category',
      'oneToMany',
      'api::tag.tag'
    >;
  };
}

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

export interface GithubDataGithubData extends Schema.Component {
  collectionName: 'components_github_data_github_data';
  info: {
    displayName: 'Github Data';
    icon: 'monitor';
  };
  attributes: {
    apiKey: Attribute.String;
    organization: Attribute.String;
    repository: Attribute.String;
  };
}

export interface ImageCategoryImageCategory extends Schema.Component {
  collectionName: 'components_image_category_image_categories';
  info: {
    displayName: 'ImageCategory';
    icon: 'picture';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    tag: Attribute.Relation<
      'image-category.image-category',
      'oneToOne',
      'api::tag.tag'
    >;
  };
}

export interface NamedFileNamedFile extends Schema.Component {
  collectionName: 'components_named_file_named_files';
  info: {
    displayName: 'Named File';
    icon: 'filePdf';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    file: Attribute.Media;
    date: Attribute.Date;
  };
}

export interface ProjectDocumentProjectDocument extends Schema.Component {
  collectionName: 'components_project_document_project_documents';
  info: {
    displayName: 'Project-document';
    icon: 'archive';
    description: '';
  };
  attributes: {
    type: Attribute.Relation<
      'project-document.project-document',
      'oneToOne',
      'api::project-document-type.project-document-type'
    >;
    file: Attribute.Media;
    name: Attribute.String;
    date: Attribute.DateTime;
  };
}

export interface ProjectLinkProjectLink extends Schema.Component {
  collectionName: 'components_project_link_project_links';
  info: {
    displayName: 'Project Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    platform: Attribute.Relation<
      'project-link.project-link',
      'oneToOne',
      'api::platform.platform'
    >;
    link: Attribute.String;
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

export interface UserIdentifierUserIdentifier extends Schema.Component {
  collectionName: 'components_user_identifier_user_identifiers';
  info: {
    displayName: 'User Identifier';
    icon: 'oneToMany';
    description: '';
  };
  attributes: {
    provider: Attribute.String;
    question: Attribute.String;
  };
}

export interface UserRoleAliasUserRoleAlias extends Schema.Component {
  collectionName: 'components_user_role_alias_user_role_aliases';
  info: {
    displayName: 'User Role Alias';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    alias: Attribute.String;
  };
}

export interface UserServiceUserService extends Schema.Component {
  collectionName: 'components_user_service_user_services';
  info: {
    displayName: 'User Service';
    icon: 'key';
    description: '';
  };
  attributes: {
    provider: Attribute.String;
    value: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'detailed-category.detailed-category': DetailedCategoryDetailedCategory;
      'developer-requirement.developer-requirement': DeveloperRequirementDeveloperRequirement;
      'github-data.github-data': GithubDataGithubData;
      'image-category.image-category': ImageCategoryImageCategory;
      'named-file.named-file': NamedFileNamedFile;
      'project-document.project-document': ProjectDocumentProjectDocument;
      'project-link.project-link': ProjectLinkProjectLink;
      'user-form.user-form': UserFormUserForm;
      'user-identifier.user-identifier': UserIdentifierUserIdentifier;
      'user-role-alias.user-role-alias': UserRoleAliasUserRoleAlias;
      'user-service.user-service': UserServiceUserService;
    }
  }
}
