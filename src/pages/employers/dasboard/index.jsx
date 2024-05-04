import { Carousel, Slider } from "antd";

import "./dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faFilePdf,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import BoxInfoColor from "../../../components/employers/box-info-color";
import { Column } from "@ant-design/plots";
import {
  faEnvelope,
  faFileCode,
  faFileLines,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

import { PhoneOutlined } from "@ant-design/icons";
import MEMBER from "./images/MEMBER.gif";
import SLIVER from "./images/SLIVER.gif";
import GOLD from "./images/GOLD.gif";
import PLATINUM from "./images/PLATINUM.gif";
import DIAMOND from "./images/DIAMOND.gif";
import { marks } from "./js/options";
import point from "./images/point.png";

import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
import { useSelector } from "react-redux";
import { statisticCompany } from "../../../services/employers/employer-userApi";
function DashboardEmployer() {
  const [imageRole, setImageRole] = React.useState(MEMBER);
const [data, setData] = useState([])
  const [objectCount, setObjectCount] = useState({
    coutCompaignIsOpen: 0,
    coutCompaignIsPending: 0,
    coutCvApplication: 0,
    coutCvApproved: 0,
  });
  const carouselRef = React.createRef();
  const authenMainEmployer = useSelector(
    (status) => status.authenticationReducerEmployer
  );
  const [infoUserEmployer, setInfoUserEmployer] = useState({});

 

  const config = {
    data,
    xField: "type",
    yField: "value",
    height: 313,
    autoFit: true,
    shapeField: "column25D",
    style: {
      maxWidth: 20,
      fill: "rgb(241 150 187 / 90%)",
    },
    axis: {
      y: {
        labelFormatter: ".0%",
      },
    },

    colorField: "rgb(233 107 158)", // or seriesField in some cases
  };
  const handleChangeSlider = (value) => {
    const roles = [
      { limit: 300, role: MEMBER },
      { limit: 800, role: SLIVER },
      { limit: 1500, role: GOLD },
      { limit: 2500, role: PLATINUM },
      { limit: Infinity, role: DIAMOND },
    ];

    const { role } = roles.find(({ limit }) => value < limit);
    setImageRole(role);
  };
  useEffect(() => {
    if (authenMainEmployer?.status === true) {
      new APlayer({
        container: document.getElementById("aplayer"),
        audio: [
          {
            name: "Closure",
            artist: "Hayd",
            url: "https://res.cloudinary.com/dmmz10szo/video/upload/v1709551928/music_ik8qur.mp3",
            cover:
              "https://media.istockphoto.com/id/917367814/photo/pink-abstract-background-bright-colorful-textured-sparkling-backdrop.webp?b=1&s=170667a&w=0&k=20&c=E5TRBRXj9Ldm8gR09gYaK8JB8mu5Stbq4FLWuOg5BXE=",
          },
        ],
      });
    }

    const { infoUserEmployer } = authenMainEmployer;

    setInfoUserEmployer(infoUserEmployer);
  }, [authenMainEmployer]);

  useEffect(() => {
    const fetchApi = async () => {
    
      const result = await statisticCompany();
      if(result.code === 200){
        console.log(result);
        setObjectCount({
          coutCompaignIsOpen: result?.data?.coutCompaignIsOpen,
          coutCompaignIsPending: result?.data?.coutCompaignIsPending,
          coutCvApplication: result?.data?.coutCvApplication,
          coutCvApproved: result?.data?.coutCvApproved,
        });

        setData(result?.data?.groupedCvs)
      }
    };
    fetchApi();
  }, [infoUserEmployer]);
  return (
    <>
      {authenMainEmployer?.status === true && (
        <div className="container-fluid page-content dashboar-employer mt-4">
          <div className=" title-employer-setting  ml-10 mb-4">
            <h3>Bảng tin</h3>
          </div>
          <div className="banner-slick ">
            <Carousel
              autoplay
              ref={carouselRef}
              dots={false}
              infinite={true}
              slidesToShow={2}
              slidesToScroll={2}
            >
              <a href="#!" className="slick-box col-6">
                <img
                  src="https://res.cloudinary.com/dmmz10szo/image/upload/v1709372324/Gia_t%C4%83ng_hi%E1%BB%87u_qu%E1%BA%A3_tuy%E1%BB%83n_d%E1%BB%A5ng_v%C3%A0_gi%E1%BB%AF_ch%C3%A2n_nh%C3%A2n_t%C3%A0i_rmdfuq.png"
                  alt=""
                />
              </a>
              <a href="#!" className="slick-box col-6">
                <img
                  src="https://res.cloudinary.com/dmmz10szo/image/upload/v1709372796/Timmerman_Industries_h2t75p.png"
                  alt=""
                />
              </a>
              <a href="#!" className="slick-box col-6">
                <img
                  src="https://res.cloudinary.com/dmmz10szo/image/upload/v1709372796/Timmerman_Industries_h2t75p.png"
                  alt=""
                />
              </a>
              <a href="#!" className="slick-box col-6">
                <img
                  src="https://res.cloudinary.com/dmmz10szo/image/upload/v1709372324/Gia_t%C4%83ng_hi%E1%BB%87u_qu%E1%BA%A3_tuy%E1%BB%83n_d%E1%BB%A5ng_v%C3%A0_gi%E1%BB%AF_ch%C3%A2n_nh%C3%A2n_t%C3%A0i_rmdfuq.png"
                  alt=""
                />
              </a>
            </Carousel>
            <div
              onClick={() => {
                carouselRef.current.prev();
              }}
              className="button-pre"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div
              onClick={() => {
                carouselRef.current.next();
              }}
              className="button-next"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
          <div className="box-content ml-10 mt-3">
            <div className="row gx-3 gy-3">
              <div className="col-6">
                <div className="item-box">
                  <div className="box-1 pd-item-d">
                    <div className="box-head">
                      <h3 className="title">Hiệu quả tuyển dụng</h3>
                      <span>
                        <FontAwesomeIcon icon={faInfo} />
                      </span>
                    </div>
                    <div className="box-body ">
                      <div className="row gx-3 gy-3">
                        <div className="col-6">
                          <BoxInfoColor
                            desc="Chiến dịch đang mở"
                            color={"#2d7cf1"}
                            bgColor={"#ebf3ff"}
                            value={objectCount.coutCompaignIsOpen}
                            icon={<FontAwesomeIcon icon={faStar} />}
                          />
                        </div>
                        <div className="col-6">
                          <BoxInfoColor
                            desc="CV tiếp nhận"
                            color={"rgb(227 65 131)"}
                            bgColor={"rgb(249 197 218 / 12%)"}
                            value={objectCount.coutCvApproved}
                            icon={<FontAwesomeIcon icon={faFileCode} />}
                          />
                        </div>
                        <div className="col-6">
                          <BoxInfoColor
                            desc="Chiến dịch đang chờ duyệt"
                            color={"#e5b500"}
                            bgColor={"#fffae9"}
                            value={objectCount.coutCompaignIsPending}
                            icon={<FontAwesomeIcon icon={faFileLines} />}
                          />
                        </div>
                        <div className="col-6">
                          <BoxInfoColor
                            desc="Cv ứng tuyển mới"
                            color={"#da4538"}
                            bgColor={"#fff3f2"}
                            value={objectCount.coutCvApplication}
                            icon={<FontAwesomeIcon icon={faFilePdf} />}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="box-chart mt-3">
                      <Column {...config} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="item-box">
                  <div className="box-2 pd-item-d">
                    <div className="box-head-v">
                      <div className="user">
                        <div className="user__flex">
                          <div className="user-box">
                            <div className="images">
                              <img src={infoUserEmployer?.image} alt="avatar" />
                            </div>
                            <div className="info">
                              <div className="name">
                                {infoUserEmployer?.fullName}
                              </div>
                              <div className="code">
                                Mã NTD: {infoUserEmployer?.code}
                              </div>
                              <div className="contact-user">
                                <a href="#!" className="email-user">
                                  <FontAwesomeIcon icon={faEnvelope} />

                                  <span>{infoUserEmployer?.email}</span>
                                </a>
                                <a href="#!" className="phone-user">
                                  <PhoneOutlined />
                                  <span>{infoUserEmployer?.phone}</span>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="user-role">
                            <div className="image">
                              <img src={imageRole} alt="role" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-box mt-2  w-d-100">
                  <div className="box-2 pd-item-d">
                    <div className="box-body-v">
                      <div className="box-slider" style={{ padding: "0 10px" }}>
                        <Slider
                          onChange={handleChangeSlider}
                          styles={{
                            track: {
                              background: "rgb(255 167 202)",
                            },
                          }}
                          step={10}
                          max={2500}
                          marks={marks}
                        />
                      </div>
                    </div>
                    <div className="box-info-v mt-2">
                      <div className="info-noti ">
                        <div className="count__flex">
                          <div className="count">
                            <div className="point">Điểm hạng</div>
                            <div className="images-coint">
                              <div className="count-coint">
                                {infoUserEmployer?.cointsGP}
                              </div>
                              <img src={point} alt="point" />
                            </div>
                          </div>
                          <div className="button-coint">
                            <a href="#!" className="button-employer-bold">
                              <span>Nạp ngay</span>
                              <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                          </div>
                        </div>

                        <div className="content__flex">
                          <div className="content col-8">
                            <p className="desc">
                              Bạn cần đạt tối thiểu cấp độ xác thực 3 để thực
                              hiện xét hạng khách hàng và sử dụng các quyền lợi
                              tương ứng.
                            </p>
                            <p className="prew">
                              <a href="#!">
                                <span>Xác thực ngay</span>
                              </a>
                            </p>
                          </div>
                          <div className="button-content col-4">
                            <a href="#!" className="button-employer-normal">
                              <span>Xác thực ngay</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="box-info-footer mt-2">
                      <div className="title text-center">
                        <div className="dest">Số Lượng GNOUD POINT (GP)</div>
                        <div className="set-role">
                          <div className="point-item">
                            <span>Xét hạng:</span>
                            <span>
                              <strong>{infoUserEmployer?.cointsGP} GP</strong>
                            </span>
                          </div>
                          <div className="point-item">
                            <span>Tổng Point:</span>
                            <span>
                              <strong>{infoUserEmployer?.cointsGP} GP</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="box-info-music pb-2">
                      <div id="aplayer"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="item-box pd-item-d">
                  <div className="box-3 ">
                    <h5>Các vị trí đã được tối ưu tìm kiếm</h5>
                    <div className="text-color">
                      Chúng tôi sẽ liên tục cập nhật các vị trí mới và gia tăng
                      nguồn ứng viên phù hợp theo nhu cầu của bạn.
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default DashboardEmployer;
