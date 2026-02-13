export const getCloudinaryUrl = (
  publicId: string,
  width?: number,
  height?: number,
  quality: "eco" | "good" | "best" = "eco"
) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const transformations = [
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
    width && height ? "c_fill,g_auto" : "c_scale",
    `q_auto:${quality}`,
    "f_auto"
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};
