import { useEffect, useState } from "react";
import { IMetricData } from "../types";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "..";
import { socket } from "@/app/socket";

export const useMetricDataUpdate = () => {
  const [_, setIsConnected] = useState(socket.connected);

  const dispatch = useAppDispatch();
  const metrics = useAppSelector((state) => state.metric.metrics);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, []);

  useEffect(() => {
    function onMessage(value: IMetricData) {
      const metric = metrics.find((m) => m.id === value.metric);

      console.log("triggered");

      console.log(metrics);

      if (metric) {
        console.log("updated");
        dispatch(
          metricSlice.actions.updateMetric({
            ...metric,
            data: [
              ...metric.data,
              {
                data: value.data,
                error: value.error || "",
                timestamp: value.timestamp,
              },
            ],
          })
        );
      }
    }
    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [metrics]);
};
