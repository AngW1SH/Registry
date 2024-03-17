export const fetchStopTracking = (metricId: string) => {
  return fetch("/api/metric/" + metricId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
