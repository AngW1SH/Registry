import { FC } from "react";
import styles from "./LoadingCircle.module.css";

interface LoadingCircleProps {
  size?: number;
}

const LoadingCircle: FC<LoadingCircleProps> = ({ size = 50 }) => {
  return (
    <div
      role="status"
      className={styles["loading-circle"]}
      style={{
        height: size + "px",
        width: size + "px",
      }}
    ></div>
  );
};

export default LoadingCircle;
