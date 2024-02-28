/* eslint-disable no-unused-vars */
import { memo } from "react";
import "./itemBoxNews.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {

  formatSalaryNoVND2,
} from "../../../helpers/salaryConvert";
import { formatTimeDifferenceMongoDb, formatTimeRemainingMongoDb } from "../../../helpers/formartDate";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
function ItemBoxNews({ recordItem,handleChangePagination,countPagination }) {
  const hoverItem = (value) => {
    //
  }
  return (
    <div  className="items-box__news col-md-8">
      {recordItem.length > 0 &&
        recordItem.map((item, index) => (
          <div onMouseEnter={(_)=>hoverItem(item)}  key={index} className="items-box__news-item ">
            <div className="items-box__avatar">
              <Link  to={`/tim-viec-lam/${item?.slug}`}>
                <img
                  src={item?.companyImage}
                  alt={item?.companyName}
                  title={item.title}
                />
              </Link>
            </div>
            <div className="items-box__body">
              <div className="title_all">
                <h3 className="title">
                  <Link to={`/tim-viec-lam/${item?.slug}`}>{item.title}</Link>
                </h3>
                <label className="title-salary">
                  {" "}
                  {formatSalaryNoVND2(item?.salaryMin, item?.salaryMax)} triệu
                </label>
              </div>
              <div className="company">Công ty {item?.companyName}</div>
              <div className="updateAt">Cập nhật {formatTimeDifferenceMongoDb(item.updatedAt)} trước</div>
              <div className="info-job">
                <div className="time-line">
                  <div className="address">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{item?.city?.name}</span>
                  </div>
                  <div className="end_date">
                    <FontAwesomeIcon icon={faClock} />
                    <div>
                      Còn <strong>{formatTimeRemainingMongoDb(item?.end_date)}</strong> để ứng tuyển
                    </div>
                  </div>
                </div>
                <div className="button-line">
                  <button className="button-all">Ứng tuyển</button>
                  <div className="box-heart">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
         <Pagination
              onChange={handleChangePagination}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
              defaultCurrent={1}
              total={countPagination*10}
            />
    </div>
  );
}

const MemoizedItemBoxNews = memo(ItemBoxNews);

export default MemoizedItemBoxNews;
