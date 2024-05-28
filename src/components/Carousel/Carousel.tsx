"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import S from "./Carousel.module.css";
const Carousel = ({
  gap,
  width,
  height,
  dots,
  center,
  images,
}: CarouselProps) => {
  const settings = {
    className: "slider variable-width center",
    centerMode: true,
    infinite: false,
    initialSlide: center,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    dots,
  };

  return (
    <div className="slider-container" style={{ width: "100%" }}>
      <Slider {...settings}>
        {images.map((image, i) => (
          <div
            style={{ width: width + gap, padding: `0px ${gap / 2}px` }}
            key={i}
          >
            <img
              onScroll={(e) => console.log(e)}
              className={S.snap_image_active}
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
  dots?: boolean;
};

export default Carousel;
