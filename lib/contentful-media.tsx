"use client";

import Image, { ImageProps } from "next/image";

const contentfulLoader = ({
  src,
  width,
  quality,
}: Pick<ImageProps, "src" | "width" | "quality">) => {
  return `${src}?w=${width}&q=${quality || 75}&fm=webp`;
};

const defaultImageProps: Omit<ImageProps, "src" | "alt"> = {
  loader: contentfulLoader,
  placeholder: "blur",
  blurDataURL:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrgcAAXsA/KZ1G74AAAAASUVORK5CYII=",
};

export function Video(props: { src: string }) {
  return (
    <video
      width="100%"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label="Video player"
      className="h-full w-full"
    >
      <source src={props.src} type="video/mp4" />
      <source src={props.src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}

/**
 * Component to render contentful media. Source can either be an image or a video.
 *
 * Note: Image props can be modified by passing values via `imageProps`, but video props can not be modified.
 */
export default function ContentfulMedia({
  src,
  alt,
  imageProps,
}: {
  src: string;
  alt?: string | null;
  imageProps?: Omit<ImageProps, "src" | "alt">;
}) {
  // TODO we should probably use the contentType property for this
  return src.includes(".mp4") || src.includes(".webm") ? (
    <Video src={src} />
  ) : (
    <Image
      src={src}
      alt={alt || ""}
      {...{ ...defaultImageProps, ...imageProps }}
    />
  );
}
