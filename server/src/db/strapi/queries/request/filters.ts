export const filterActiveRequests = () => {
  return {
    team: {
      id: {
        $null: false, // Request has a team attached (this should always be the case, but strapi doesn't provide required relation fields)
      },
      project: {
        id: {
          $null: true, // The team is not working on another project
        },
      },
    },
  };
};

export const filterUserRequests = (userId: number) => {
  return {
    $or: [
      {
        team: {
          members: {
            user: {
              id: userId,
            },
          },
        },
      },
      {
        team: {
          administrators: {
            id: userId,
          },
        },
      },
    ],
  };
};
