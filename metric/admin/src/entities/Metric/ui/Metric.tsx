import { FC } from "react";
import { TotalCommits } from "../instances/TotalCommits";
import IssueCompleteness from "../instances/IssueCompleteness/ui/IssueCompleteness";
import { useAppSelector } from "@/app/store";

interface MetricProps {
  id: string;
}

const Metric: FC<MetricProps> = ({ id }) => {
  const metric = useAppSelector((state) =>
    state.metric.metrics.find((m) => m.id === id)
  );

  if (!metric) return <></>;

  switch (metric.name) {
    case "TotalCommits":
      return <TotalCommits {...metric} />;
    case "IssueCompleteness":
      return <IssueCompleteness {...metric} />;
    default:
      return <></>;
  }
};

export default Metric;
