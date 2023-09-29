"use strict";

import { v4 as uuid } from "uuid";

module.exports = {
  beforeCreate: async (data) => {
    if (!data.params.data.uuid) {
      data.params.data.uuid = uuid();
    }
  },
};
