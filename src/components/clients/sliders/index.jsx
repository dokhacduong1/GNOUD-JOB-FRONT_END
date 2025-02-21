import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliders.scss";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { memo } from "react";
// eslint-disable-next-line
function Sliders(props) {
  const { arrayImage, custom, settings } = props;

  // eslint-disable-next-line no-unused-vars
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button {...props} className={"slick-prev slick-arrow"} type="button">
      <LeftCircleOutlined />
    </button>
  );
  // eslint-disable-next-line no-unused-vars
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button {...props} className={"slick-next slick-arrow"} type="button">
      <RightCircleOutlined />
    </button>
  );
  if (settings.prevArrow === true) {
    settings.prevArrow = <SlickArrowLeft />;
  }
  if (settings.nextArrow === true) {
    settings.nextArrow = <SlickArrowRight />;
  }
  return arrayImage ? (
    <Slider {...settings}>
      {arrayImage.map((image, index) => (
        <div key={image} className="slick-box-image">
          <img src={image} alt={`Ảnh ${index}`} />
        </div>
      ))}
    </Slider>
  ) : (
    <>
      <Slider {...settings}>{custom}</Slider>
    </>
    
  );
}

const MemoizedSliders = memo(Sliders);
export default MemoizedSliders;
