'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/app/(Home)/home.module.css';
import { clsx } from 'clsx';

import LoadingFeed from './LoadingFeed';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader';

export interface Welcome {
  id: number;
  title: string;
  // price: number;
  // description: string;
  images: string[];
  // creationAt: Date;
  // updatedAt: Date;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  // creationAt: Date;
  // updatedAt: Date;
}

export default function Feed() {
  const [items, setItems] = React.useState<[] | Welcome[]>([]);
  const [index, setIndex] = React.useState(2);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  let indexImg = 0;

  React.useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          console.log('Fez o Fetch inicial');
          const response = await fetch(
            'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'
          );
          const data = (await response.json()) as Welcome[];
          if (!data.length) {
            console.log('caiu no sem dados do fetch inicial');
            setHasMore(false);
            return;
          }
          console.log(data);

          setItems(data);
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
        console.log('Fez o Fetch do scroll');
        console.log(index);

        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${index}&limit=4`
        );
        const data = (await response.json()) as Welcome[];
        console.log(data);

        if (!data.length) {
          console.log('caiu no sem dados do fetch do scroll');
          setHasMore(false);
          return;
        }
        console.log('passou para setar os dados');

        setItems((prevItems) => [...prevItems, ...data]);
      } catch (error) {
        console.log(`Ocorreu um erro ${error}`);
      } finally {
        setIsLoadingMore(false);
      }
      console.log('atualizou o index');
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
          <p className='text-center py-8 text-slate-400'>
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
                  src={img.images[0]}
                  alt={img.category.name}
                  className={`${styles.imageBig} ${styles.animeLeft}`}
                  width={600}
                  height={600}
                />
              );
            } else {
              return (
                <Image
                  key={index}
                  src={img.images[0]}
                  alt={img.category.name}
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
