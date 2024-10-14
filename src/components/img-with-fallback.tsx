"use client";

import { Image } from "@nextui-org/react";
import { useState } from "react";

export default function ImgWithFallback({ srcProp }: { srcProp: string }) {
  const [src, setSrc] = useState<string>(srcProp);
  return (
    <Image
      src={src}
      className="mb-8"
      fallbackSrc="https://theme-assets.getbento.com/sensei/aa5fa78.sensei/assets/images/catering-item-placeholder-704x520.png"
      onError={() =>
        setSrc(
          "https://theme-assets.getbento.com/sensei/aa5fa78.sensei/assets/images/catering-item-placeholder-704x520.png"
        )
      }
    />
  );
}
