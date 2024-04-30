import { useEffect } from "react";
import { IMetric } from "../types";
import { useAppDispatch } from "@/app/store";
import { metricSlice } from "../model/metricSlice";

export const useGrade = (metric: IMetric, grade: number) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
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
