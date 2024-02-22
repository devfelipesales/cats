"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { grandStander } from "@/app/ui/fonts";
import { spectral } from "@/app/ui/fonts";
import { TPhoto } from "@/app/lib/fetchData";
import IconClose from "../Icons/IconClose";
import { createComment } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { TUser } from "@/app/lib/auth";
import { formatDateToLocal, formatTimeToLocal } from "@/app/lib/utils";
import { clsx } from "clsx";

type TPhotoComments = {
  id: string;
  createdAt: Date;
  user: {
    id: string;
    profile: string;
  };
  comment: string;
};

export default function PhotoContent({
  photo,
  setModal,
}: {
  photo: TPhoto;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const inputComment = React.useRef<HTMLInputElement>(null);
  const IconSend = React.useRef<SVGSVGElement>(null);
  const SectionScroll = React.useRef<HTMLElement>(null);
  const { status, data } = useSession();
  const user = data?.user as TUser;

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(false);
        if (typeof window !== "undefined") {
          window.document.body.classList.remove("remove-scrolling");
        }
      }
    },
    [setModal],
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!photo) {
    return;
  }

  interface CustomElements extends HTMLFormControlsCollection {
    comment: HTMLInputElement;
  }

  interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
  }

  async function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault();
    const { comment } = event.currentTarget.elements;

    if (!comment.value) {
      return;
    }

    const data = await createComment(
      user.id,
      photo?.id as string,
      comment.value,
    );

    if (data) {
      let dataComment: TPhotoComments = {
        id: data.id,
        createdAt: data.createdAt,
        user: {
          id: user.id,
          profile: user.profile,
        },
        comment: data.comment,
      };

      // inserts the new comment to the beginning of array
      photo?.comments.unshift(dataComment);

      // Clear input comment
      if (inputComment?.current) {
        inputComment.current.value = "";
      }

      // Remove style from IconSend after send a comment.
      IconSend.current?.classList.remove(
        "fill-indigo-400",
        "stroke-indigo-500",
      );

      // Set scroll on top after send a comment
      if (SectionScroll?.current) {
        SectionScroll.current?.scrollTo({
          top: 0,
        });
      }
    }
  }

  function handleChange({
    currentTarget,
  }: {
    currentTarget: EventTarget & HTMLInputElement;
  }) {
    // Empty Input Comment - = Remove style
    if (!currentTarget.value) {
      IconSend.current?.classList.remove(
        "fill-indigo-400",
        "stroke-indigo-500",
      );
      return;
    }
    // Has value on Input Comment = Add style
    IconSend.current?.classList.add("fill-indigo-400", "stroke-indigo-500");
  }

  return (
    <section className="animeBottom relative mx-auto flex h-[90%] w-full max-w-[960px] flex-col rounded bg-white transition-all lg:h-full lg:flex-row">
      <Image
        id={photo?.id}
        src={photo?.filepath}
        width={0}
        height={0}
        sizes="100vw"
        alt=""
        className="hidden max-h-[40vh] w-auto rounded-bl rounded-tl object-cover lg:block lg:max-h-[100%] lg:w-[60%]"
      />

      <section className="relative flex h-full flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2 px-4 pt-5 text-indigo-700 opacity-80 lg:flex-row lg:justify-between">
          <Link
            href={`/${photo?.user.profile}`}
            onClick={() => {
              setModal(false);
              if (typeof window !== "undefined") {
                window.document.body.classList.remove("remove-scrolling");
              }
            }}
            className={`${grandStander.className} underline transition-colors hover:text-indigo-400`}
          >
            @{photo?.user.profile}
          </Link>

          {/* CloseButton - screen width < 1024px */}
          <button
            type="button"
            aria-keyshortcuts="Escape"
            title="Clique ou pressione Esc para fechar"
            onClick={() => {
              setModal(false);
              if (typeof window !== "undefined") {
                window.document.body.classList.remove("remove-scrolling");
              }
            }}
            className="absolute right-0 top-0 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-s-lg bg-gradient-to-r from-blue-200 to-purple-300 text-sm text-indigo-800 hover:text-white lg:hidden"
          >
            <IconClose />
          </button>

          <div className="relative flex gap-4">
            <div className="flex items-center gap-1">
              <Image
                src="/view-color.svg"
                width={16}
                height={10}
                sizes="100vw"
                alt=""
              />
              <p className="text-sm">{photo?._count.views}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-between pr-4">
          <div>
            <div className="mt-3 flex px-4">
              <h1
                className={`${spectral.className} title break-all text-4xl text-indigo-950 md:text-5xl`}
              >
                {photo?.name}
              </h1>
            </div>
            <div className="mb-5 mt-3 flex flex-col gap-5 px-4 text-lg font-semibold text-indigo-950 xxs:flex-row">
              <p>| {photo?.weight}kg</p>
              <p>| {photo?.age} anos</p>
            </div>
          </div>
          <div>
            <Image
              id={photo?.id}
              src={photo?.filepath}
              width={0}
              height={0}
              sizes="100vw"
              alt=""
              className={clsx(
                "h-auto w-32 rounded-lg object-contain lg:hidden",
                {
                  // checks if comments section has scroll and set margin-right on photo
                  "mr-[18px]":
                    SectionScroll.current &&
                    SectionScroll.current.scrollHeight >
                      SectionScroll.current.offsetHeight,
                },
              )}
            />
          </div>
        </div>

        <section
          ref={SectionScroll}
          className="mb-5 flex flex-col gap-3 overflow-y-auto scroll-smooth px-4"
        >
          {photo.comments.length
            ? photo.comments.map((comment) => {
                return (
                  <section key={comment.id} className="relative">
                    <div
                      className={`${grandStander.className} flex flex-col gap-5 rounded-lg bg-gradient-to-r from-blue-200 to-purple-300 px-4 py-3 text-sm`}
                    >
                      <Link
                        href={`/${comment.user.profile}`}
                        onClick={() => {
                          setModal(false);
                          if (typeof window !== "undefined") {
                            window.document.body.classList.remove(
                              "remove-scrolling",
                            );
                          }
                        }}
                        className="inline cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400"
                      >
                        @{comment.user.profile}:
                      </Link>
                      <p>{comment.comment}</p>
                    </div>
                    <p
                      className={`${spectral.className} absolute right-2 top-1 text-xs italic text-gray-500`}
                    >
                      {formatDateToLocal(comment.createdAt)}
                    </p>
                    <p
                      className={`${spectral.className} absolute bottom-1 right-2 text-xs italic text-gray-500`}
                    >
                      {formatTimeToLocal(comment.createdAt)}
                    </p>
                  </section>
                );
              })
            : null}
        </section>
        {status === "authenticated" && (
          <form
            action=""
            className="mt-auto flex items-center gap-3 px-4 pb-5"
            onSubmit={handleSubmit}
          >
            {/* Comment Input */}
            <div className="relative w-full">
              <button
                type="submit"
                className="absolute inset-y-0 end-4 flex cursor-pointer items-center"
              >
                <svg
                  ref={IconSend}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
              <input
                ref={inputComment}
                onChange={handleChange}
                name="comment"
                type="text"
                id="input-group-1"
                placeholder="Comente..."
                className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 pe-14  text-sm text-gray-900 hover:border-indigo-600 hover:ring-indigo-600 focus:border-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </form>
        )}
      </section>
    </section>
  );
}
