"use server";

import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";

export async function uploadPhoto(formData: FormData) {
  console.log("Passou no Action");
  console.log(formData);

  const file = formData.get("file");
  const name = formData.get("name");
  const age = formData.get("age");
  const weight = formData.get("weight");
  console.log(file);
  console.log(name);
  console.log(age);
  console.log(weight);

  if (!file) {
    return;
  }

  const userId = "958912ab-2b99-4ebb-9072-e983af3b6f2f";

  const { data, error } = await supabase.storage
    .from("photos")
    .upload(userId + "/" + uuidv4(), file);
  // .upload(userId + "/" + name, file);

  if (data) {
    // save filepath in database
    const filepath = data.path;
    console.log(data);
    console.log(filepath);
  }

  if (error) {
    console.log("Deu Erro");
    console.log(error);
  }

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath('/profile');
  // redirect('/profile');
  // -------------------------------------------------------------------------
}
