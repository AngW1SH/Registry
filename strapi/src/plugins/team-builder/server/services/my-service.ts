import { Strapi } from "@strapi/strapi";
import { FormStrapi, formAdapter } from "../entities/Form";
import { Team } from "../entities/Team";
import { User, formatName, userAdapter } from "../entities/User";

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async getForms() {
    const forms = await strapi.entityService?.findMany("api::form.form");

    if (!forms) return [];

    return formAdapter(forms as any);
  },

  async getStudents(formId: number) {
    const students = await strapi.entityService?.findMany(
      "api::student.student",
      {
        filters: {
          forms: {
            form: {
              id: formId,
            },
          },
        },
        populate: {
          forms: {
            populate: {
              file: true,
              form: true,
            },
          },
        },
      }
    );

    return userAdapter(students as any, formId);
  },

  async generateTeams(teams: Team[]) {
    const createTeamsResponse = await strapi.db
      ?.query("api::team.team")
      .createMany({
        data: teams.reduce<{ publishedAt: Date | number; name: string }[]>(
          (data, team) => [
            ...data,
            {
              name: team.students
                .map((user) => formatName(user.name))
                .join(", "),
              publishedAt: Date.now(),
            },
          ],
          []
        ),
      });

    if (!createTeamsResponse) throw new Error("Failed to generate teams");

    const { ids: teamIds } = createTeamsResponse;

    const generateMember = async (user: User, teamId: string | number) => {
      return strapi.entityService?.create("api::user-in-team.user-in-team", {
        data: {
          user: user.id,
          team: teamId,
          role: "",
          name: user.name,
          publishedAt: Date.now(),
        },
      });
    };

    const result = await Promise.all(
      teams.reduce<Promise<any>[]>(
        (promises, team, index) => [
          ...promises,
          ...team.students.map((student) =>
            generateMember(student, teamIds[index])
          ),
        ],
        []
      )
    );

    return result;
  },
});
