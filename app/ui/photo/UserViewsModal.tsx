"use client";

import { TUserViews, fetchUserViews } from "@/app/lib/fetchData";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { grandStander, spectral } from "../fonts";
import clsx from "clsx";

export default function UserViewsModal({
  userId,
  photoId,
  openModal,
  setOpenModal,
}: {
  userId: string;
  photoId: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [items, setItems] = useState<[] | TUserViews[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchUserViews(photoId);
      if (data) {
        setItems(data);
      }
    }
    getData();
  }, [photoId]);

  return (
    <>
      <Modal
        dismissible
        show={openModal}
        size="sm"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <p className={`${spectral.className} break-all text-2xl`}>
            Visualizações
          </p>
        </Modal.Header>

        <Modal.Body>
          {items &&
            items.map((item, index) => {
              return (
                <div
                  key={item.viewedBy}
                  className={clsx("grid grid-cols-2 items-center", {
                    "mt-5": index > 0,
                  })}
                >
                  <Link
                    className={`${grandStander.className} cursor-pointer text-sm text-indigo-700 underline transition-colors hover:text-indigo-400`}
                    href={`/${item.user.profile}`}
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    @{item.user.profile}
                  </Link>

                  <div className="flex w-12 items-center gap-2 justify-self-end ">
                    <Image
                      src="/view-color.svg"
                      width={16}
                      height={10}
                      sizes="100vw"
                      alt=""
                    />
                    <p className="text-xs text-indigo-800">
                      x{item.user._count.views}
                    </p>
                  </div>
                </div>
              );
            })}
        </Modal.Body>
      </Modal>
    </>
  );
}
