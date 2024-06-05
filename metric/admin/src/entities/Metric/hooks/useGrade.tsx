import { useEffect } from "react";
import { IMetric } from "../types";
import { useAppDispatch } from "@/app/store";
import { metricSlice } from "../model/metricSlice";
import { MetricParamType } from "../types/params";

export const useGrade = (metric: IMetric, grade: number | null) => {
  const dispatch = useAppDispatch();

  const isGraded = metric.params?.find(
    (param) => param.name == "isGraded" && param.type == MetricParamType.boolean
  )?.value as boolean;

  useEffect(() => {
    if (isGraded)
      dispatch(
        metricSlice.actions.updateGrade({
          metricId: metric.id,
          resourceId: metric.resource,
          metricName: metric.name,
          grade,
        })
      );
  }, [grade]);
};
