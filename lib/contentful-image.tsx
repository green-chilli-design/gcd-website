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

export function Video(props: ContentfulImageProps) {
  return (
    <div className="h-full w-full">
      <video
        width="100%"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label="Video player"
      >
        <source src={props.src} type="video/mp4" />
        <source src={props.src} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default function ContentfulImage(props: ContentfulImageProps) {
  const placeholder = "blur";
  const blurDataURL =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrgcAAXsA/KZ1G74AAAAASUVORK5CYII=";

  if (props.src.includes(".mp4") || props.src.includes(".webm")) {
    return <Video src={props.src} />;
  } else {
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
}
