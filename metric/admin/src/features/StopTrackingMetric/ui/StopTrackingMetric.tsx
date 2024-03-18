import { FC, useState } from "react";
import { useDeleteMetricMutation } from "@/entities/Metric/model/metricApi";
import { Modal } from "@/shared/ui/Modal";
import { useAppDispatch } from "@/app/store";
import { metricSlice } from "@/entities/Metric";

interface StopTrackingMetricProps {
  className?: string;
  metricId: string;
}

const StopTrackingMetric: FC<StopTrackingMetricProps> = ({
  metricId,
  className,
}) => {
  const dispatch = useAppDispatch();

  const [stopTracking] = useDeleteMetricMutation();

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    const result = await stopTracking(metricId);

    if (!result.hasOwnProperty("error")) {
      dispatch(metricSlice.actions.popMetric(metricId));
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          "bg-[#FFE7DF] text-[#BC2F26] py-1 px-7 font-medium text-sm rounded-xl " +
          className
        }
      >
        Stop Tracking
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 rounded-lg pb-11">
          <h2 className="font-bold text-2xl text-primary">Stop Tracking</h2>
          <p className="py-6">
            Are you sure you want to stop tracking this metric?
          </p>
          <div className="flex justify-center gap-10">
            <button
              onClick={() => setIsOpen(false)}
              className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="py-3 px-14 bg-[#FFE7DF] font-medium text-[#BC2F26] rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StopTrackingMetric;
