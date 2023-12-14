"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/(Home)/home.module.css";

import LoadingFeed from "./LoadingFeed";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader";
import { listPhotos } from "@/app/lib/data";

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
  let indexImg = 0;

  React.useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const photos = await listPhotos(10, 0);

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

        const photos = await listPhotos(10, index * 10);
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

  return (
    <>
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
        <div className={`${styles.gridImages} ${styles.animeLeft}`}>
          {items.map((img, index) => {
            if (indexImg === 5) {
              indexImg = 0;
            }
            indexImg += 1;

            if (indexImg === 2) {
              return (
                <Image
                  key={index}
                  src={img.src}
                  alt={img.id}
                  className={`${styles.imageBig} ${styles.animeLeft}`}
                  width={600}
                  height={600}
                />
              );
            } else {
              return (
                <Image
                  key={index}
                  src={img.src}
                  alt={img.id}
                  className={`${styles.imgSmall} ${styles.animeLeft}`}
                  width={300}
                  height={300}
                />
              );
            }
          })}
        </div>
      </InfiniteScroll>

      {isLoading && <LoadingFeed />}
    </>
  );
}
