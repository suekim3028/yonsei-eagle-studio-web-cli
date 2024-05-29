"use client";
import { Flex } from "@components";
import { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import S from "./Carousel.module.css";

const Carousel = (props: CarouselProps) => {
  const {
    width,
    height,
    dots,
    gap,
    center,
    images,
    anim,
    shadow,
    onChangeIndex,
  } = props;
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
    afterChange: onChangeIndex,
  };

  return (
    <div
      className="slider-container"
      style={{ width: "100%", overflow: "hidden" }}
    >
      <Slider
        {...settings}
        ref={(ref) => {
          if (ref)
            if (ref.innerSlider?.list)
              ref.innerSlider.list.style.overflow = "visible";
        }}
      >
        {images.map((image, i) => (
          <CustomSlide {...{ width, gap, height, shadow, anim }} key={i}>
            <div className={anim ? S.zoom : undefined}>
              <img
                fetchPriority="high"
                loading="eager"
                style={{
                  display: "flex",
                  zIndex: 1,
                  width,
                  height,
                  boxShadow: shadow
                    ? "0px 3.9px 9.76px 0px rgba(0, 0, 0, 0.1)"
                    : undefined,
                  WebkitBoxShadow: shadow
                    ? "0px 3.9px 9.76px 0px rgba(0, 0, 0,0.1)"
                    : undefined,
                }}
                alt={`result_image_${i}`}
                src={image}
                width={width}
                height={height}
              />
            </div>
          </CustomSlide>
        ))}
      </Slider>
    </div>
  );
};

const CustomSlide = (
  props: Pick<CarouselProps, "width" | "gap" | "height" | "shadow" | "anim"> & {
    style?: any;
    children: ReactNode;
  }
) => {
  const { width, gap, height, children, shadow, anim, ...otherProps } = props;
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
  anim?: boolean;
  onChangeIndex?: (index: number) => void;
};

export default Carousel;
