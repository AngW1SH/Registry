import { IMetric } from "@/entities/Metric";

export const fetchUpdateMetric = async (metric: IMetric) => {
  const response = await fetch(`/api/metric/${metric.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metric),
  });

  if (!response.ok) throw new Error("Failed to update metric");

  try {
    return response.json();
  } catch {
    return null;
  }
};
