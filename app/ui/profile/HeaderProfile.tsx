import React from "react";

export default function HeaderProfile() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl">TÍTULO DA PÁGINA</h1>
      <div className="flex gap-2">
        <p className="border border-indigo-500 px-4 py-2">A</p>
        <p className="border border-indigo-500 px-4 py-2">B</p>
        <p className="border border-indigo-500 px-4 py-2">C</p>
        <p className="border border-indigo-500 px-4 py-2">D</p>
      </div>
    </div>
  );
}
