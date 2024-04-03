import { clsx } from "clsx";

type ButtonProps = React.ComponentProps<"button"> & {
  loading?: boolean;
  addClass?: string;
};

export default function Button({
  children,
  loading,
  addClass,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `rounded-lg bg-indigo-500 px-10 py-3 font-medium text-white transition-shadow hover:ring-4 hover:ring-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${addClass}`,
        {
          "animate-pulse": loading === true,
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
}
