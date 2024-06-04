import { TooltipIcon, XCircleIcon } from "@/shared/ui/Icons";
import { Modal } from "@/shared/ui/Modal";
import { FC, useState } from "react";

interface ModalProps {
  className?: string;
}

const TooltipModal: FC<ModalProps> = ({ className = "" }) => {
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
            What is Code Ownership?
          </h2>
          <p className="pb-4">
            <span className="text-primary font-semibold">Code ownership</span>{" "}
            is the percentage of the codebase that is owned by each user.
          </p>
          <p className="pb-8">
            The more it is{" "}
            <span className="text-primary font-semibold">
              evenly distributed
            </span>{" "}
            across users, the{" "}
            <span className="text-primary font-semibold">better</span>
          </p>
          <div className="flex pb-4">
            <div className="flex-1 flex flex-col items-center border-r">
              <h3 className="text-primary font-semibold text-lg">
                Good Distribution
              </h3>
              <img
                src={
                  import.meta.env.VITE_BASE_PATH + "/code-ownership-good.jpg"
                }
                alt=""
              />
            </div>
            <div className="flex-1 flex flex-col items-center">
              <h3 className="text-primary font-semibold text-lg">
                Bad Distribution
              </h3>
              <img
                src={import.meta.env.VITE_BASE_PATH + "/code-ownership-bad.jpg"}
                alt=""
              />
            </div>
          </div>
          <p>
            <span className="text-primary font-semibold">Hovering</span> over a
            user's slice will show the number of lines of code they own and the
            percentage of the total codebase
          </p>
        </div>
      </Modal>
    </>
  );
};

export default TooltipModal;
