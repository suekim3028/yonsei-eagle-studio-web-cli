"use client";
import { Flex } from "@components";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Carousel = (props: CarouselProps) => {
  const { width, height, gap, center, images } = props;
  const settings = {
    className: "slider",
    centerMode: true,
    infinite: false,
    initialSlide: center,
    slidesToScroll: 1,
    variableWidth: true,

    centerPadding: "0px",
  };

  return (
    <div className="slider-container" style={{ width: "100%" }}>
      <Slider {...settings}>
        {images.map((image, i) => (
          <div
            style={{
              width: width + gap,
            }}
            key={image}
          >
            <Flex justifyContent={"center"}>
              <img
                fetchPriority="high"
                loading="eager"
                style={{
                  display: "flex",
                  zIndex: 1,
                  width,
                  height,
                }}
                alt={`result_image_${i}`}
                src={image}
                width={width}
                height={height}
              />
            </Flex>
          </div>
        ))}
      </Slider>
    </div>
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
