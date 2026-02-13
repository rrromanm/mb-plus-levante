export const getCloudinaryUrl = (
  publicId: string,
  width?: number,
) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const transformations = [
    width ? `w_${width}` : "",
    "c_scale",
    "f_auto",
    "q_auto"
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};
