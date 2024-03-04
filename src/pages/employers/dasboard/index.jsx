import { Carousel, Slider } from "antd";

import "./dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faFilePdf,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
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
function DashboardEmployer() {
  const [imageRole, setImageRole] = React.useState(MEMBER);
  const carouselRef = React.createRef();
  const data = [
    {
      type: "1-3",
      value: 0.16,
    },
    {
      type: "4-10",
      value: 0.125,
    },
    {
      type: "11-30",
      value: 0.24,
    },
    {
      type: "31-60",
      value: 0.19,
    },
    {
      type: "1-3",
      value: 0.22,
    },
    {
      type: "3-10",
      value: 0.05,
    },
    {
      type: "10-30",
      value: 0.01,
    },
    {
      type: "30+",
      value: 0.1,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "value",
    height: 313,
    autoFit: true,
    shapeField: "column25D",
    style: {
      // 圆角样式

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
  },[])
 
  return (
    <div className="container-fluid page-content dashboar-employer mt-4">
      <div className="title ml-10 mb-4">
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
                        value={1}
                        icon={<FontAwesomeIcon icon={faStar} />}
                      />
                    </div>
                    <div className="col-6">
                      <BoxInfoColor
                        desc="Chiến dịch đang mở"
                        color={"rgb(227 65 131)"}
                        bgColor={"rgb(249 197 218 / 12%)"}
                        value={1}
                        icon={<FontAwesomeIcon icon={faFileCode} />}
                      />
                    </div>
                    <div className="col-6">
                      <BoxInfoColor
                        desc="Tin tuyển dụng hiển thị"
                        color={"#e5b500"}
                        bgColor={"#fffae9"}
                        value={1}
                        icon={<FontAwesomeIcon icon={faFileLines} />}
                      />
                    </div>
                    <div className="col-6">
                      <BoxInfoColor
                        desc="Cv ứng tuyển mới"
                        color={"#da4538"}
                        bgColor={"#fff3f2"}
                        value={1}
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
                          <img
                            src="http://localhost:3000/src/layouts/employersAdmin/SliderHome/images/avatar.svg"
                            alt="avatar"
                          />
                        </div>
                        <div className="info">
                          <div className="name">Đỗ Dương</div>
                          <div className="code">Mã NTD: 633012</div>
                          <div className="contact-user">
                            <a href="#!" className="email-user">
                              <FontAwesomeIcon icon={faEnvelope} />

                              <span> dokhacduong3@gmail.com</span>
                            </a>
                            <a href="#!" className="phone-user">
                              <PhoneOutlined />
                              <span>0879279678</span>
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
                          <div className="count-coint">10</div>
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
                          Bạn cần đạt tối thiểu cấp độ xác thực 3 để thực hiện
                          xét hạng khách hàng và sử dụng các quyền lợi tương
                          ứng.
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
                          <strong>0 GP</strong>
                        </span>
                      </div>
                      <div className="point-item">
                        <span>Tổng Point:</span>
                        <span>
                          <strong>10 GP</strong>
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
            <div className="item-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardEmployer;
