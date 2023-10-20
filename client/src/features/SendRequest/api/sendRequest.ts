export const sendRequest = async (
  team: number,
  files: File[],
  project: number,
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("team", "" + team);
  formData.append("project", "" + project);

  const response = await fetch("/api/request", {
    method: "POST",
    body: formData,
  });

  console.log(response);
};
