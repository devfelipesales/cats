"use client";

import { useState } from "react";
import { clsx } from "clsx";
import Friends from "./Friends";
import FriendsForApprove from "./FriendsForApprove";
import PendingFriends from "./PendingFriends";

export default function NavFriends({ loggedUser }: { loggedUser: string }) {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <div className="md:flex">
      <ul className="flex-column space-y mb-4 space-y-4 text-sm font-medium text-gray-500 transition-all md:mb-0 md:me-4">
        <li>
          <button
            type="button"
            id="1"
            className={clsx(
              "inline-flex w-full items-center rounded-lg bg-gray-50 px-4 py-3 transition-all hover:bg-gray-100 hover:text-indigo-500",
              {
                "z-10 text-indigo-500 ring-2 ring-indigo-500": tabIndex === 1,
              },
            )}
            aria-current="page"
            onClick={({ currentTarget }) => setTabIndex(+currentTarget.id)}
          >
            <svg
              className="me-2 h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 22"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
            Todos os Amigos
          </button>
        </li>
        <li>
          <button
            type="button"
            id="2"
            className={clsx(
              "inline-flex w-full items-center rounded-lg bg-gray-50 px-4 py-3 transition-all hover:bg-gray-100 hover:text-indigo-500",
              {
                "z-10 text-indigo-500 ring-2 ring-indigo-500": tabIndex === 2,
              },
            )}
            onClick={({ currentTarget }) => setTabIndex(+currentTarget.id)}
          >
            <svg
              className="me-2 h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 22"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Solicitações Recebidas
          </button>
        </li>
        <li>
          <button
            type="button"
            id="3"
            className={clsx(
              "inline-flex w-full items-center rounded-lg bg-gray-50 px-4 py-3 transition-all hover:bg-gray-100 hover:text-indigo-500",
              {
                "z-10 text-indigo-500 ring-2 ring-indigo-500": tabIndex === 3,
              },
            )}
            onClick={({ currentTarget }) => setTabIndex(+currentTarget.id)}
          >
            <svg
              className="me-2 h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 22"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Solicitações Enviadas
          </button>
        </li>
      </ul>
      <div className="text-medium w-full rounded-lg p-6 text-gray-500">
        {tabIndex === 1 && <Friends loggedUser={loggedUser} />}
        {tabIndex === 2 && <FriendsForApprove loggedUser={loggedUser} />}
        {tabIndex === 3 && <PendingFriends loggedUser={loggedUser} />}
      </div>
    </div>
  );
}
