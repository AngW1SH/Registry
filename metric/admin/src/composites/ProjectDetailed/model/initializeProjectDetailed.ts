import { AppDispatch } from "@/app/store";
import { projectSlice } from "@/entities/Project";
import { fetchOne } from "../api/fetchOne";
import { extractProject } from "../utils/extractProject";

const setLoadingStates = (dispatch: AppDispatch, isLoading: boolean) => {
  dispatch(projectSlice.actions.setLoading(isLoading));
};

const setErrorStates = (dispatch: AppDispatch, error: string) => {
  dispatch(projectSlice.actions.setError(error));
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

  setLoadingStates(dispatch, false);
};
