export const fetchDeleteProjectFile = async (
  projectId: number,
  fileId: number,
) => {
  const result: any = await fetch(
    "/api/project/" + projectId + "/result-files/" + fileId,
    {
      method: "DELETE",
    },
  ).then((response) => {
    if (!response.ok) return 0;

    return 1;
  });

  return result;
};
