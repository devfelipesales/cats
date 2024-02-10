"use server";

import { ITEMS_PER_PAGE } from "./constants";
import { prismaClient } from "./prisma";
import { supabase } from "./supabase";
import { unstable_noStore as noStore } from "next/cache";

export type TPhotosFeed = {
  id: string;
  name: string;
  src: string;
  views: number;
};

export async function fetchPhotos(offset?: number, userId?: string) {
  noStore();

  let returnData: TPhotosFeed[] = [];

  const photos = await prismaClient.photos.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    select: {
      id: true,
      name: true,
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
        name: photo.name,
        src: formatUrl,

        views: photo._count.views,
      };
    });
  }

  return {
    returnData,
  };
}

export type TPhoto = {
  id: string;
  userId: string;
  name: string;
  age: number;
  weight: number;
  filepath: string;
  user: {
    id: string;
    profile: string;
  };
  comments: {
    id: string;
    createdAt: Date;
    user: {
      id: string;
      profile: string;
    };
    comment: string;
  }[];
  views: {
    id: string;
    user: {
      id: string;
      profile: string;
    };
  }[];
  _count: {
    views: number;
  };
} | null;

export async function fetchPhotoById(id: string) {
  noStore();

  const photo = await prismaClient.photos.findUnique({
    select: {
      id: true,
      userId: true,
      name: true,
      age: true,
      weight: true,
      filepath: true,

      user: {
        select: {
          id: true,
          profile: true,
        },
      },
      comments: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      views: {
        distinct: "viewedBy",
        select: {
          id: true,
          user: {
            select: {
              id: true,
              profile: true,
            },
          },
        },
      },
      _count: {
        select: {
          views: true,
        },
      },
    },
    where: {
      id: id,
    },
  });

  if (photo) {
    const publicUrl = await supabase.storage.from("photos").getPublicUrl("")
      .data.publicUrl;

    const formatUrl = `${publicUrl}${photo.filepath}`;

    photo.filepath = formatUrl;
  }

  return photo;
}

export type TUser = {
  id: string;
  name: string;
} | null;

export async function fetchIdByProfile(profile: string) {
  const user: TUser = await prismaClient.users.findUnique({
    select: {
      id: true,
      name: true,
    },
    where: {
      profile: profile,
    },
  });

  return user;
}
