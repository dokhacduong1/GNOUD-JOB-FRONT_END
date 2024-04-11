import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPenToSquare,
  faBriefcase,
  faBusinessTime,
  faDollar,
  faPlus,
  faUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
//regula kiểu fontawesome

import BoxGoogleMap from "../../../components/clients/boxGoogleMap";
import moment from "moment";
import {
  dataDegree,
  dataExperience,
  dataJobType,
  dataLevel,
  dataWelfare,
} from "./js/dataJobsSearch";
import { memo, useEffect, useState } from "react";
import { formatSalary } from "../../../helpers/salaryConvert";

function InfoJobEmployer(props) {
  const { record } = props;
  const [jobType, setJobType] = useState("");
  const [slary, setSalary] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [level, setLevel] = useState("");
  const [listWalare, setListWalare] = useState([]);
  const [educationalLevel, setEducationalLevel] = useState("");

  useEffect(() => {
    //Chuyển đổi jobType từ value sang label
    if (record?.jobType) {
      const jobType = dataJobType
        .filter((item) => record.jobType.includes(item.value))
        .map((dataMap) => dataMap.label)
        .join(",");
      setJobType(jobType);

      //Chuyển đổi tiền số sang dạng 1x tr - 2x tr VND
      setSalary(formatSalary(record?.salaryMin, record?.salaryMax));

      //Lấy kinh nghiệm làm việc
      const work_Experience = dataExperience
        .filter((item) => item.value === record.workExperience)
        .map((dataMap) => dataMap.label)
        .join(",");
      setWorkExperience(work_Experience);

      //Lấy cấp bậc
      const level_Job = dataLevel
        .filter((item) => item.value === record.level)
        .map((dataMap) => dataMap.label)
        .join(",");
      setLevel(level_Job);

      //Lấy danh sách phúc lợi
      const walare = dataWelfare
        .filter((item) => record.welfare.includes(item.value))
        .map((dataMap) => dataMap.label);
      setListWalare(walare);

      const educational_Level = dataDegree.find(
        (item) => item.value === record.educationalLevel
      ).label;
      setEducationalLevel(educational_Level);
    }
  }, [record]);

  return (
    <section className="info-job-employer">
      <div className="info-job-employer__info-bg">
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="detail-box">
              <div className="map">
                <strong>
                  <FontAwesomeIcon icon={faLocationDot} /> Địa Điểm
                </strong>
                <p>{record?.city?.name}</p>
                {record?.address && (
                  <BoxGoogleMap
                    latitude={record?.address?.linkMap[0]}
                    longitude={record?.address?.linkMap[1]}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="detail-box">
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faPenToSquare} /> Ngày Cập Nhật
                    <p>{moment(record?.start_date).format("YYYY/MM/DD")}</p>
                  </strong>
                </li>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faBriefcase} /> Ngành Nghề
                  </strong>

                  {record && record?.job_categories_title?.length > 0 && (
                    <pre>
                      {record?.job_categories_title?.map((item, index) => {
                        let icon = `, `;
                        if (record?.job_categories_title?.length - 1 === index) {
                          icon = "";
                        }
                        return (
                          <span key={index}>
                            {item}
                            {icon}
                          </span>
                        );
                      })}
                    </pre>
                  )}
                </li>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faBusinessTime} /> Hình thức
                  </strong>
                  <p>{jobType}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="detail-box">
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faDollar} /> Lương
                  </strong>
                  <p>{slary}</p>
                </li>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faPlus} /> Kinh Nghiệm
                  </strong>
                  <p>{workExperience}</p>
                </li>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faUser} /> Cấp Bậc
                  </strong>
                  <p>{level}</p>
                </li>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faCalendarDays} /> Hết Hạn Nộp
                  </strong>
                  <p>{moment(record?.end_date).format("YYYY/MM/DD")}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="info-job-employer__welfare detail-row">
        <h2>PHÚC LỢI</h2>
        <ul
          className="row  align-items-center"
          style={{ listStyle: "none", paddingLeft: "0" }}
        >
          {listWalare.length > 0 &&
            listWalare.map((item, index) => (
              <li className="col-4 mb-1" key={index}>
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>
      <hr />
      <div className="info-job-employer__description detail-row">
        <h2>MÔ TẢ CÔNG VIỆC</h2>
        <div dangerouslySetInnerHTML={{ __html: record?.description }} />
      </div>
      <hr />
      <div className="info-job-employer__detailWorkExperience detail-row">
        <h2>YÊU CẦU CÔNG VIỆC</h2>
        <div
          dangerouslySetInnerHTML={{ __html: record?.detailWorkExperience }}
        />
      </div>
      <hr />
      <div className="info-job-employer__detailOther detail-row">
        <h2>THÔNG TIN KHÁC</h2>
        <ul style={{ paddingLeft: "15px" }}>
          <li>Bắng cấp: {educationalLevel}</li>
          <li>
            Giới Tính:{" "}
            {record?.gender === "all"
              ? "Nam/Nữ"
              : record?.gender === "boy"
              ? "Nam"
              : "Nữ"}
          </li>
          <li>
            Độ tuổi: {(record?.ageMin >= 18 && record?.ageMax) ? (<span>{record?.ageMin} - {record?.ageMax}</span>): "Không giới hạn tuổi"}
          </li>
          <li>Lương: {slary}</li>
        </ul>
      </div>
      
      <hr />
      <div
        className="info-job-employer__listTag detail-row"
        style={{ marginTop: "30px" }}
      >
        <h2 style={{ fontSize: "15px", marginBottom: "15px" }}>
          JOB TAGS / SKILLS
        </h2>
        <ul>
          {record?.listTagName?.length > 0 &&
            record?.listTagName.map((item, index) => (
              <li key={index}>
                <a href="#!">{item}</a>
              </li>
            ))}
        </ul>
      </div>
    
    </section>
  );
}
const MemoizedInfoJobEmployer = memo(InfoJobEmployer);
export default MemoizedInfoJobEmployer;
