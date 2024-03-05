import { AppDispatch } from "@/app/store";
import { projectSlice } from "@/entities/Project";
import { fetchOne } from "../api/fetchOne";
import { extractProject } from "../utils/extractProject";
import { resourceSlice } from "@/entities/Resource";
import { extractResources } from "../utils/extractResources";
import { metricSlice } from "@/entities/Metric";
import { extractMetrics } from "../utils/extractMetrics";

const slices = [projectSlice, resourceSlice, metricSlice];

const setLoadingStates = (dispatch: AppDispatch, isLoading: boolean) => {
  slices.forEach((slice) => dispatch(slice.actions.setLoading(isLoading)));
};

const setErrorStates = (dispatch: AppDispatch, error: string) => {
  slices.forEach((slice) => dispatch(slice.actions.setError(error)));
};

export const initializeProjectDetailed = async (
  dispatch: AppDispatch,
  id: string
) => {
  setLoadingStates(dispatch, true);
  const result = await fetchOne(id);

  if (!result) {
    setErrorStates(dispatch, "Failed to fetch project data");
    setLoadingStates(dispatch, false);

    return;
  }

  dispatch(projectSlice.actions.setProject(extractProject(result)));
  dispatch(resourceSlice.actions.setResources(extractResources(result)));
  dispatch(metricSlice.actions.setMetrics(extractMetrics(result)));

  setLoadingStates(dispatch, false);
};
