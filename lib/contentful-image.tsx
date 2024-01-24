"use client";

import Image from "next/image";

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
  return props.style?.objectFit ? (
    <Image
      fill
      alt={props.alt}
      loader={contentfulLoader}
      src={props.src}
      style={{
        objectFit: props.style?.objectFit,
      }}
      placeholder="blur"
      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrgcAAXsA/KZ1G74AAAAASUVORK5CYII="
    />
  ) : (
    <Image alt={props.alt} loader={contentfulLoader} {...props} />
  );
}
