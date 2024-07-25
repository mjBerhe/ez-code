"use client";

import { useCallback, useState } from "react";
import { type FileWithPath, useDropzone } from "react-dropzone";
import { fileURLToPath, FileUrlToPathOptions } from "url";

export const DragAndDrop: React.FC<{
  handleUpload: (path: string, type: string) => void;
}> = ({ handleUpload }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(isLoading);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setIsLoading(true);
    // Do something with the files
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const base64String = reader.result
          ? (reader.result as string).split(",")[1]
          : "";
        base64String && handleUpload(base64String, file.type);
      };
    }
    setIsLoading(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex h-full w-full rounded-lg bg-[#bdbdbd]/10 p-4 text-white shadow-lg"
    >
      <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg border border-dashed">
        <input {...getInputProps()} className="" />
        {isDragActive ? (
          <p className="p-2">Drop em here ...</p>
        ) : (
          <p className="p-2">Click to upload or drag &apos;n&apos; drop</p>
        )}
      </div>
    </div>
  );
};
