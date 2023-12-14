"use server";
// getPublicUrl("") =  https://hltukherhizzxvjaqqcj.supabase.co/storage/v1/object/public/photos/
// const url = await supabase.storage.from("photos").getPublicUrl("");

import { supabase } from "./supabase";

type TReturnPhotos = {
  id: string;
  src: string;
};

export async function listPhotos(limit?: number, offset?: number) {
  // List all the files in the "photos" bucket
  let returnData: TReturnPhotos[] = [];
  const userId = "958912ab-2b99-4ebb-9072-e983af3b6f2f";
  const publicUrl = await supabase.storage.from("photos").getPublicUrl("").data
    .publicUrl;
  const { data, error } = await supabase.storage
    .from("photos")
    .list(userId + "/", {
      limit,
      offset,
    });

  if (data) {
    returnData = data.map((photo) => {
      const formatUrl = `${publicUrl}${userId}/${photo.name}`;
      return {
        id: photo.id,
        src: formatUrl,
      };
    });
  }
  return {
    returnData,
    error,
  };
}

export async function listPhotosByUser(userId: string) {
  const { data, error } = await supabase.storage
    .from("photos")
    .list(userId + "/", {
      limit: 10,
      offset: 0,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (data) {
    console.log("listou os dados");
    console.log(data);
  }

  if (error) {
    console.log("Deu Erro");
    console.log(error);
  }

  return {
    data,
    error,
  };
}
