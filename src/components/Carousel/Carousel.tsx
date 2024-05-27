"use client";
import { Flex } from "@components";
import Image from "next/image";

const Carousel = ({ gap, width, height, center, images }: CarouselProps) => {
  return (
    <Flex gap={gap} w="100%">
      {images.map((image, i) => (
        <Image
          key={image}
          quality={100}
          alt={`image_${i}`}
          width={width}
          height={height}
          style={{ width, height }}
          src={image}
        />
      ))}
    </Flex>
  );
};

type CarouselProps = {
  gap: number;
  width: number;
  height: number;
  center: number;
  images: string[];
};

export default Carousel;
