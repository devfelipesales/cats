type InputProps = React.ComponentProps<"input"> & {
  name: string;
  labelText?: string;
  labelClass?: string;
  inputClass?: string;
};

export default function Input({
  children,
  name,
  labelText,
  labelClass,
  ...props
}: InputProps) {
  return (
    <div>
      {labelText && (
        <label
          htmlFor={name}
          className={`mb-2 block text-sm font-medium text-gray-900 ${labelClass}`}
        >
          {labelText}
        </label>
      )}

      <input
        id={name}
        name={name}
        {...props}
        className={`block w-full max-w-md rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 hover:ring-1 hover:ring-indigo-600 focus:ring-indigo-600 ${props.className}`}
      />
    </div>
  );
}
