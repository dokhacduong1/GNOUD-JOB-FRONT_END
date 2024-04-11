import { Tour } from "antd";
import { memo, useRef, useState } from "react";

function TourCustom(props) {
  const [openTour, setOpenTour] = useState(false);
  const ref = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { tourData,color="#5dcaf9" } = props;
  const steps = [
    {
      title: tourData.title,
      description: tourData.description,
      target: () => ref.current,
    },
  ];
  const openTourHandler = () => {
    setScrollPosition(window.pageYOffset);
    setOpenTour(true);
  };

  const closeTourHandler = () => {
    setOpenTour(false);

    window.scrollTo(0, scrollPosition);
  };
  return (
    <>
     
        <span >Tên Resume Tag</span>
        <p
          style={{ marginLeft: "10px", color: color, cursor: "pointer" }}
          onClick={openTourHandler}
        >
          <span style={{ fontSize: "15px", fontWeight: "600" }}>Resume Tag Là Gì ?</span>
        </p>

        <Tour scrollIntoViewOptions={true} open={openTour} onClose={closeTourHandler} steps={steps} />
      
    </>
  );
}

const MemoizedTourCustom= memo(TourCustom);
export default MemoizedTourCustom;