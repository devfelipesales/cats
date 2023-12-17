"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { grandStander } from "@/app/ui/fonts";
import { montSerrat } from "@/app/ui/fonts";

export default function PhotoContent({
  data,
  setModal,
}: {
  data: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section className="animeBottom relative mx-auto grid w-full max-w-[960px] rounded bg-white transition-all lg:flex">
      <button
        type="button"
        onClick={() => {
          setModal(false);
          window.document.body.classList.remove("remove-scrolling");
        }}
        className="absolute right-2 top-2 ms-auto inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-l from-gray-100 to-gray-500 text-sm text-gray-800 hover:text-white md:hidden"
      >
        <svg
          className="h-[14px] w-[14px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          ></path>
        </svg>
      </button>

      <Image
        src={data}
        width={0}
        height={0}
        sizes="100vw"
        alt=""
        className="max-h-[50vh] w-[100%] rounded-bl rounded-tl object-cover lg:max-h-[100%] lg:w-[60%] "
      />
      <section className="flex flex-1 flex-col gap-3 overflow-y-auto scroll-smooth p-5 text-indigo-950">
        <div className="flex items-center justify-between text-indigo-700 opacity-80">
          <Link
            href="#"
            className={`${grandStander.className} underline transition-colors hover:text-indigo-400`}
          >
            @felipe
          </Link>
          <div className="flex gap-1 ">
            <Image
              src="/view-color.svg"
              width={16}
              height={10}
              sizes="100vw"
              alt=""
            />
            <p className="text-sm">123456</p>
          </div>
        </div>
        <div className="mt-3 flex">
          <h1
            className={`${montSerrat.className} title break-all text-4xl md:text-5xl`}
          >
            Greuson
          </h1>
        </div>
        <div className="flex gap-5 text-lg font-semibold ">
          <p>| 10kg</p>
          <p>| 5 anos</p>
        </div>
        {/* Map dos comentários */}

        <section className="mt-5 flex flex-col gap-5">
          <div
            className={`${grandStander.className} flex flex-col gap-1 rounded-lg bg-gradient-to-r from-blue-200 to-purple-300 px-4 py-3 text-sm`}
          >
            <span className="inline cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400">
              @gabriel:
            </span>
            <p>
              Muito bonito esse gato. Parabéns. Eu tinha um parecido, mas fugiu
              de casa. Agora tenho mais dois.
            </p>
          </div>
          <div
            className={`${grandStander.className} flex flex-col gap-1 rounded-lg bg-indigo-200 px-4 py-3 text-sm`}
          >
            <p className="cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400">
              @junior:
            </p>
            <p>
              Muito bonito esse gato. Parabéns. Eu tinha um parecido, mas fugiu
              de casa. Agora tenho mais dois.
            </p>
          </div>
          <div
            className={`${grandStander.className} flex flex-col gap-1 rounded-lg bg-indigo-200 px-4 py-3 text-sm`}
          >
            <p className="cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400">
              @danilo:
            </p>
            <p>
              Muito bonito esse gato. Parabéns. Eu tinha um parecido, mas fugiu
              de casa. Agora tenho mais dois.
            </p>
          </div>
          <div
            className={`${grandStander.className} flex flex-col gap-1 rounded-lg bg-indigo-200 px-4 py-3 text-sm`}
          >
            <p className="cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400">
              @pedro:
            </p>
            <p>
              Muito bonito esse gato. Parabéns. Eu tinha um parecido, mas fugiu
              de casa. Agora tenho mais dois.
            </p>
          </div>
          <div
            className={`${grandStander.className} flex flex-col gap-1 rounded-lg bg-indigo-200 px-4 py-3 text-sm`}
          >
            <p className="cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400">
              @rafael:
            </p>
            <p>
              Muito bonito esse gato. Parabéns. Eu tinha um parecido, mas fugiu
              de casa. Agora tenho mais dois.
            </p>
          </div>
          <div
            className={`${grandStander.className} flex flex-col gap-1 rounded-lg bg-indigo-200 px-4 py-3 text-sm`}
          >
            <p className="cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400">
              @leandro:
            </p>
            <p>
              Muito bonito esse gato. Parabéns. Eu tinha um parecido, mas fugiu
              de casa. Agora tenho mais dois.
            </p>
          </div>
          <div
            className={`${grandStander.className} flex flex-col gap-1 rounded-lg bg-indigo-200 px-4 py-3 text-sm`}
          >
            <p className="cursor-pointer font-bold text-indigo-800 underline hover:text-indigo-400">
              @arthur:
            </p>
            <p>
              Muito bonito esse gato. Parabéns. Eu tinha um parecido, mas fugiu
              de casa. Agora tenho mais dois.
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}
