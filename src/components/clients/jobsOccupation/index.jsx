import { memo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getListJobsOccupation } from "../../../services/clients/jobsApi";
import { Pagination } from "antd";

import { decData } from "../../../helpers/decData";
import "./jobsOccupation.scss";
import { formatSalaryNoVND } from "../../../helpers/salaryConvert";
import { Link } from "react-router-dom";
function JobsOccupation() {
  const [listOccupationOne, setListOccupationOne] = useState([]);
  const [listOccupationTwo, setListOccupationTwo] = useState([]);
  const [listOccupationThreed, setListOccupationThreed] = useState([]);

  //Lấy công việc nổi bật
  const getListJobsOne = async (page) => {
    const record = await getListJobsOccupation(
      "dien-dien-tu-dien-lanh",
      page,
      "title salaryMax salaryMin city employerId slug"
    );

    if (record.code === 200) {
      setListOccupationOne({ record: decData(record.data) });
    }
  };
  const getListJobsTwo = async (page) => {
    const record = await getListJobsOccupation(
      "ke-toan-kiem-toan-vxGgTzPsa",
      page,
      "title salaryMax salaryMin city employerId slug"
    );

    if (record.code === 200) {
      setListOccupationTwo({ record: decData(record.data) });
    }
  };
  const getListJobsThreed = async (page) => {
    const record = await getListJobsOccupation(
      "dich-vu-khach-hang",
      page,
      "title salaryMax salaryMin city employerId slug"
    );
    if (record.code === 200) {
      setListOccupationThreed({ record: decData(record.data) });
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      await getListJobsOne(1);
      await getListJobsTwo(1);
      await getListJobsThreed(1);
    };
    fetchApi();
  }, []);
  const changePaginationFeture = async (page) => {
    await getListJobsOne(page);
    await getListJobsTwo(page);
    await getListJobsThreed(page);
  };

  return (
    <div className="cb-section">
      <div className="job__occupation">
        <div className="container">
          <h2 className="text-center title-text">
            VIỆC LÀM THEO NGHỀ NGHIỆP HOT
          </h2>
          <div className="row">
            <div className="col-4 item-box">
              <div className="job__occupation-title col-12">
                <h2 className="text-center">Điện Tử / Điện Lạnh</h2>
              </div>
              <div className="job__occupation-item col-12 ">
                {listOccupationOne?.record?.length > 0 &&
                  listOccupationOne.record.map((dataMapOne, index) => (
                    <Link
                    to={`/tim-viec-lam/${dataMapOne.slug}`}    
                      key={index}
                      className="job__occupation-boxJob row justify-content-center align-items-center "
                    >
                      <div className="job__occupation-boxImage col-3">
                        <img
                          src={dataMapOne.employerId.logoCompany}
                          alt="testok"
                        ></img>
                      </div>
                      <div className="job__occupation-content col-9">
                        <h2 title={dataMapOne.title}>{dataMapOne.title}</h2>
                        <h3 className="mt-1">
                          {dataMapOne.employerId.companyName}
                        </h3>
                        <h4 className="mt-1">
                          Lương:{" "}
                          {formatSalaryNoVND(
                            dataMapOne?.salaryMin,
                            dataMapOne?.salaryMax
                          )}{" "}
                          VNĐ
                        </h4>
                        <h5 className="mt-1 ">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span style={{marginLeft:"5px",fontWeight:"500",color:"#5d677a"}}>{dataMapOne.city.name}</span>
                          </h5>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="col-4 item-box">
              <div className="job__occupation-title col-12">
                <h2 className="text-center">Kế Toán / Kiểm Toán</h2>
              </div>
              <div className="job__occupation-item col-12 ">
                {listOccupationTwo?.record?.length > 0 &&
                  listOccupationTwo.record.map((dataMapOne, index) => (
                    <Link
                    to={`/tim-viec-lam/${dataMapOne.slug}`}    
                      key={index}
                      className="job__occupation-boxJob row justify-content-center align-items-center "
                    >
                      <div className="job__occupation-boxImage col-3">
                        <img
                          src={dataMapOne.employerId.logoCompany}
                          alt="testok"
                        ></img>
                      </div>
                      <div className="job__occupation-content col-9">
                        <h2 title={dataMapOne.title}>{dataMapOne.title}</h2>
                        <h3 className="mt-1">
                          {dataMapOne.employerId.companyName}
                        </h3>
                        <h4 className="mt-1">
                          Lương:{" "}
                          {formatSalaryNoVND(
                            dataMapOne?.salaryMin,
                            dataMapOne?.salaryMax
                          )}{" "}
                          VNĐ
                        </h4>
                        <h5 className="mt-1 ">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span style={{marginLeft:"5px",fontWeight:"500",color:"#5d677a"}}>{dataMapOne.city.name}</span>
                          </h5>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="col-4 item-box">
              <div className="job__occupation-title col-12">
                <h2 className="text-center">Dịch Vụ / Khách Hàng</h2>
              </div>
              <div className="job__occupation-item col-12 ">
                {listOccupationThreed?.record?.length > 0 &&
                  listOccupationThreed.record.map((dataMapOne, index) => (
                    <Link
                        to={`/tim-viec-lam/${dataMapOne.slug}`}    
                      key={index}
                      className="job__occupation-boxJob row justify-content-center align-items-center "
                    >
                      <div className="job__occupation-boxImage col-3">
                        <img
                          src={dataMapOne.employerId.logoCompany}
                          alt="testok"
                        ></img>
                      </div>
                      <div className="job__occupation-content col-9">
                        <h2 title={dataMapOne.title}>{dataMapOne.title}</h2>
                        <h3 className="mt-1">
                          {dataMapOne.employerId.companyName}
                        </h3>
                        <h4 className="mt-1">
                          Lương:{" "}
                          {formatSalaryNoVND(
                            dataMapOne?.salaryMin,
                            dataMapOne?.salaryMax
                          )}{" "}
                          VNĐ
                        </h4>
                        <h5 className="mt-1 ">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span style={{marginLeft:"5px",fontWeight:"500",color:"#5d677a"}}>{dataMapOne.city.name}</span>
                          </h5>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {listOccupationOne?.record?.length > 0 && (
        <Pagination
          onChange={changePaginationFeture}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "43px",
          }}
          defaultCurrent={1}
          total={30}
        />
      )}
    </div>
  );
}

const MemoizedJobsOccupation = memo(JobsOccupation);
export default MemoizedJobsOccupation;
