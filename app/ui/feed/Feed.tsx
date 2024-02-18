"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import LoadingFeed from "./LoadingFeed";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader";
import FeedModal from "./FeedModal";
import { TPhotosFeed, fetchPhotos } from "@/app/lib/fetchData";
import { ITEMS_PER_PAGE } from "@/app/lib/constants";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import { TUser } from "@/app/lib/auth";
import { addCountView } from "@/app/lib/actions";
import AlertModal from "./AlertModal";

export default function Feed({ userId }: { userId?: string }) {
  const [items, setItems] = React.useState<[] | TPhotosFeed[]>([]);
  const [index, setIndex] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [photoModal, setPhotoModal] = React.useState("");
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const isComponentMounted = useRef(false);

  let indexImg = 0;

  const { status, data } = useSession();
  const user = data?.user as TUser;

  React.useEffect(() => {
    isComponentMounted.current = true;

    const getData = async () => {
      setIsLoading(true);
      try {
        const photos = await fetchPhotos(0, userId);

        if (!photos.returnData.length) {
          setHasMore(false);
          return;
        }

        if (photos.returnData.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        }

        setItems(photos.returnData);
      } catch (error) {
        console.error(`Erro: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      setIsLoading(false);
      setIsLoadingMore(false);
      isComponentMounted.current = false;
    };
  }, [userId]);

  const fetchMoreData = async () => {
    setIsLoadingMore(true);

    try {
      const photos = await fetchPhotos(index * ITEMS_PER_PAGE, userId);

      if (!photos.returnData.length) {
        setHasMore(false);
        return;
      }

      setItems((prevItems) => [...prevItems, ...photos.returnData]);
    } catch (error) {
      console.error(`Ocorreu um erro ${error}`);
    } finally {
      setIsLoadingMore(false);
    }
    setIndex((prevIndex) => prevIndex + 1);
  };

  async function handleModal({
    currentTarget,
  }: {
    currentTarget: EventTarget & HTMLLIElement;
  }) {
    // Only counts views for logged in users
    if (status !== "authenticated") {
      setOpenAlertModal(true);
      return;
    }

    await addCountView(currentTarget.id, user.id);

    const newItems = items.map((img) => {
      if (img.id === currentTarget.id) {
        img.views += 1;
      }
      return img;
    });
    setItems(newItems);

    setPhotoModal(currentTarget.id);
    setModal(true);
    window.document.body.classList.add("remove-scrolling");
  }

  return (
    isComponentMounted.current && (
      <>
        {openAlertModal && (
          <AlertModal
            openModal={openAlertModal}
            setOpenModal={setOpenAlertModal}
          />
        )}
        {modal && <FeedModal setModal={setModal} photoId={photoModal} />}
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={isLoadingMore && <Loader />}
          endMessage={
            <p className="py-8 text-center text-slate-400">
              Não existem mais postagens.
            </p>
          }
        >
          <div className="mx-auto">
            <ul
              className={`animeLeft grid grid-cols-2 gap-2 xs:gap-3 md:grid-cols-3`}
            >
              {items.map((img, index) => {
                // Início - Trecho de código apenas para telas maiores que 768px.
                // A segunda foto é expandida a cada conjunto de 6 fotos.
                indexImg += 1;

                // Reseta o index na 6ª foto
                if (indexImg === 6) {
                  indexImg = 0;
                }
                // Fim ------------------------------------------------------------
                return (
                  <li
                    key={img.id}
                    id={img.id}
                    className={clsx(
                      "animeLeft group relative h-full overflow-hidden hover:cursor-pointer md:h-[269px]",
                      {
                        "md:col-span-2 md:row-span-2 md:h-[550px]":
                          indexImg === 2,
                      },
                    )}
                    onClick={handleModal}
                  >
                    <Image
                      src={img.src}
                      alt={img.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full rounded object-cover"
                      priority
                    />

                    {/* Image Hover Effect */}
                    <div className="to-opacity-30 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gradient-to-t from-gray-800 via-gray-800 opacity-0 group-hover:opacity-50"></div>
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0 hover:opacity-100">
                      <div className="flex items-center gap-1">
                        <Image
                          src="/view.svg"
                          alt="visualizações"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-4"
                        />
                        <p className="text-sm font-medium text-gray-200">
                          {img.views}
                        </p>
                      </div>
                    </div>
                    {/* End Image Hover Effect */}
                  </li>
                );
              })}
            </ul>
          </div>
        </InfiniteScroll>

        {isLoading && <LoadingFeed />}
      </>
    )
  );
}
