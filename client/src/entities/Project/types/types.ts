export type IProject = {
  id: number;
  name: string;
  description: string;
  developerRequirements: string[];
  dateStart: Date;
  dateEnd: Date;
  enrollmentStart: Date;
  enrollmentEnd: Date;
  //createdAt: Date;
  supervisor: string;
  curator: string;
  client: string;
  requestCount: number;
  tags: number[];
  team: number;
};

export type ProjectDTO = {
  id: number;
  name: string;
  description: string;
  developerRequirements: string[];
  dateStart: string;
  dateEnd: string;
  enrollmentStart: string;
  enrollmentEnd: string;
  //createdAt: string;
  supervisor: string;
  curator: string;
  client: string;
  requestCount: number;
  tags: number[];
  team: number;
};

export enum ProjectStage {
  hiring,
  active,
  completed,
}
