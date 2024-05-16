import { MetricParamData } from "../types/params";

export const paramData: { [key in string]: MetricParamData } = {
  gradeWeight: {
    label: "Grade Weight",
    placeholder: "Grade Weight",
    tooltip: "Grade Weight",
  },
  updateRate: {
    label: "Update Rate",
    placeholder: "Update Rate",
    tooltip: "Update Rate",
  },
  weight: {
    label: "Weight",
    placeholder: "Weight",
    tooltip: "Weight",
  },
  isGraded: {
    label: "Use this metric for grading",
    placeholder: "Use this metric for grading",
    tooltip: "Use this metric for grading",
  },
  projectUrl: {
    label: "Project Url",
    placeholder: "Project Url",
    tooltip: "Project Url",
  },
};
