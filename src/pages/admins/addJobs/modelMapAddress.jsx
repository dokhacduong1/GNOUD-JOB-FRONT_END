import { useEffect, useState } from "react";
import { handleCancel, handleShowModal } from "../../../helpers/modelHelper";
import { Card, Form,Modal, Select, notification} from "antd";

import { getCity, getCitySearch } from "../../../services/admins/headerApi";
import "./modelMapAddress.scss"
import MapView from "../../../components/admins/mapView/mapView";
import { getMapLocationToPlaceId, getMapPlaceIdToLocation } from "../../../services/admins/mapViewApi";

function ModelMapAddress(props) {
    const {setLocation} = props
    const [isModal, setIsModalOpen] = useState(false);
    //Lưu tọa độ
    //longitudeAndLatitude[0] là longitude
    //longitudeAndLatitude[1] là latitude
    const [longitudeAndLatitude,setLongitudeAndLatitude] = useState([0,0])
  
    const [city, setCity] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [valueDistricts, setValueDistricts] = useState([]);
    const [coordinates , setCoordinates] = useState([])
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const fetchApi = async () => {
            const dataCity = await getCity();

            const options = dataCity.map((item) => {
                return {
                    value: item.code,
                    label: item.name
                }
            })
            setCity(options)

        }
        fetchApi()

    }, [])
    //Khi người dùng select tỉnh thành thì sẽ lấy ra các quận huyện
    const handleSelectCity = async (value) => {
        const dataCitySearch = await getCitySearch(value);
        const options = dataCitySearch.districts.map((item) => {
            return {
                value: item.code,
                label: item.name
            }
        })
       
      
        setDistricts(options)
      
        setValueDistricts(options[0].value);
       
    }
    const handleSelectDistricts = async (value) => {
        setValueDistricts(value);
    }
  
    //Khi người dùng select tỉnh thành thì sẽ lấy ra các quận huyện
    const handleForm = async (value) => {
        //Lọc ra các tỉnh thành
        const selectedCityItem = city.find(item => item.value === value.location);
        //Lọc ra các quận huyện
        const selectedDistrictsItem = districts.find(item => item.value === valueDistricts);
        //Nếu không có tỉnh thành hoặc quận huyện thì sẽ không thực hiện gì cả
        if (!selectedCityItem || !selectedDistrictsItem) {
          return;
        }
        //Nếu có tỉnh thành và quận huyện thì sẽ lấy ra địa chỉ
        const searchValue = `${selectedDistrictsItem.label}, ${selectedCityItem.label}`;
        //Lấy ra place_id của địa chỉ
        const getPlaceIdMap = await getMapPlaceIdToLocation(searchValue);
        //Nếu không có place_id thì sẽ không thực hiện gì cả
        if (!getPlaceIdMap?.predictions?.length) {
          return;
        }
        //Lấy ra place_id
        const place_id = getPlaceIdMap.predictions[0].place_id;
        //Lấy ra location bằng place_id
        const location = await getMapLocationToPlaceId(place_id);
        //Nếu không có location thì sẽ không thực hiện gì cả
        if (!location?.result?.geometry) {
          return;
        }
        //Lấy ra lat và lng
        const { lat, lng } = location.result.geometry.location;
        setCoordinates([lat,lng])
        //Set lat và lng
        setLongitudeAndLatitude([lat,lng])
        
      }
     const handleSaveLocation = ()=>{
        if(coordinates.length === 0 ){
            api.error({
                message: <span style={{ color: "red" }}>Failed</span>,
                description: (
                    <>
                        <i>{"Vui Lòng Điền Đủ Thông Tin Địa Chỉ Và Ấn Tìm Kiếm Để Hệ Thống Lấy Tọa Độ!"}</i>
                    </>
                ),
            });
            return;
        }
        //Set location cho bên addJobs
        setLocation(coordinates);
        //Đóng modal
        setIsModalOpen(false);
     }
    return (
        <>
             {contextHolder}
            <span onClick={() => handleShowModal("", setIsModalOpen)} style={{ marginLeft: "10px", color: "#5dcaf9", cursor: "pointer", fontWeight: "600" }}>Thêm Vị Trí Map</span>
            <Modal
                style={{
                    top: 20,
                }}
                width={600}
                title="Thêm Vị Trí Map"
                open={isModal}
                onCancel={() => handleCancel("", setIsModalOpen)}
                footer={null}
            >
                <Card className="modelMap">
                    <Form
                        onFinish={handleForm}
                        layout="vertical"
                        encType='multipart/form-data'
                        className="row align-items-center justify-content-center"
                    >

                        <Form.Item
                            className="col-4"

                            label="Tỉnh/Thành Phố"
                            name="location" // This is important
                            rules={[
                                {
                                    required: true,
                                    message: 'Không Được Để Trống!',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Nhập địa chỉ..."
                                onChange={(value) => handleSelectCity(value)}
                                optionLabelProp="label"
                                options={city}
                            />
                        </Form.Item>
                        <Form.Item
                            className="col-4"
                            label="Quận/Huyện"
                           
                            rules={[
                                {
                                    required: true,
                                    message: 'Không Được Để Trống!',
                                },
                            ]}
                        >
                            <Select
                                value={valueDistricts}
                                onChange={handleSelectDistricts}
                                style={{
                                    width: '100%',
                                }}

                                disabled={districts.length === 0  ? true : false}
                                options={districts}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tìm Kiếm Ngay"
                            className="col-4"
                        >
                            <button className='button-submit-admin-one' type="submit" >
                                Tìm Kiếm
                            </button>
                        </Form.Item>
                    </Form>
                    <MapView  width={"100%"} height={"500px"} longitudeAndLatitude={longitudeAndLatitude} setLongitudeAndLatitude={setLongitudeAndLatitude}  setCoordinates ={setCoordinates}/>
                   
                    <button onClick={handleSaveLocation} style={{marginTop:"30px"}} className='button-submit-admin' type="submit" >
                           Lưu Thông Tin
                    </button>
                </Card>
              
            </Modal>
        </>
    )
}
export default ModelMapAddress;