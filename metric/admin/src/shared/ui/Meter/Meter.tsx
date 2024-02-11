import { FC } from "react";

interface MeterProps {
  progress: number;
  label?: string;
  className?: string;
}

const colors = [
  {
    threshold: 0,
    value: "#C61010",
  },
  {
    threshold: 30,
    value: "#F1B92A",
  },
  {
    threshold: 80,
    value: "#5CC940",
  },
];

const Meter: FC<MeterProps> = ({ progress, label = "", className = "" }) => {
  const color = colors.reduce(
    (acc, cur) => (progress >= cur.threshold ? cur.value : acc),
    colors[0].value
  );

  return (
    <div
      className={"flex justify-between items-center " + className}
      style={{ color }}
    >
      <div className="relative mt-px w-full h-2 bg-[#E9EDF7] rounded-lg">
        <div
          className="relative h-full rounded-lg bg-current"
          style={{ width: progress + "%" }}
        ></div>
      </div>
      {!!label && (
        <div className="w-max ml-[0.625rem] text-sm font-medium">{label}</div>
      )}
    </div>
  );
};

export default Meter;
