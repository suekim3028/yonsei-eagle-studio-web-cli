"use client";
import { Flex } from "@components";
import S from "./Carousel.module.css";

const Carousel = ({
  gap,
  width,
  height,
  px,
  center,
  images,
}: CarouselProps) => {
  return (
    <Flex className={S.snap_container} gap={gap} px={px} w="100%">
      {images.map((image, i) => (
        <Flex
          style={{ position: "relative" }}
          scrollSnapAlign={"center"}
          flex={"none"}
        >
          <img
            onScroll={(e) => console.log(e)}
            key={i}
            className={S.snap_image_active}
            fetchPriority="high"
            loading="eager"
            style={{ zIndex: 1, width, height }}
            alt={`result_image_${i}`}
            src={image}
            width={width}
            height={height}
          />
        </Flex>
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
  px?: number;
};

export default Carousel;
