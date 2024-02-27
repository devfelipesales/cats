"use client";

import React from "react";
import PhotoContent from "../photo/PhotoContent";
import styles from "@/app/ui/feed/FeedModal.module.css";
import { TPhoto, fetchPhotoById } from "@/app/lib/fetchData";
import FailureAlert from "../FailureAlert";

export default function FeedModal({
  setModal,
  photoId,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  photoId: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [photo, setPhoto] = React.useState<TPhoto | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      const data = (await fetchPhotoById(photoId)) as TPhoto;

      if (!data) {
        setError("Erro ao abrir a foto");
        return;
      }

      setPhoto(data);
    }
    fetchData();
  }, [photoId]);

  function handleOutsideClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      setModal(false);
      if (typeof window !== "undefined") {
        window.document.body.classList.remove("remove-scrolling");
      }
    }
  }

  return (
    <section className={`${styles.modal}`} onClick={handleOutsideClick}>
      {error && <FailureAlert text={error} />}
      {/* {loading && <Loading />} */}
      <PhotoContent photo={photo} setModal={setModal} />
    </section>
  );
}
