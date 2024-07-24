"use client";

import React, { useCallback } from "react";
import { type FileWithPath, useDropzone } from "react-dropzone";
import { fileURLToPath, FileUrlToPathOptions } from "url";

export const DragAndDrop: React.FC<{
  handleUpload: (path: string, type: string) => void;
}> = ({ handleUpload }) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
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
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
};
