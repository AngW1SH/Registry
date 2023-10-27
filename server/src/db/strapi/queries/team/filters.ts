export const filterUnassigned = (userId: number) => {
  return {
    project: {
      id: {
        $null: true,
      },
    },
    members: {
      user: {
        id: userId,
      },
    },
  };
};

export const filterUnassignedAdministrated = (userId: number) => {
  return {
    project: {
      id: {
        $null: true,
      },
    },
    administrators: {
      id: userId,
    },
  };
};

export const filterActive = (userId: number) => {
  return {
    $and: [
      {
        $or: [
          {
            project: {
              id: {
                $null: true,
              },
            },
          },
          {
            project: {
              dateStart: {
                $lte: new Date(),
              },
              dateEnd: {
                $gte: new Date(),
              },
            },
          },
        ],
      },
      {
        $or: [
          {
            members: {
              user: {
                id: userId,
              },
            },
          },
        ],
      },
    ],
  };
};

export const filterAdministratedActive = (userId: number) => {
  return {
    $and: [
      {
        $or: [
          {
            project: {
              id: {
                $null: true,
              },
            },
          },
          {
            project: {
              dateStart: {
                $lte: new Date(),
              },
              dateEnd: {
                $gte: new Date(),
              },
            },
          },
        ],
      },
      {
        $or: [
          {
            administrators: {
              id: userId,
            },
          },
        ],
      },
    ],
  };
};
