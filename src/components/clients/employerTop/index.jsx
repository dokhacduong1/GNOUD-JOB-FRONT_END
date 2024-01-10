

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./employerTop.scss"

import Sliders from '../sliders';


function EmployerTop(props) {
    const { listEmployers } = props

    const settingsliders = {

        arrows: true, // Đảm bảo rằng arrows đã được đặt là true
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1000,
        prevArrow: true,
        nextArrow: true,
    }
    return (
        <div className="employer__top cb-section">
            <div className="container">
                <h2 className="text-center title-text">NHÀ TUYỂN DỤNG HÀNG ĐẦU</h2>
                <div className="row dir-line">
                    <Sliders settings={settingsliders} custom={listEmployers.length > 0 && (
                        listEmployers.map((data, index) => (
                            <div key={index} className="employer__top-item col-2">
                                <div className="image">
                                    <img src={data.image} alt={`Anh${data.companyName}`}></img>
                                </div>
                            </div>
                        ))
                    )} />
                </div>
            </div>
        </div>
    );
}
export default EmployerTop;
