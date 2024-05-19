import { MetricParamData } from "../types/params";

export const paramData: { [key in string]: MetricParamData } = {
  gradeWeight: {
    label: "Grade Weight",
    placeholder: "Example: 0.75",
    tooltip: "How much is this metric worth for grading (1 is the base)?",
  },
  updateRate: {
    label: "Update Rate",
    placeholder: "Example: 2 weeks",
    tooltip: "How often should this metric be updated?",
  },
  weight: {
    label: "Computational Weight",
    placeholder: "Example: 1",
    tooltip:
      "How much processing power does this metric require? The maximum is set in the 'core'-server settings",
  },
  isGraded: {
    label: "Use this metric for grading",
    placeholder: "Example: true",
    tooltip: "Should this metric be used for grading?",
  },
};
