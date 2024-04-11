import "./mayBeInterested.scss";
import banner from "./images/banner.png";
import { memo, useCallback, useEffect, useState } from "react";
import { formatSalaryNoVND2 } from "../../../helpers/salaryConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faMoneyBill,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { formatTimeRemainingMongoDb } from "../../../helpers/formartDate";
import { dataJobType } from "./js/options";
import { Space, Tag } from "antd";
import { getMayBeInterested } from "../../../services/clients/jobsApi";
import { useSelector } from "react-redux";
function MayBeInterested() {
  const [job_type, setJob_type] = useState([]);
  const [recordItem, setRecordItem] = useState([]);
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );

  const fetchApi = useCallback(async (infoUser) => {
    const objectValue = {
      jobCategoriesId: "",
    };
    if (infoUser?.["job_categorie_id"]) {
      objectValue.jobCategoriesId = infoUser["job_categorie_id"];
    }
  
    const result = await getMayBeInterested(objectValue);
    if (result.code === 200) {
      setRecordItem(result.data);

      const convertJobType = dataJobType.filter((item) =>
        result.data.jobType.includes(item.value)
      );

      setJob_type(convertJobType);
    }
  }, []);

  useEffect(() => {
    const { infoUser } = authenMainClient;
    fetchApi(infoUser);
   
  }, [authenMainClient,fetchApi] );

  return (
    <>
      {recordItem.companyName && (
        <>
          <h2 className="heading-title">Có thể bạn quan tâm</h2>
          <div className="may-be-interested ">
            <div className="may-be-interested__box">
              <div className="banner">
                <img src={banner} alt="banner-maybe" />
              </div>
              <div className="padding-set">
                <div className="header_box">
                  <div className="image">
                    <a href="#!">
                      <img src={recordItem?.logoCompany} alt="" />
                    </a>
                  </div>
                  <div className="title">
                    <a
                      title={"Công ty " + recordItem?.companyName}
                      className="title-text title-span-webkit"
                      href="#!"
                    >
                      Công ty {recordItem?.companyName}
                    </a>
                  </div>
                </div>
                <hr />
                <div className="body_box">
                  <div className="body_box-item text-head">
                    <FontAwesomeIcon icon={faUserTie} />
                    <span
                      title={recordItem?.title}
                      style={{ color: "#212f3f" }}
                      className="title-span title-span-webkit"
                    >
                      {recordItem?.title}
                    </span>
                  </div>
                  <div className="box-slary-city body_box-item text-head">
                    <div className="">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span className="title-span ">
                        {recordItem?.city?.name}
                      </span>
                    </div>
                    <div className="">
                      <FontAwesomeIcon icon={faMoneyBill} />
                      <span className="title-span" style={{ color: "#27abe4" }}>
                        {formatSalaryNoVND2(
                          recordItem?.salaryMin,
                          recordItem?.salaryMax
                        )}{" "}
                        triệu
                      </span>
                    </div>
                  </div>

                  <div className="body_box-item text-head">
                    <FontAwesomeIcon icon={faClock} />
                    <span className="title-span">
                      Còn {formatTimeRemainingMongoDb(recordItem?.end_date)}
                    </span>
                  </div>
                  <hr />
                  <div className="body_box-item text-head">
                    <Space size={[8, 8]} wrap>
                      <h3 className="title-span">Hình thức: </h3>
                      {job_type.length > 0 &&
                        job_type.map((item, index) => (
                          <Tag key={index} color="#5dcaf9">
                            {item.label}
                          </Tag>
                        ))}
                    </Space>
                  </div>
                </div>
                <div className="footer_box"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
const MemoizedMayBeInterested = memo(MayBeInterested);
export default MemoizedMayBeInterested;
