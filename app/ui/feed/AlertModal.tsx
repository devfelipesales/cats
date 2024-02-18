"use client";

import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Link from "next/link";

export default function AlertModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Faça o Login para acessar essa funcionalidade
          </h3>
          <div className="flex justify-center">
            <Link
              href="/login"
              onClick={() => setOpenModal(false)}
              className="rounded-lg bg-indigo-500 px-10 py-3 font-medium text-white  transition-shadow hover:ring-4 hover:ring-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
