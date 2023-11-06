import qs from "qs";

export const strapi = {
  async get(
    entityPlural: string,
    options: {
      token: string;
      params: any;
    }
  ) {
    return fetch(
      process.env.STRAPI_URL +
        entityPlural +
        "?" +
        qs.stringify(options.params),
      {
        headers: {
          Authorization: "bearer " + options.token,
        },
      }
    ).then((data) => data.json());
  },

  async post(
    entityWithId: string,
    options: {
      token: string;
      body: any;
    }
  ) {
    return fetch(process.env.STRAPI_URL + entityWithId, {
      headers: {
        Authorization: "bearer " + options.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(options.body),
    }).then((data) => data.json());
  },

  async put(
    entityWithId: string,
    options: {
      token: string;
      body: any;
    }
  ) {
    return fetch(process.env.STRAPI_URL + entityWithId, {
      headers: {
        Authorization: "bearer " + options.token,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(options.body),
    }).then((data) => data.json());
  },

  async delete(
    entityWithId: string,
    options: {
      token: string;
    }
  ) {
    return fetch(process.env.STRAPI_URL + entityWithId, {
      headers: {
        Authorization: "bearer " + options.token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((data) => data.json());
  },
};
