
import { memo, useEffect } from 'react';
import goongjs from '@goongmaps/goong-js';
const token = "hppDf6CgR3Ol9Qn71FfSzb04MhhncUrF9QLwCuB3"


function MapViewNoChange(props) {
    const { setLongitudeAndLatitude, longitudeAndLatitude, setCoordinates } = props;
    useEffect(() => {

        goongjs.accessToken = token;

        const map = new goongjs.Map({
            container: 'map',
            style: 'https://tiles.goong.io/assets/goong_map_web.json',
            center: [longitudeAndLatitude[1], longitudeAndLatitude[0]],
            zoom: 14
        });

        const marker = new goongjs.Marker({
            draggable: true
        })
            .setLngLat([longitudeAndLatitude[1], longitudeAndLatitude[0]])
            .addTo(map);

        function onDragEnd() {
            const lngLat = marker.getLngLat();   
            const {lng,  lat} = lngLat;
            setCoordinates([lat, lng])
            setLongitudeAndLatitude([lat, lng])
        }

        marker.on('dragend', onDragEnd);

        // Cleanup function
        return () => {
            map.remove();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [longitudeAndLatitude[1], longitudeAndLatitude[0]]); // Empty dependency array to ensure useEffect runs only once





    return (
        <>
            <div id="map" ></div>
        </>
    );
}


const MemoizedMapViewNoChange= memo(MapViewNoChange);
export default MemoizedMapViewNoChange;