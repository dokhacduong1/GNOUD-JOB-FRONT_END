import { useEffect, useState } from "react"
import Sliders from "../sliders"

import "./careerKey.scss"
import { decData } from "../../../helpers/decData"
import { getCountJobToOccupation } from "../../../services/clients/jobsCategoriesApi"
const settingsliders = {

    arrows: true, // Đảm bảo rằng arrows đã được đặt là true
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    // autoplay: true,
    autoplaySpeed: 1000,
    prevArrow: true,
    nextArrow: true,
}

function CareerKey() {
    const [careerKey, setCareerKey] = useState([]);
    const fetchApi = async () => {
        const record = await getCountJobToOccupation();
        if (record.code === 200) {
            setCareerKey(decData(record.data));
        }


    }
    useEffect(() => {
        fetchApi()

    }, [])

    return (
        <>
            <div className="cb-section">
                <div className="career-key">
                    <div className="container">
                        <h2 className="text-center title-text">NGÀNH NGHỀ TRỌNG ĐIỂM</h2>
                        <div className="row ">
                            <Sliders settings={settingsliders} custom={careerKey.length > 0 && (
                                careerKey.map((data, index) => (
                                    <div key={index} className="career-key__background" >
                                        <div className="career-key__card mr-1">
                                            <div className="career-key__card-innerImage">
                                                <img src={`${data.thumbnail}`} alt="Kế toán / Kiểm toán" />
                                            </div>
                                            <div className="career-key__card-des">
                                                <h3>{data.title}</h3>
                                                <span>({data.countJob} việc làm)</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CareerKey