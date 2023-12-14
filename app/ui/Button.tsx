import React from "react";

type ButtonProps = React.ComponentProps<"button">;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="rounded-lg bg-indigo-500 px-10 py-3 font-medium text-white  transition-shadow hover:ring-4 hover:ring-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      {...props}
    >
      {children}
    </button>
  );
}
