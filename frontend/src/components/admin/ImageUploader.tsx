"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

type Props = {
  files: (File & { preview: string })[];
  setFiles: (files: (File & { preview: string })[]) => void;
};

export function ImageUploader({ files, setFiles }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setFiles(filesWithPreview);
    },
    [setFiles],
  );

  const handleDelete = useCallback(
    (indexToDelete: number) => {
      setFiles(files.filter((_, index) => index !== indexToDelete));
    },
    [files, setFiles],
  );

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      return;
    }

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);

    setFiles(newFiles);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files",
      );

      const fileTooLarge = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "file-too-large",
      );

      if (tooManyFiles) {
        toast.error("Has superado el número máximo de archivos (20)");
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
    maxFiles: 25,
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
              <p className="text-center">
                Arrastra aqui las imagenes, o clickea para selectionar imagenes
              </p>
              <p className="text-xs">Minimo 1 imagen, maximo 20</p>
              <button
                type="button"
                className="rounded-md bg-[#880808] opacity-50 px-4 py-2 text-sm 
              font-medium text-white disabled:opacity-50 cursor-pointer"
              >
                Subir imagenes
              </button>
            </div>
          )}
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {files.map((file, index) => (
            <div
              key={file.name}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative aspect-4/3 max-h-28 overflow-hidden rounded-md border bg-muted
          cursor-move transition
          ${draggedIndex === index ? "opacity-50 ring-2 ring-primary" : ""}
        `}
            >
              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute right-1 top-1 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              >
                <X size={14} />
              </button>

              {/* Image */}
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
