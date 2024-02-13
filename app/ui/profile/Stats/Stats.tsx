"use client";

import {
  TPhotosFeed,
  fetchCountViews,
  fetchMostViwedPhotos,
} from "@/app/lib/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { spectral } from "../../fonts";

export default function Stats({ userId }: { userId: string }) {
  const [views, setViews] = useState(0);
  const [photos, setPhotos] = useState<TPhotosFeed[] | []>([]);

  useEffect(() => {
    async function getTotalViewCount() {
      const views = await fetchCountViews(userId);

      if (views && views > 0) {
        setViews(views);
      }
    }
    async function getPhotos() {
      const photos = await fetchMostViwedPhotos(userId);
      if (photos.returnData) {
        setPhotos(photos.returnData);
      }
    }
    getPhotos();
    getTotalViewCount();
  }, [userId]);

  return (
    <div>
      <h2
        className={`${spectral.className} xm mb-12 space-x-2 break-all rounded-lg bg-gradient-to-r from-blue-200 to-purple-300 p-3 text-3xl font-bold tracking-wide text-indigo-900 shadow-xl ring-4 ring-indigo-300 sm:p-5 sm:text-4xl`}
      >
        Visualizações: {views}
      </h2>
      <h3
        className={` ${spectral.className} title3 mb-10 flex items-center gap-2 text-2xl font-bold xs:text-3xl`}
      >
        Fotos mais visualizadas
      </h3>
      <ul className="grid grid-cols-3 gap-3">
        {photos.length > 0 &&
          photos.map((photo) => {
            return (
              <li key={photo.id} className="flex flex-col  gap-2">
                <div className="flex items-center justify-between gap-4 px-2">
                  <p className="font-bold text-indigo-700 xs:text-lg">
                    {photo.name}
                  </p>
                  <div className="flex gap-2">
                    <Image
                      src="/view-color.svg"
                      width={14}
                      height={10}
                      sizes="100vw"
                      alt=""
                    />
                    <p className="text-sm font-bold text-indigo-700">
                      {photo.views}
                    </p>
                  </div>
                </div>

                <Image
                  src={photo.src}
                  alt={photo.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full rounded object-cover"
                  priority
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
