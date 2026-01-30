"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

export function ImageUploader() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    setFiles(filesWithPreview);
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files",
      );

      const fileTooLarge = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "file-too-large",
      );

      if (tooManyFiles) {
        toast.error("Has superado el número máximo de archivos (15)");
      }

      if (fileTooLarge) {
        toast.error(
          "Uno o más archivos superan el tamaño máximo permitido (5MB)",
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 10,
    maxSize: 1024 * 1024 * 5,
    accept: {
      "image/*": [],
    },
  });
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <>
      <div
        className={`relative border-2 border-dashed rounded-lg
      transition-colors duration-200 ease-in-out w-full h-64 
      ${
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      }`}
        {...getRootProps()}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full gap-y-3">
              <p>Drag 'n' drop some files here, or click to select files</p>
              <button
                type="button"
                className="rounded-md bg-[#880808] opacity-50 px-4 py-2 text-sm 
              font-medium text-white disabled:opacity-50 cursor-pointer"
              >
                Click here
              </button>
            </div>
          )}
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative aspect-4/3 max-h-28 overflow-hidden rounded-md border bg-muted"
            >
              <img
                src={file.preview}
                alt={file.name}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
