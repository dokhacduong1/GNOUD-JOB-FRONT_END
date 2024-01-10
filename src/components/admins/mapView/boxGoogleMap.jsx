
function BoxGoogleMap(props) {
  const { latitude, longitude } = props;

  return (
    < >
      {
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe className='ReactMapGL' src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>
      }

    </>

  )
}
export default BoxGoogleMap;