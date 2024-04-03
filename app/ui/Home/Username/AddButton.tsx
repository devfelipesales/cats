"use client";

import { useEffect, useState } from "react";
import Button from "../../Button";
import { Friend, FriendStatus } from "@prisma/client";
import { fetchFriendStatus } from "@/app/lib/fetchData";
import { addFriend } from "@/app/lib/actions";
import AlertModalAdd from "./AlertModalAdd";

export const TITLE_STATUS = {
  NOSTATUS: "Adicionar",
  ACCEPTED: "Adicionado(a)",
  PENDING: "Solicitação Enviada",
  REJECTED: "Adicionar",
};

export default function AddButton({
  loggedUser,
  profileUser,
}: {
  loggedUser: string;
  profileUser: string;
}) {
  const [data, setData] = useState<Friend | null>(null);
  const [text, setText] = useState("...");
  const [status, setStatus] = useState<FriendStatus | null>(null);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  useEffect(() => {
    async function getData() {
      const item = await fetchFriendStatus(loggedUser, profileUser);

      if (!item?.status) {
        setText(TITLE_STATUS.NOSTATUS);
        return;
      }
      setText(TITLE_STATUS[item.status as keyof typeof TITLE_STATUS]);
      setStatus(item?.status);
      setData(item);
    }
    getData();
  }, [loggedUser, profileUser]);

  async function handleClick() {
    if (!status || status === "REJECTED") {
      const item = await addFriend(loggedUser, profileUser);
      if (item) {
        setData(item);
        setStatus("PENDING");
        setText(TITLE_STATUS.PENDING);
      }
      return;
    }

    setOpenAlertModal(true);
  }

  return (
    <>
      {openAlertModal && (
        <AlertModalAdd
          openModal={openAlertModal}
          setOpenModal={setOpenAlertModal}
          data={data}
          status={status}
          setData={setData}
          setStatus={setStatus}
          setText={setText}
        />
      )}

      <Button onClick={handleClick} addClass="px-5 xs:px-10">
        {text}
      </Button>
    </>
  );
}
