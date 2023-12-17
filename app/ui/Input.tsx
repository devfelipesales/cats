type InputProps = React.ComponentProps<"input"> & {
  name: string;
  labelText: string;
};

export default function Input({
  children,
  name,
  labelText,
  ...props
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {labelText}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  hover:ring-1 hover:ring-indigo-600 focus:ring-indigo-600"
      />
    </div>
  );
}

// className="block w-full max-w-md cursor-pointer rounded-lg border border-gray-300 bg-gray-100 text-sm text-gray-900 "
