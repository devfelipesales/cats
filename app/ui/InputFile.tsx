import React from "react";

export default function InputFile() {
  return (
    <div>
      <input
        className="block w-full max-w-md cursor-pointer rounded-lg border border-gray-300 bg-gray-100 pr-4 text-sm text-gray-900"
        aria-describedby="file_input_help"
        id="file"
        name="file"
        type="file"
        accept="image/png, image/jpeg, image/svg+xml, image/gif"
      />
      <p
        className="ml-1 mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG ou GIF (max. 3MB).
      </p>
    </div>
  );
}
