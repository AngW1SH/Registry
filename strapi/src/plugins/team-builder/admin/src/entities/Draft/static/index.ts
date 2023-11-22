import { IDraft } from "..";
import { staticFormList } from "../../Form/static";
import { staticStudentList } from "../../Student/static";
import { staticTeamList } from "../../Team/static";

export const staticDraft: IDraft = {
  id: 1,
  name: "Черновик 1",
  form: staticFormList[0].id,
  activeStudents: [24],
  teams: [[24]],
};
