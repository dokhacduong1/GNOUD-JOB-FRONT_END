

import { memo, useEffect } from 'react';
import goongjs from '@goongmaps/goong-js';
const token = "hppDf6CgR3Ol9Qn71FfSzb04MhhncUrF9QLwCuB3"
function MapView(props) {
    var markerHeight = 50, markerRadius = 10, linearOffset = 25;
    var popupOffsets = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };
    const { setLongitudeAndLatitude, longitudeAndLatitude, setCoordinates, width, height } = props;
    useEffect(() => {

        goongjs.accessToken = token;


        //Tạo map
        const map = new goongjs.Map({
            container: 'map',
            style: 'https://tiles.goong.io/assets/goong_map_web.json',
            center: [longitudeAndLatitude[1], longitudeAndLatitude[0]],
            zoom: 14
        });
     
        //Tạo marker
        const marker = new goongjs.Marker({
            draggable: true
        })
            .setLngLat([longitudeAndLatitude[1], longitudeAndLatitude[0]])
            .addTo(map);


        //Hàm lấy tọa độ khi di chuyển marker
        function onDragEnd() {
        
            const lngLat = marker.getLngLat();
            const { lng, lat } = lngLat;
           
            setCoordinates([lat, lng])
            setLongitudeAndLatitude([lat, lng])
           
        }


        //Tạo giao diện popup
        new goongjs.Popup({ offset: popupOffsets, className: 'my-class' })
            .setLngLat([longitudeAndLatitude[1], longitudeAndLatitude[0]])
            .setHTML(
                `
                <div>
                    Vị Trí Làm Việc
                </div>
            `
            )
            .setMaxWidth("300px")
            .addTo(map);


        //Thêm nút phóng to thu nhỏ và xoay bản đồ
        var nav = new goongjs.NavigationControl();
        map.addControl(nav, 'top-left');


        //Thêm khoảng cách trên bản đồ tương ứng trên mặt đất
        var scale = new goongjs.ScaleControl({
            maxWidth: 80,
            unit: 'imperial'
        });
        map.addControl(scale);
        scale.setUnit('metric')


        //Lấy tọa độ khi di chuyển marker
        marker.on('dragend', onDragEnd);
       

        // Cleanup function
        return () => {
            map.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [longitudeAndLatitude[1], longitudeAndLatitude[0]]); // Empty dependency array to ensure useEffect runs only once


    return (
        <>
            <div style={{ width: width, height: height }} id="map" ></div>
        </>
    );
}

const MemoizedMapView= memo(MapView);
export default MemoizedMapView;