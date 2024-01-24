"use client";

import Image, { ImageProps } from "next/image";

interface ContentfulImageProps {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

const contentfulLoader = ({ src, width, quality }: ContentfulImageProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  const placeholder = "blur";
  const blurDataURL =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrgcAAXsA/KZ1G74AAAAASUVORK5CYII=";

  return props.style?.objectFit ? (
    <Image
      alt={props.alt}
      loader={contentfulLoader}
      style={{
        objectFit: props.style?.objectFit,
      }}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      {...props}
    />
  ) : (
    <Image
      alt={props.alt}
      loader={contentfulLoader}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
}
