"use client";
import { updateFriendStatus } from "@/app/lib/actions";
import {
  TFriendsForApprove,
  fetchFriendsForApprove,
} from "@/app/lib/fetchData";
import { FriendStatus } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import IconAvatar from "../../Icons/IconAvatar";

interface CustomElements extends HTMLFormControlsCollection {
  id: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function FriendsForApprove({
  loggedUser,
}: {
  loggedUser: string;
}) {
  const [data, setData] = useState<TFriendsForApprove[] | null>();
  const isComponentMounted = useRef(false);

  useEffect(() => {
    isComponentMounted.current = true;
    async function getData() {
      const data = await fetchFriendsForApprove(loggedUser);

      if (data) {
        setData(data);
      }
    }

    getData();
    return () => {
      isComponentMounted.current = false;
    };
  }, [loggedUser]);

  async function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault();
    const { id } = event.currentTarget.elements;
    if (id) {
      event.currentTarget.classList.add("hiddenSlowly");
      await updateFriendStatus(id.value, "ACCEPTED");
    }
  }

  async function handleReset(event: React.FormEvent<CustomForm>) {
    event.preventDefault();
    const { id } = event.currentTarget.elements;
    if (id) {
      event.currentTarget.classList.add("hiddenSlowly");
      await updateFriendStatus(id.value, "REJECTED");
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 place-items-center gap-x-8 gap-y-10 sm:grid-cols-3">
        {data &&
          data.map((item) => {
            return (
              <form
                key={item.id}
                onSubmit={handleSubmit}
                onReset={handleReset}
                className="flex flex-col gap-3"
              >
                <div className="flex min-w-[150px] items-center gap-4">
                  {item.AddedBy.image && (
                    <Image
                      src={item.AddedBy.image}
                      className="h-10 w-10 rounded"
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  )}
                  {!item.AddedBy.image && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 ">
                      <IconAvatar />
                    </div>
                  )}

                  <div className="font-medium">
                    <div>{item.AddedBy.name}</div>
                    <div className="text-xs text-gray-500 ">
                      @{item.AddedBy.profile}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-indigo-500 px-3 py-2 text-center text-xs font-medium text-white hover:outline-none hover:ring-4 hover:ring-indigo-300"
                >
                  Adicionar
                </button>
                <button
                  type="reset"
                  className="rounded-lg bg-gray-100 px-3 py-2 text-center text-xs font-medium text-gray-900 hover:bg-gray-200 hover:outline-none hover:ring-4 hover:ring-gray-100"
                >
                  Cancelar
                </button>
                <input
                  type="text"
                  id="id"
                  name="id"
                  defaultValue={item.id}
                  className="hidden"
                  disabled
                />
              </form>
            );
          })}
      </div>
      {isComponentMounted.current && !data && (
        <div>
          <p> Não existem solicitações de amizade.</p>
        </div>
      )}
    </>
  );
}
