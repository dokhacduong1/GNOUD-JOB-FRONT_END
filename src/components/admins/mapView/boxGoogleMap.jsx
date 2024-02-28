import { memo } from "react";

function BoxGoogleMap(props) {
  const { latitude, longitude } = props;

  return (
    < >
      {

        <iframe className='ReactMapGL' src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>
      }

    </>

  )
}

const MemoizedBoxGoogleMap= memo(BoxGoogleMap);
export default MemoizedBoxGoogleMap;