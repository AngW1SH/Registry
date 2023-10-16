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
