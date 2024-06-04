import { Duration } from "@/entities/Metric/types/params";
import { TooltipIcon, XCircleIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { FC, useState } from "react";

interface ModalProps {
  threshold: Duration;
  className?: string;
}

const TooltipModal: FC<ModalProps> = ({ threshold, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={className}
        onClick={() => setIsOpen(true)}
        style={{
          height: "20px",
          width: "20px",
        }}
      >
        <TooltipIcon />
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white relative py-11 w-1/2 px-[5%] rounded-lg">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 h-10 w-10"
          >
            <XCircleIcon />
          </button>
          <h2 className="font-bold text-center text-3xl text-primary pb-10">
            What are Rapid Pull Requests?
          </h2>
          <p className="pb-4">
            <span className="text-primary font-semibold">
              Rapid Pull Requests
            </span>{" "}
            are the number of pull requests that are closed too quickly.
          </p>
          <p className="py-2 px-4 mb-4 border rounded-lg border-primary">
            Current threshold value is{" "}
            <span className="text-lg text-primary font-semibold">
              {threshold.number} {threshold.unitOfTime}
            </span>
          </p>
          <p className="pb-4 border-b mb-4">
            The <span className="text-primary font-semibold">graph</span>{" "}
            represents the number of rapid pull requests for each period
          </p>
          <p className="pb-4">
            A <span className="text-primary font-semibold">high number</span> of
            rapid pull requests indicates that the team{" "}
            <span className="text-primary font-semibold">
              doesn't do enough code review
            </span>
          </p>
          <div className="flex items-center py-2 px-4 rounded-lg border border-primary gap-5">
            <p>The grade is calculated using the formula:</p>
            <div className="text-primary font-semibold flex items-center gap-2">
              <div>(1 - </div>
              <div className="flex flex-col items-center">
                <div className="border-b">Rapid</div>
                <div>Total</div>
              </div>{" "}
              <div>) * 5</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TooltipModal;
