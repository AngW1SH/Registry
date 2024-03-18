import { FC } from "react";
import styles from "./LoadingCircle.module.css";

interface LoadingCircleProps {
  size?: number;
  color?: string;
}

const LoadingCircle: FC<LoadingCircleProps> = ({
  size = 50,
  color = "#551FFF",
}) => {
  return (
    <div
      role="status"
      className={styles["loading-circle"]}
      style={{
        height: size + "px",
        width: size + "px",
        border: "6px solid " + color,
        borderColor: `${color} transparent ${color} transparent`,
      }}
    ></div>
  );
};

export default LoadingCircle;
