"use server";

import { ITEMS_PER_PAGE } from "./constants";
import { prismaClient } from "./prisma";
import { supabase } from "./supabase";
import { unstable_noStore as noStore } from "next/cache";

export type TPhotosFeed = {
  id: string;
  src: string;
  views: number;
};

export async function listPhotos(offset?: number, userId?: string) {
  noStore();

  let returnData: TPhotosFeed[] = [];

  const photos = await prismaClient.photos.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    select: {
      id: true,
      filepath: true,
      _count: {
        select: {
          views: true,
        },
      },
    },
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (photos) {
    const publicUrl = await supabase.storage.from("photos").getPublicUrl("")
      .data.publicUrl;

    returnData = photos.map((photo) => {
      const formatUrl = `${publicUrl}${photo.filepath}`;
      return {
        id: photo.id,
        src: formatUrl,
        views: photo._count.views,
      };
    });
  }

  return {
    returnData,
  };
}
