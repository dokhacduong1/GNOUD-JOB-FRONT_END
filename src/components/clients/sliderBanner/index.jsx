
import { SearchOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./sliderBanner.scss"
import Sliders from '../sliders';
import { Form, Input } from "antd";

function SliderBanner(props) {
    const { images } = props;
    const settingSliders = {
        dots: true,
        arrows: true, // Đảm bảo rằng arrows đã được đặt là true
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        
    }
    const handlFormSearch = (valueForm) => {
  
    };
    return (
        <div className="banner__slider">
            <Sliders settings = {settingSliders} arrayImage={images} />
            <div className="banner__slider-search">
                <div className="row ">
                    <div className="col-12 search_title">
                        <p className="">Đón lấy thành công</p>
                        <strong><p className="">139,000 Cơ hội sẽ đến với bạn</p></strong>
                    </div>
                    <div className="search-form">
                        <Form onFinish={handlFormSearch}>
                            <Form.Item
                                name="keyword"
                            >
                                <Input prefix={<SearchOutlined />} placeholder="Nhập từ khóa..." className="mt-3 col-12 input-silder" />
                            </Form.Item>
                            <Form.Item>
                                <button className="col-12" type="submit" htmltype="submit" >
                                    TÌM VIỆC NGAY
                                </button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </div>
            <div className="banner__slider-descrip">
                <div className="box-desc">
                    <h1 className="mb-4 ">HỆ SINH THÁI NGHỀ NGHIỆP <span>DÀNH CHO</span></h1>
                    <h2 className="mb-4">SINH VIÊN - THỰC TẬP SINH - <span>MỚI TỐT NGHIỆP</span></h2>
                    <button className="button-container ">TÌM HIỂU NGAY</button>
                </div>
            </div>
        </div>

    );
}
export default SliderBanner;


