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
    ).then((data) => {
      try {
        if (data.status !== 200) return null;

        return data.json();
      } catch {
        return null;
      }
    });
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
    }).then((data) => {
      try {
        return data.json();
      } catch {
        return null;
      }
    });
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
    }).then((data) => {
      try {
        return data.json();
      } catch {
        return null;
      }
    });
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
    }).then((data) => {
      try {
        return data.json();
      } catch {
        return null;
      }
    });
  },
};
