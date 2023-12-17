"use client";

import React from "react";
import PhotoContent from "../photo/PhotoContent";
import styles from "@/app/ui/feed/FeedModal.module.css";

export default function FeedModal({
  modal,
  setModal,
  src,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  src: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [photoModal, setPhotoModal] = React.useState("");

  // Fetch Data!!

  function handleOutsideClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      console.log("evento de sair do modal");

      setPhotoModal("");
      setModal(false);
      window.document.body.classList.remove("remove-scrolling");
    }
  }

  return (
    <section className={`${styles.modal}`} onClick={handleOutsideClick}>
      {/* {error && <ErrorMessage error={error} />} */}
      {/* {loading && <Loading />} */}
      {/* {photoModal && <PhotoContent data={src} />} */}
      <PhotoContent data={src} setModal={setModal} />
    </section>
  );
}
