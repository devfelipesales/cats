"use client";

import React from "react";
import Image from "next/image";
// import styles from "@/app/(Home)/feed.module.css";
import styles from "@/app/ui/feed/Feed.module.css";

import LoadingFeed from "./LoadingFeed";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader";
import { listPhotos } from "@/app/lib/data";
import FeedModal from "./FeedModal";

type TReturnPhotos = {
  id: string;
  src: string;
};

export default function Feed() {
  const [items, setItems] = React.useState<[] | TReturnPhotos[]>([]);
  const [index, setIndex] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [photoModal, setPhotoModal] = React.useState("");
  let indexImg = 0;
  let gridSpan = "";
  let imgSize = "";

  React.useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const photos = await listPhotos(9, 0);

          console.log(photos.returnData);

          if (!photos.returnData.length) {
            console.log("caiu no sem dados do fetch inicial");
            setHasMore(false);
            return;
          }

          setItems(photos.returnData);
        } catch (error) {
          console.log(`Ocorreu um erro ${error}`);
        } finally {
          setIsLoading(false);
        }
      }, 3000);
    };

    getData();
  }, []);

  const fetchMoreData = () => {
    setIsLoadingMore(true);

    setTimeout(async () => {
      try {
        console.log("Fez o Fetch do scroll");
        console.log(index);

        const photos = await listPhotos(9, index * 9);
        console.log(photos.returnData);

        if (!photos.returnData.length) {
          console.log("caiu no sem dados do fetch do scroll");
          setHasMore(false);
          return;
        }
        console.log("passou para setar os dados");

        setItems((prevItems) => [...prevItems, ...photos.returnData]);
      } catch (error) {
        console.log(`Ocorreu um erro ${error}`);
      } finally {
        setIsLoadingMore(false);
      }
      console.log("atualizou o index");
      setIndex((prevIndex) => prevIndex + 1);
    }, 3000);
  };

  function handleModal(event: React.MouseEvent) {
    console.log("passou evento de chamar o modal");

    setPhotoModal(items[3].src);
    setModal(true);
    window.document.body.classList.add("remove-scrolling");
  }

  return (
    <>
      {modal && (
        <FeedModal modal={modal} setModal={setModal} src={photoModal} />
      )}
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
          <ul className={`${styles.gridImages} animeLeft`}>
            {items.map((img, index) => {
              gridSpan = "";
              imgSize = `${styles.imgSmall}`;
              indexImg += 1;

              if (indexImg === 2) {
                gridSpan = `${styles.gridSpan}`;
                imgSize = `${styles.imgBig}`;
              }

              if (indexImg === 6) {
                indexImg = 0;
              }

              return (
                <li
                  key={index}
                  className={`${gridSpan} ${imgSize} animeLeft group relative overflow-hidden hover:cursor-pointer`}
                  onClick={handleModal}
                >
                  <Image
                    src={img.src}
                    alt={img.id}
                    width={0}
                    height={0}
                    sizes="100vw"
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
                        152545
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
  );
}
