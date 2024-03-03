import { Carousel } from "antd";

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
  faFileCode,
  faFileLines,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

function DashboardEmployer() {
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
    xField: 'type',
    yField: 'value',
    height:300,
    autoFit:true,
    shapeField: 'column25D',
    style: {
      // 圆角样式
     
      maxWidth: 20,
      fill: 'rgb(241 150 187 / 90%)',
    },
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
   
    colorField: "rgb(233 107 158)", // or seriesField in some cases
  };
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
              <div className="box-1">
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
            <div className="item-box"></div>
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
