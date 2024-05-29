"use client";
import { Flex } from "@components";
import { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import S from "./Carousel.module.css";

const Carousel = (props: CarouselProps) => {
  const { width, height, dots, center, images, shadow } = props;
  const settings = {
    className: "slider",
    centerMode: true,
    infinite: false,
    initialSlide: center,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    dots,
    centerPadding: "0px",
  };

  return (
    <div
      className="slider-container"
      style={{ width: "100%", overflow: "visible" }}
    >
      <Slider {...settings}>
        {images.map((image, i) => (
          <CustomSlide {...props}>
            <img
              fetchPriority="high"
              loading="eager"
              style={{
                display: "flex",
                zIndex: 1,
                width,
                height,
              }}
              className={shadow ? S.boxShadow : undefined}
              alt={`result_image_${i}`}
              src={image}
              width={width}
              height={height}
            />
          </CustomSlide>
        ))}
      </Slider>
    </div>
  );
};

const CustomSlide = (
  props: CarouselProps & { style?: any; children: ReactNode }
) => {
  const { width, gap, height, children, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      style={{
        ...otherProps["style"],
        width: width + gap,

        overflow: "visible",
      }}
    >
      <Flex
        w="100%"
        h={"100%"}
        alignItems={"flex-start"}
        justifyContent={"center"}
        overflow={"visible"}
      >
        {children}
      </Flex>
    </div>
  );
};

type CarouselProps = {
  gap: number;
  width: number;
  height: number;
  center: number;
  images: string[];
  dots?: boolean;
  shadow?: boolean;
};

export default Carousel;
