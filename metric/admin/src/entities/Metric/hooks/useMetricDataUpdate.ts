import { useEffect, useState } from "react";
import { IGenericSnapshotList, IMetricData } from "../types";
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
    function onMessage(value: IMetricData[]) {
      const metricDataList: { [key in string]: IGenericSnapshotList } = {};

      value.forEach((item) => {
        const data = {
          data: item.data,
          error: item.error || "",
          timestamp: item.timestamp,
        };

        if (!metricDataList[item.metric]) {
          metricDataList[item.metric] = [data];
        } else {
          metricDataList[item.metric].push(data);
        }
      });

      for (const metricId in metricDataList) {
        const metric = metrics.find((m) => m.id === metricId);

        if (metric) {
          dispatch(
            metricSlice.actions.updateMetric({
              ...metric,
              data: [...metric.data, ...metricDataList[metricId]] as any,
            })
          );
        }
      }
    }
    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [metrics]);
};
