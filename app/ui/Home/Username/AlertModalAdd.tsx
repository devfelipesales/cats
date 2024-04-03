"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { removeFriend } from "@/app/lib/actions";
import { Friend, FriendStatus } from "@prisma/client";
import { TITLE_STATUS } from "./AddButton";
import { useEffect, useState } from "react";

export const POPUP_TEXT_BY_STATUS = {
  ACCEPTED: "Tem certeza que deseja remover o(a) amigo(a)?",
  PENDING: "Tem certeza que deseja cancelar a solicitação enviada?",
};

export default function AlertModalAdd({
  openModal,
  setOpenModal,
  data,
  status,
  setStatus,
  setText,
  setData,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Friend | null;
  status: FriendStatus | null;
  setStatus: React.Dispatch<React.SetStateAction<FriendStatus | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<Friend | null>>;
}) {
  const [textPopUp, setTextPopUp] = useState<string>();

  useEffect(() => {
    setTextPopUp(
      POPUP_TEXT_BY_STATUS[status as keyof typeof POPUP_TEXT_BY_STATUS],
    );
  }, [status]);

  async function handleClick() {
    await removeFriend(data?.id!);
    setStatus(null);
    setText(TITLE_STATUS.NOSTATUS);
    setData(null);
    setOpenModal(false);
  }

  return (
    <Modal
      dismissible
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {textPopUp}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleClick}>
              Sim
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Não
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
