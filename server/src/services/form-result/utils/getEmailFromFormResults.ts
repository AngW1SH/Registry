// Only considers the 'inline' questions.
// The actual results have a more complex structure
type FormResults = { question: string; answer?: string }[];

export const getEmailFromFormResults = (formResults: FormResults) => {
  return formResults
    .find(
      (data: { question: string; answer?: string }) =>
        data.question == "Электронная почта, указанная при авторизации"
    )
    ?.answer?.toLowerCase();
};
