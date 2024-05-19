import { FC } from "react";
import { TotalCommits } from "../instances/TotalCommits";
import IssueCompleteness from "../instances/IssueCompleteness/ui/IssueCompleteness";
import { useAppSelector } from "@/app/store";
import { useGetMetricInfoQuery } from "../model/metricApi";
import PullRequestHangTime from "../instances/PullRequestHangTime/ui/PullRequestHangTime";
import RapidPullRequests from "../instances/RapidPullRequests/ui/RapidPullRequests";
import Grade from "../instances/Grade/ui/Grade";

interface MetricProps {
  id: string;
}

const Metric: FC<MetricProps> = ({ id }) => {
  const metric = useAppSelector((state) =>
    state.metric.metrics.find((m) => m.id === id)
  );

  const { data: metricInfoList } = useGetMetricInfoQuery();

  const metricInfo = metricInfoList?.find((m) => m.name === metric?.name);

  const dependencies = useAppSelector((state) =>
    state.metric.metrics.filter(
      (m) =>
        metricInfo?.dependencies.includes(m.name) &&
        m.resource === metric?.resource
    )
  );

  if (!metric) return <></>;

  switch (metric.name) {
    case "TotalCommits":
      return <TotalCommits {...metric} dependencies={dependencies} />;
    case "IssueCompleteness":
      return <IssueCompleteness {...metric} dependencies={dependencies} />;
    case "PullRequestHangTime":
      return <PullRequestHangTime {...metric} dependencies={dependencies} />;
    case "RapidPullRequests":
      return <RapidPullRequests {...metric} dependencies={dependencies} />;
    case "Grade":
      return <Grade {...metric} dependencies={dependencies} />;
    default:
      return <></>;
  }
};

export default Metric;
