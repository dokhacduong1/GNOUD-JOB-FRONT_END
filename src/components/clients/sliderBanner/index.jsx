
import { SearchOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./sliderBanner.scss"
import Sliders from '../sliders';
import { Form, Input } from "antd";
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

function SliderBanner(props) {
    const navigate = useNavigate();
    const { images } = props;
    const settingSliders = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    }
    const handlFormSearch = (valueForm) => {
        navigate(`/viec-lam/tim-viec-lam?keywords=${valueForm.keyword}`)
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
                                <button className="col-12" type="submit"  >
                                    TÌM VIỆC NGAY
                                </button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </div>
            
        </div>

    );
}



const MemoizedSliderBanner= memo(SliderBanner);
export default MemoizedSliderBanner;

