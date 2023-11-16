import draftSchema from "./draft";
import teamDraftSchema from "./team-draft";

/*
I have no idea why all the schemas have to be under the "schema" property,
the docs say never mentioned this, but it's the only way it seems to work
Typescript-plugin problem only
*/
export default {
  draft: {
    schema: draftSchema,
  },
  "team-draft": {
    schema: teamDraftSchema,
  },
};
