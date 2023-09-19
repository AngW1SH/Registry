export type IProject = {
  id: string;
  name: string;
  description: string;
  developerRequirements: string;
  dateStart: Date;
  dateEnd: Date;
  enrollmentStart: Date;
  enrollmentEnd: Date;
  createdAt: Date;
  supervisor: string;
  tags: string[];
  teamId: string;
  isPublic: boolean;
};

export type ProjectDTO = {
  id: string;
  name: string;
  description: string;
  developerRequirements: string;
  dateStart: string;
  dateEnd: string;
  enrollmentStart: string;
  enrollmentEnd: string;
  createdAt: string;
  supervisor: string;
  tags: string[];
  teamId: string;
  isPublic: boolean;
};
