import { Button, ButtonAlt } from "@/shared/ui";
import { Modal } from "@/shared/ui/Modal";
import { FC } from "react";

interface DeleteRequestConfirmModalProps {
  show: boolean;
  onClose?: () => any;
  onConfirm?: () => any;
}

const DeleteRequestConfirmModal: FC<DeleteRequestConfirmModalProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="max-w-[80%] rounded-2xl bg-white">
        <div className="px-8 py-16 sm:px-16 lg:px-32">
          <h2 className="text-center text-xl text-primary sm:text-2xl">
            Вы уверены, что хотите отозвать заявку?
          </h2>
          <div className="pt-4" />
          <p className="text-center">
            Подать заявку заново можно будет на странице данного проекта
          </p>
          <div className="pt-6 sm:pt-10" />
          <div className="flex flex-col justify-center gap-x-10 gap-y-5 sm:flex-row">
            <Button className="w-full sm:w-2/5" onClick={onConfirm}>
              Отозвать заявку
            </Button>
            <ButtonAlt
              className="w-full border border-black sm:w-2/5"
              onClick={onClose}
            >
              Не отзывать
            </ButtonAlt>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteRequestConfirmModal;
