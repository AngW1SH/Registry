export const fetchStartTask = async (metric: string) => {
  const result = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: {
        metric: metric,
        weight: 2,
        data: [],
        update_rate: {
          seconds: 20,
          nanos: 0,
        },
        updated_at: {
          seconds: 20,
          nanos: 0,
        },
      },
    }),
  });
};
