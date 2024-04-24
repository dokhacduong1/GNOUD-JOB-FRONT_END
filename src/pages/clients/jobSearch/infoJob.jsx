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
  faHeart as solidHeart
} from "@fortawesome/free-solid-svg-icons";
//regula kiểu fontawesome
import {
  faHeart as regularHeart ,
  faEnvelope,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";

//solid kiểu fontawesome
import {
  faFacebookF,
  faLinkedinIn,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

import iconCV from "./images/icon-cv.webp";
import "./jobSearch.scss";
import BoxGoogleMap from "../../../components/clients/boxGoogleMap";
import moment from "moment";
import {
  dataDegree,
  dataExperience,
  dataJobType,
  dataLevel,
  dataWelfare,
} from "./js/dataJobsSearch";
import { useEffect, useState } from "react";
import { formatSalary } from "../../../helpers/salaryConvert";
import ModelJobSearch from "./modelJobSearch";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveJob } from "../../../services/clients/user-userApi";
import { message } from "antd";
import { UpdateDataAuthClient } from "../../../update-data-reducer/clients/updateDataClient";

function InfoJob(props) {
  const { record } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobType, setJobType] = useState("");
  const [slary, setSalary] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [level, setLevel] = useState("");
  const [listWalare, setListWalare] = useState([]);
  const [educationalLevel, setEducationalLevel] = useState("");
  const [infoUserC, setInfoUserC] = useState(null);
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );
  
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const { infoUser } = authenMainClient;
    if(infoUser !== undefined){
      setInfoUserC(infoUser);
    }
 
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
  }, [record,authenMainClient]);
  const handleSaveJob = async (value, action = "save") => {
    try {
      
      if (!value) return;
      const objectNew = {
        action: action,
        idJob: value,
      };
      const result = await saveJob(objectNew);
      if(result.code === 402){
        //đây là chưa đăng nhập nên chuyển hướng qua trang đăng nhập
        navigate("/login");
        return;
      }
      if (result.code === 200) {
        messageApi.success({
          type: "success",
          content: result.success,
        });
        UpdateDataAuthClient(dispatch);
      } else {
        messageApi.error({
          type: "error",
          content: result.error,
        });
      }
    } catch (error) {
      messageApi.error({
        type: "error",
        content: "Lỗi gì đó rồi!",
      });
    }
  };

  return (
    <section className="info-job">
       {contextHolder}
      <div className="info-job__info-bg">
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="detail-box">
              <div className="map">
                <strong>
                  <FontAwesomeIcon icon={faLocationDot} /> Địa Điểm
                </strong>
                <p>{record?.city?.name}</p>
                {record.address && (
                  <BoxGoogleMap
                    latitude={record.address.linkMap[0]}
                    longitude={record.address.linkMap[1]}
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
                    <p>{moment(record.start_date).format("YYYY/MM/DD")}</p>
                  </strong>
                </li>
                <li>
                  <strong>
                    <FontAwesomeIcon icon={faBriefcase} /> Ngành Nghề
                  </strong>

                  {record && record.job_categories_title?.length > 0 && (
                    <pre>
                      {record.job_categories_title.map((item, index) => {
                        let icon = `, `;
                        if (record.job_categories_title.length - 1 === index) {
                          icon = "";
                        }
                        return (
                          <a key={index}>
                            {item}
                            {icon}
                          </a>
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
                  <p>{moment(record.end_date).format("YYYY/MM/DD")}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="info-job__welfare detail-row">
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
      <div className="info-job__description detail-row">
        <h2>MÔ TẢ CÔNG VIỆC</h2>
        <div dangerouslySetInnerHTML={{ __html: record?.description }} />
      </div>
      <div className="info-job__detailWorkExperience detail-row">
        <h2>YÊU CẦU CÔNG VIỆC</h2>
        <div
          dangerouslySetInnerHTML={{ __html: record?.detailWorkExperience }}
        />
      </div>
      <div className="info-job__detailOther detail-row">
        <h2>THÔNG TIN KHÁC</h2>
        <ul style={{ paddingLeft: "15px" }}>
          <li>Bắng cấp: {educationalLevel}</li>
          <li>
            Giới Tính:{" "}
            {record.gender === "all"
              ? "Nam/Nữ"
              : record.gender === "boy"
              ? "Nam"
              : "Nữ"}
          </li>
          <li>
            Độ tuổi: {(record.ageMin >= 18 && record.ageMax) ? (<span>{record.ageMin} - {record.ageMax}</span>): "Không giới hạn tuổi"}
          </li>
          <li>Lương: {slary}</li>
        </ul>
      </div>
      <div
        className="info-job__detailOther detail-row"
        style={{ marginBottom: "40px" }}
      >
        <h2>GỢI Ý HỒ SƠ</h2>
        <div className="list-item ">
          <div className="list-item__row  ">
            <img src={iconCV} alt="icon-cv" />
            <a href="#!">Thiết kế CV Ứng Tuyển</a>
          </div>
        </div>
      </div>
      <div className="share-job detail-row">
        <span>Chia sẻ việc làm này</span>
        <ul>
          <li>
            <a href="#!">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </li>
          <li>
            <a href="#!">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </li>
          <li>
            <a href="#!">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
          </li>
        </ul>
      </div>
      <div
        className="info-job__listTag detail-row"
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
      <div className="info-job__heart job-sticky">
        <div className="info-job__heart-bottom">
          <div className="info-job__heart-content">
            <div className="info-job__heart-content-desc">
              <ul>
                <li>
                { infoUserC?.listJobSave?.some(job => record?._id === job.idJob)  ? (
                    <div
                    
                      title="Bỏ lưu công việc"
                      onClick={() => {
                        handleSaveJob(record?._id, "delete");
                      }}
                      className="box-heart"
                    >
                      <FontAwesomeIcon icon={solidHeart} />
                      <div>Hủy lưu việc làm</div>
                    </div>
                  ) : (
                    <div
                      title="Lưu công việc"
                      onClick={() => {
                        handleSaveJob(record?._id, "save");
                      }}
                      className="box-heart"
                    >
                      <FontAwesomeIcon icon={regularHeart} />
                      <div>Lưu việc làm</div>
                    </div>
                  )}
                </li>
                <li>
                  <a href="#!">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>Gửi việc làm này qua email</span>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <FontAwesomeIcon icon={faFlag} />
                    <span>Báo xấu</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="job-search-one__apply">
              <ModelJobSearch infoUser={infoUserC} record={record}/>
            </div>
          </div>
        </div>
      </div>
      <div
        className="info-job__fullBox detail-row"
        style={{ marginTop: "30px" }}
      >
        <div className="row">
          <div className="col-lg-4">
            <div className="box-job-type">
              <h4>Tìm việc làm theo ngành nghề</h4>
              <ul>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ke-toan-kiem-toan-c2-vi.html"
                    title="Việc làm Kế toán"
                  >
                    Việc làm Kế toán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/xay-dung-c8-vi.html"
                    title="Việc làm Xây dựng"
                  >
                    Việc làm Xây dựng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/an-ninh-bao-ve-c51-vi.html"
                    title="Việc làm Bảo Vệ"
                  >
                    Việc làm Bảo Vệ
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ngan-hang-c19-vi.html"
                    title="Việc làm Ngân hàng"
                  >
                    Việc làm Ngân hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nong-nghiep-c5-vi.html"
                    title="Việc làm Nông nghiệp"
                  >
                    Việc làm Nông nghiệp
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/cong-nghe-sinh-hoc-c69-vi.html"
                    title="Việc làm Công nghệ sinh học"
                  >
                    Việc làm Công nghệ sinh học
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thuy-san-hai-san-c49-vi.html"
                    title="Việc làm Thủy sản"
                  >
                    Việc làm Thủy sản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/cong-nghe-thuc-pham-dinh-duong-c70-vi.html"
                    title="Việc làm Công nghệ thực phẩm"
                  >
                    Việc làm Công nghệ thực phẩm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Cơ khí"
                  >
                    Việc làm Cơ khí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tiep-thi-marketing-c4-vi.html"
                    title="Việc làm Marketing"
                  >
                    Việc làm Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/xuat-nhap-khau-c18-vi.html"
                    title="Việc làm Xuất nhập khẩu"
                  >
                    Việc làm Xuất nhập khẩu
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/moi-truong-c16-vi.html"
                    title="Việc làm Môi trường"
                  >
                    Việc làm Môi trường
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nhan-su-c22-vi.html"
                    title="Việc làm Nhân sự"
                  >
                    Việc làm Nhân sự
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Ô tô"
                  >
                    Việc làm Ô tô
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bat-dong-san-c28-vi.html"
                    title="Việc làm Bất động sản"
                  >
                    Việc làm Bất động sản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nha-hang-khach-san-c29-vi.html"
                    title="Việc làm Khách sạn"
                  >
                    Việc làm Khách sạn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hoa-hoc-c41-vi.html"
                    title="Việc làm Hóa học"
                  >
                    Việc làm Hóa học
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/du-lich-c34-vi.html"
                    title="Việc làm Du lịch"
                  >
                    Việc làm Du lịch
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dau-khi-c26-vi.html"
                    title="Việc làm Dầu khí"
                  >
                    Việc làm Dầu khí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hanh-chinh-thu-ky-c3-vi.html"
                    title="Việc làm Hành chính"
                  >
                    Việc làm Hành chính
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ban-hang-kinh-doanh-c31-vi.html"
                    title="Việc làm Kinh doanh"
                  >
                    Việc làm Kinh doanh
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Tự động hóa"
                  >
                    Việc làm Tự động hóa
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chung-khoan-c46-vi.html"
                    title="Việc làm Chứng khoán"
                  >
                    Việc làm Chứng khoán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/van-chuyen-giao-nhan-kho-van-c33-vi.html"
                    title="Việc làm Kho vận"
                  >
                    Việc làm Kho vận
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thu-mua-vat-tu-c43-vi.html"
                    title="Việc làm Thu mua"
                  >
                    Việc làm Thu mua
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ban-hang-kinh-doanh-c31-vi.html"
                    title="Việc làm Bán hàng"
                  >
                    Việc làm Bán hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/det-may-da-giay-thoi-trang-c39-vi.html"
                    title="Việc làm Dệt may"
                  >
                    Việc làm Dệt may
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tai-chinh-dau-tu-c59-vi.html"
                    title="Việc làm Tài chính"
                  >
                    Việc làm Tài chính
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/y-te-cham-soc-suc-khoe-c56-vi.html"
                    title="Việc làm Y tế"
                  >
                    Việc làm Y tế
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện lạnh"
                  >
                    Việc làm Điện lạnh
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bao-hiem-c23-vi.html"
                    title="Việc làm Bảo hiểm"
                  >
                    Việc làm Bảo hiểm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/lao-dong-pho-thong-c44-vi.html"
                    title="Việc làm Lao động phổ thông"
                  >
                    Việc làm Lao động phổ thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/luat-phap-ly-c24-vi.html"
                    title="Việc làm Pháp lý"
                  >
                    Việc làm Pháp lý
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chan-nuoi-thu-y-c52-vi.html"
                    title="Việc làm Thú y"
                  >
                    Việc làm Thú y
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nha-hang-khach-san-c29-vi.html"
                    title="Việc làm Nhà hàng"
                  >
                    Việc làm Nhà hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/an-toan-lao-dong-c58-vi.html"
                    title="Việc làm An toàn lao động"
                  >
                    Việc làm An toàn lao động
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bao-tri-sua-chua-c71-vi.html"
                    title="Việc làm Bảo trì"
                  >
                    Việc làm Bảo trì
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giao-duc-dao-tao-c13-vi.html"
                    title="Việc làm Giáo dục"
                  >
                    Việc làm Giáo dục
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/phi-chinh-phu-phi-loi-nhuan-c20-vi.html"
                    title="Việc làm Phi chính phủ"
                  >
                    Việc làm Phi chính phủ
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Thiết kế"
                  >
                    Việc làm Thiết kế
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/quang-cao-doi-ngoai-truyen-thong-c67-vi.html"
                    title="Việc làm Truyền Thông"
                  >
                    Việc làm Truyền Thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/trac-dia-dia-chat-c54-vi.html"
                    title="Việc làm Trắc địa"
                  >
                    Việc làm Trắc địa
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện tử"
                  >
                    Việc làm Điện tử
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/san-xuat-van-hanh-san-xuat-c25-vi.html"
                    title="Việc làm Sản xuất"
                  >
                    Việc làm Sản xuất
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện"
                  >
                    Việc làm Điện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/lam-nghiep-c50-vi.html"
                    title="Việc làm Lâm Nghiệp"
                  >
                    Việc làm Lâm Nghiệp
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Mỹ thuật"
                  >
                    Việc làm Mỹ thuật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chan-nuoi-thu-y-c52-vi.html"
                    title="Việc làm Chăn nuôi"
                  >
                    Việc làm Chăn nuôi
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/in-an-xuat-ban-c64-vi.html"
                    title="Việc làm In ấn"
                  >
                    Việc làm In ấn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ke-toan-kiem-toan-c2-vi.html"
                    title="Việc làm Kiểm toán"
                  >
                    Việc làm Kiểm toán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/quang-cao-doi-ngoai-truyen-thong-c67-vi.html"
                    title="Việc làm Quảng cáo"
                  >
                    Việc làm Quảng cáo
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hang-khong-c60-vi.html"
                    title="Việc làm Hàng không"
                  >
                    Việc làm Hàng không
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Biên tập"
                  >
                    Việc làm Biên tập
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/in-an-xuat-ban-c64-vi.html"
                    title="Việc làm Xuất bản"
                  >
                    Việc làm Xuất bản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/duoc-pham-c7-vi.html"
                    title="Việc làm Dược phẩm"
                  >
                    Việc làm Dược phẩm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giai-tri-c15-vi.html"
                    title="Việc làm Giải trí"
                  >
                    Việc làm Giải trí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Nghệ thuật"
                  >
                    Việc làm Nghệ thuật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thong-ke-c36-vi.html"
                    title="Việc làm Thống kê"
                  >
                    Việc làm Thống kê
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bien-phien-dich-c38-vi.html"
                    title="Việc làm Biên phiên dịch"
                  >
                    Việc làm Biên phiên dịch
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Báo chí"
                  >
                    Việc làm Báo chí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/buu-chinh-vien-thong-c32-vi.html"
                    title="Việc làm Bưu chính viễn thông"
                  >
                    Việc làm Bưu chính viễn thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/y-te-cham-soc-suc-khoe-c56-vi.html"
                    title="Việc làm Chăm sóc sức khỏe"
                  >
                    Việc làm Chăm sóc sức khỏe
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/van-chuyen-giao-nhan-kho-van-c33-vi.html"
                    title="Việc làm Giao nhận"
                  >
                    Việc làm Giao nhận
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hang-hai-c61-vi.html"
                    title="Việc làm Hàng hải"
                  >
                    Việc làm Hàng hải
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/kien-truc-c6-vi.html"
                    title="Việc làm Kiến trúc"
                  >
                    Việc làm Kiến trúc
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/luat-phap-ly-c24-vi.html"
                    title="Việc làm Luật"
                  >
                    Việc làm Luật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hanh-chinh-thu-ky-c3-vi.html"
                    title="Việc làm Thư ký"
                  >
                    Việc làm Thư ký
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thu-vien-c57-vi.html"
                    title="Việc làm Thư viện"
                  >
                    Việc làm Thư viện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/det-may-da-giay-thoi-trang-c39-vi.html"
                    title="Việc làm Thời trang"
                  >
                    Việc làm Thời trang
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thuc-pham-do-uong-c21-vi.html"
                    title="Việc làm Thực phẩm &amp; Đồ uống"
                  >
                    Việc làm Thực phẩm &amp; Đồ uống
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tiep-thi-marketing-c4-vi.html"
                    title="Việc làm Tiếp thị"
                  >
                    Việc làm Tiếp thị
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Truyền hình"
                  >
                    Việc làm Truyền hình
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tu-van-c9-vi.html"
                    title="Việc làm Tư vấn"
                  >
                    Việc làm Tư vấn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/to-chuc-su-kien-c68-vi.html"
                    title="Việc làm Tổ chức sự kiện"
                  >
                    Việc làm Tổ chức sự kiện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tai-chinh-dau-tu-c59-vi.html"
                    title="Việc làm Đầu tư"
                  >
                    Việc làm Đầu tư
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/trac-dia-dia-chat-c54-vi.html"
                    title="Việc làm Địa Chất"
                  >
                    Việc làm Địa Chất
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giao-duc-dao-tao-c13-vi.html"
                    title="Việc làm Đào tạo"
                  >
                    Việc làm Đào tạo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box-job-type">
              <h4>Việc làm theo khu vực</h4>
              <ul>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ke-toan-kiem-toan-c2-vi.html"
                    title="Việc làm Kế toán"
                  >
                    Việc làm Kế toán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/xay-dung-c8-vi.html"
                    title="Việc làm Xây dựng"
                  >
                    Việc làm Xây dựng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/an-ninh-bao-ve-c51-vi.html"
                    title="Việc làm Bảo Vệ"
                  >
                    Việc làm Bảo Vệ
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ngan-hang-c19-vi.html"
                    title="Việc làm Ngân hàng"
                  >
                    Việc làm Ngân hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nong-nghiep-c5-vi.html"
                    title="Việc làm Nông nghiệp"
                  >
                    Việc làm Nông nghiệp
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/cong-nghe-sinh-hoc-c69-vi.html"
                    title="Việc làm Công nghệ sinh học"
                  >
                    Việc làm Công nghệ sinh học
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thuy-san-hai-san-c49-vi.html"
                    title="Việc làm Thủy sản"
                  >
                    Việc làm Thủy sản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/cong-nghe-thuc-pham-dinh-duong-c70-vi.html"
                    title="Việc làm Công nghệ thực phẩm"
                  >
                    Việc làm Công nghệ thực phẩm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Cơ khí"
                  >
                    Việc làm Cơ khí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tiep-thi-marketing-c4-vi.html"
                    title="Việc làm Marketing"
                  >
                    Việc làm Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/xuat-nhap-khau-c18-vi.html"
                    title="Việc làm Xuất nhập khẩu"
                  >
                    Việc làm Xuất nhập khẩu
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/moi-truong-c16-vi.html"
                    title="Việc làm Môi trường"
                  >
                    Việc làm Môi trường
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nhan-su-c22-vi.html"
                    title="Việc làm Nhân sự"
                  >
                    Việc làm Nhân sự
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Ô tô"
                  >
                    Việc làm Ô tô
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bat-dong-san-c28-vi.html"
                    title="Việc làm Bất động sản"
                  >
                    Việc làm Bất động sản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nha-hang-khach-san-c29-vi.html"
                    title="Việc làm Khách sạn"
                  >
                    Việc làm Khách sạn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hoa-hoc-c41-vi.html"
                    title="Việc làm Hóa học"
                  >
                    Việc làm Hóa học
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/du-lich-c34-vi.html"
                    title="Việc làm Du lịch"
                  >
                    Việc làm Du lịch
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dau-khi-c26-vi.html"
                    title="Việc làm Dầu khí"
                  >
                    Việc làm Dầu khí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hanh-chinh-thu-ky-c3-vi.html"
                    title="Việc làm Hành chính"
                  >
                    Việc làm Hành chính
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ban-hang-kinh-doanh-c31-vi.html"
                    title="Việc làm Kinh doanh"
                  >
                    Việc làm Kinh doanh
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Tự động hóa"
                  >
                    Việc làm Tự động hóa
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chung-khoan-c46-vi.html"
                    title="Việc làm Chứng khoán"
                  >
                    Việc làm Chứng khoán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/van-chuyen-giao-nhan-kho-van-c33-vi.html"
                    title="Việc làm Kho vận"
                  >
                    Việc làm Kho vận
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thu-mua-vat-tu-c43-vi.html"
                    title="Việc làm Thu mua"
                  >
                    Việc làm Thu mua
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ban-hang-kinh-doanh-c31-vi.html"
                    title="Việc làm Bán hàng"
                  >
                    Việc làm Bán hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/det-may-da-giay-thoi-trang-c39-vi.html"
                    title="Việc làm Dệt may"
                  >
                    Việc làm Dệt may
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tai-chinh-dau-tu-c59-vi.html"
                    title="Việc làm Tài chính"
                  >
                    Việc làm Tài chính
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/y-te-cham-soc-suc-khoe-c56-vi.html"
                    title="Việc làm Y tế"
                  >
                    Việc làm Y tế
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện lạnh"
                  >
                    Việc làm Điện lạnh
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bao-hiem-c23-vi.html"
                    title="Việc làm Bảo hiểm"
                  >
                    Việc làm Bảo hiểm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/lao-dong-pho-thong-c44-vi.html"
                    title="Việc làm Lao động phổ thông"
                  >
                    Việc làm Lao động phổ thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/luat-phap-ly-c24-vi.html"
                    title="Việc làm Pháp lý"
                  >
                    Việc làm Pháp lý
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chan-nuoi-thu-y-c52-vi.html"
                    title="Việc làm Thú y"
                  >
                    Việc làm Thú y
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nha-hang-khach-san-c29-vi.html"
                    title="Việc làm Nhà hàng"
                  >
                    Việc làm Nhà hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/an-toan-lao-dong-c58-vi.html"
                    title="Việc làm An toàn lao động"
                  >
                    Việc làm An toàn lao động
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bao-tri-sua-chua-c71-vi.html"
                    title="Việc làm Bảo trì"
                  >
                    Việc làm Bảo trì
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giao-duc-dao-tao-c13-vi.html"
                    title="Việc làm Giáo dục"
                  >
                    Việc làm Giáo dục
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/phi-chinh-phu-phi-loi-nhuan-c20-vi.html"
                    title="Việc làm Phi chính phủ"
                  >
                    Việc làm Phi chính phủ
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Thiết kế"
                  >
                    Việc làm Thiết kế
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/quang-cao-doi-ngoai-truyen-thong-c67-vi.html"
                    title="Việc làm Truyền Thông"
                  >
                    Việc làm Truyền Thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/trac-dia-dia-chat-c54-vi.html"
                    title="Việc làm Trắc địa"
                  >
                    Việc làm Trắc địa
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện tử"
                  >
                    Việc làm Điện tử
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/san-xuat-van-hanh-san-xuat-c25-vi.html"
                    title="Việc làm Sản xuất"
                  >
                    Việc làm Sản xuất
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện"
                  >
                    Việc làm Điện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/lam-nghiep-c50-vi.html"
                    title="Việc làm Lâm Nghiệp"
                  >
                    Việc làm Lâm Nghiệp
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Mỹ thuật"
                  >
                    Việc làm Mỹ thuật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chan-nuoi-thu-y-c52-vi.html"
                    title="Việc làm Chăn nuôi"
                  >
                    Việc làm Chăn nuôi
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/in-an-xuat-ban-c64-vi.html"
                    title="Việc làm In ấn"
                  >
                    Việc làm In ấn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ke-toan-kiem-toan-c2-vi.html"
                    title="Việc làm Kiểm toán"
                  >
                    Việc làm Kiểm toán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/quang-cao-doi-ngoai-truyen-thong-c67-vi.html"
                    title="Việc làm Quảng cáo"
                  >
                    Việc làm Quảng cáo
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hang-khong-c60-vi.html"
                    title="Việc làm Hàng không"
                  >
                    Việc làm Hàng không
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Biên tập"
                  >
                    Việc làm Biên tập
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/in-an-xuat-ban-c64-vi.html"
                    title="Việc làm Xuất bản"
                  >
                    Việc làm Xuất bản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/duoc-pham-c7-vi.html"
                    title="Việc làm Dược phẩm"
                  >
                    Việc làm Dược phẩm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giai-tri-c15-vi.html"
                    title="Việc làm Giải trí"
                  >
                    Việc làm Giải trí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Nghệ thuật"
                  >
                    Việc làm Nghệ thuật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thong-ke-c36-vi.html"
                    title="Việc làm Thống kê"
                  >
                    Việc làm Thống kê
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bien-phien-dich-c38-vi.html"
                    title="Việc làm Biên phiên dịch"
                  >
                    Việc làm Biên phiên dịch
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Báo chí"
                  >
                    Việc làm Báo chí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/buu-chinh-vien-thong-c32-vi.html"
                    title="Việc làm Bưu chính viễn thông"
                  >
                    Việc làm Bưu chính viễn thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/y-te-cham-soc-suc-khoe-c56-vi.html"
                    title="Việc làm Chăm sóc sức khỏe"
                  >
                    Việc làm Chăm sóc sức khỏe
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/van-chuyen-giao-nhan-kho-van-c33-vi.html"
                    title="Việc làm Giao nhận"
                  >
                    Việc làm Giao nhận
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hang-hai-c61-vi.html"
                    title="Việc làm Hàng hải"
                  >
                    Việc làm Hàng hải
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/kien-truc-c6-vi.html"
                    title="Việc làm Kiến trúc"
                  >
                    Việc làm Kiến trúc
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/luat-phap-ly-c24-vi.html"
                    title="Việc làm Luật"
                  >
                    Việc làm Luật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hanh-chinh-thu-ky-c3-vi.html"
                    title="Việc làm Thư ký"
                  >
                    Việc làm Thư ký
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thu-vien-c57-vi.html"
                    title="Việc làm Thư viện"
                  >
                    Việc làm Thư viện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/det-may-da-giay-thoi-trang-c39-vi.html"
                    title="Việc làm Thời trang"
                  >
                    Việc làm Thời trang
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thuc-pham-do-uong-c21-vi.html"
                    title="Việc làm Thực phẩm &amp; Đồ uống"
                  >
                    Việc làm Thực phẩm &amp; Đồ uống
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tiep-thi-marketing-c4-vi.html"
                    title="Việc làm Tiếp thị"
                  >
                    Việc làm Tiếp thị
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Truyền hình"
                  >
                    Việc làm Truyền hình
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tu-van-c9-vi.html"
                    title="Việc làm Tư vấn"
                  >
                    Việc làm Tư vấn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/to-chuc-su-kien-c68-vi.html"
                    title="Việc làm Tổ chức sự kiện"
                  >
                    Việc làm Tổ chức sự kiện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tai-chinh-dau-tu-c59-vi.html"
                    title="Việc làm Đầu tư"
                  >
                    Việc làm Đầu tư
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/trac-dia-dia-chat-c54-vi.html"
                    title="Việc làm Địa Chất"
                  >
                    Việc làm Địa Chất
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giao-duc-dao-tao-c13-vi.html"
                    title="Việc làm Đào tạo"
                  >
                    Việc làm Đào tạo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box-job-type">
              <h4>Tìm việc làm phổ biến</h4>
              <ul>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ke-toan-kiem-toan-c2-vi.html"
                    title="Việc làm Kế toán"
                  >
                    Việc làm Kế toán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/xay-dung-c8-vi.html"
                    title="Việc làm Xây dựng"
                  >
                    Việc làm Xây dựng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/an-ninh-bao-ve-c51-vi.html"
                    title="Việc làm Bảo Vệ"
                  >
                    Việc làm Bảo Vệ
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ngan-hang-c19-vi.html"
                    title="Việc làm Ngân hàng"
                  >
                    Việc làm Ngân hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nong-nghiep-c5-vi.html"
                    title="Việc làm Nông nghiệp"
                  >
                    Việc làm Nông nghiệp
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/cong-nghe-sinh-hoc-c69-vi.html"
                    title="Việc làm Công nghệ sinh học"
                  >
                    Việc làm Công nghệ sinh học
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thuy-san-hai-san-c49-vi.html"
                    title="Việc làm Thủy sản"
                  >
                    Việc làm Thủy sản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/cong-nghe-thuc-pham-dinh-duong-c70-vi.html"
                    title="Việc làm Công nghệ thực phẩm"
                  >
                    Việc làm Công nghệ thực phẩm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Cơ khí"
                  >
                    Việc làm Cơ khí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tiep-thi-marketing-c4-vi.html"
                    title="Việc làm Marketing"
                  >
                    Việc làm Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/xuat-nhap-khau-c18-vi.html"
                    title="Việc làm Xuất nhập khẩu"
                  >
                    Việc làm Xuất nhập khẩu
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/moi-truong-c16-vi.html"
                    title="Việc làm Môi trường"
                  >
                    Việc làm Môi trường
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nhan-su-c22-vi.html"
                    title="Việc làm Nhân sự"
                  >
                    Việc làm Nhân sự
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Ô tô"
                  >
                    Việc làm Ô tô
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bat-dong-san-c28-vi.html"
                    title="Việc làm Bất động sản"
                  >
                    Việc làm Bất động sản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nha-hang-khach-san-c29-vi.html"
                    title="Việc làm Khách sạn"
                  >
                    Việc làm Khách sạn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hoa-hoc-c41-vi.html"
                    title="Việc làm Hóa học"
                  >
                    Việc làm Hóa học
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/du-lich-c34-vi.html"
                    title="Việc làm Du lịch"
                  >
                    Việc làm Du lịch
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dau-khi-c26-vi.html"
                    title="Việc làm Dầu khí"
                  >
                    Việc làm Dầu khí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hanh-chinh-thu-ky-c3-vi.html"
                    title="Việc làm Hành chính"
                  >
                    Việc làm Hành chính
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ban-hang-kinh-doanh-c31-vi.html"
                    title="Việc làm Kinh doanh"
                  >
                    Việc làm Kinh doanh
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/co-khi-o-to-tu-dong-hoa-c14-vi.html"
                    title="Việc làm Tự động hóa"
                  >
                    Việc làm Tự động hóa
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chung-khoan-c46-vi.html"
                    title="Việc làm Chứng khoán"
                  >
                    Việc làm Chứng khoán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/van-chuyen-giao-nhan-kho-van-c33-vi.html"
                    title="Việc làm Kho vận"
                  >
                    Việc làm Kho vận
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thu-mua-vat-tu-c43-vi.html"
                    title="Việc làm Thu mua"
                  >
                    Việc làm Thu mua
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ban-hang-kinh-doanh-c31-vi.html"
                    title="Việc làm Bán hàng"
                  >
                    Việc làm Bán hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/det-may-da-giay-thoi-trang-c39-vi.html"
                    title="Việc làm Dệt may"
                  >
                    Việc làm Dệt may
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tai-chinh-dau-tu-c59-vi.html"
                    title="Việc làm Tài chính"
                  >
                    Việc làm Tài chính
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/y-te-cham-soc-suc-khoe-c56-vi.html"
                    title="Việc làm Y tế"
                  >
                    Việc làm Y tế
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện lạnh"
                  >
                    Việc làm Điện lạnh
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bao-hiem-c23-vi.html"
                    title="Việc làm Bảo hiểm"
                  >
                    Việc làm Bảo hiểm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/lao-dong-pho-thong-c44-vi.html"
                    title="Việc làm Lao động phổ thông"
                  >
                    Việc làm Lao động phổ thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/luat-phap-ly-c24-vi.html"
                    title="Việc làm Pháp lý"
                  >
                    Việc làm Pháp lý
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chan-nuoi-thu-y-c52-vi.html"
                    title="Việc làm Thú y"
                  >
                    Việc làm Thú y
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/nha-hang-khach-san-c29-vi.html"
                    title="Việc làm Nhà hàng"
                  >
                    Việc làm Nhà hàng
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/an-toan-lao-dong-c58-vi.html"
                    title="Việc làm An toàn lao động"
                  >
                    Việc làm An toàn lao động
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bao-tri-sua-chua-c71-vi.html"
                    title="Việc làm Bảo trì"
                  >
                    Việc làm Bảo trì
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giao-duc-dao-tao-c13-vi.html"
                    title="Việc làm Giáo dục"
                  >
                    Việc làm Giáo dục
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/phi-chinh-phu-phi-loi-nhuan-c20-vi.html"
                    title="Việc làm Phi chính phủ"
                  >
                    Việc làm Phi chính phủ
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Thiết kế"
                  >
                    Việc làm Thiết kế
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/quang-cao-doi-ngoai-truyen-thong-c67-vi.html"
                    title="Việc làm Truyền Thông"
                  >
                    Việc làm Truyền Thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/trac-dia-dia-chat-c54-vi.html"
                    title="Việc làm Trắc địa"
                  >
                    Việc làm Trắc địa
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện tử"
                  >
                    Việc làm Điện tử
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/san-xuat-van-hanh-san-xuat-c25-vi.html"
                    title="Việc làm Sản xuất"
                  >
                    Việc làm Sản xuất
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/dien-dien-tu-dien-lanh-c48-vi.html"
                    title="Việc làm Điện"
                  >
                    Việc làm Điện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/lam-nghiep-c50-vi.html"
                    title="Việc làm Lâm Nghiệp"
                  >
                    Việc làm Lâm Nghiệp
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Mỹ thuật"
                  >
                    Việc làm Mỹ thuật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/chan-nuoi-thu-y-c52-vi.html"
                    title="Việc làm Chăn nuôi"
                  >
                    Việc làm Chăn nuôi
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/in-an-xuat-ban-c64-vi.html"
                    title="Việc làm In ấn"
                  >
                    Việc làm In ấn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/ke-toan-kiem-toan-c2-vi.html"
                    title="Việc làm Kiểm toán"
                  >
                    Việc làm Kiểm toán
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/quang-cao-doi-ngoai-truyen-thong-c67-vi.html"
                    title="Việc làm Quảng cáo"
                  >
                    Việc làm Quảng cáo
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hang-khong-c60-vi.html"
                    title="Việc làm Hàng không"
                  >
                    Việc làm Hàng không
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Biên tập"
                  >
                    Việc làm Biên tập
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/in-an-xuat-ban-c64-vi.html"
                    title="Việc làm Xuất bản"
                  >
                    Việc làm Xuất bản
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/duoc-pham-c7-vi.html"
                    title="Việc làm Dược phẩm"
                  >
                    Việc làm Dược phẩm
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giai-tri-c15-vi.html"
                    title="Việc làm Giải trí"
                  >
                    Việc làm Giải trí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/my-thuat-nghe-thuat-thiet-ke-c11-vi.html"
                    title="Việc làm Nghệ thuật"
                  >
                    Việc làm Nghệ thuật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thong-ke-c36-vi.html"
                    title="Việc làm Thống kê"
                  >
                    Việc làm Thống kê
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/bien-phien-dich-c38-vi.html"
                    title="Việc làm Biên phiên dịch"
                  >
                    Việc làm Biên phiên dịch
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Báo chí"
                  >
                    Việc làm Báo chí
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/buu-chinh-vien-thong-c32-vi.html"
                    title="Việc làm Bưu chính viễn thông"
                  >
                    Việc làm Bưu chính viễn thông
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/y-te-cham-soc-suc-khoe-c56-vi.html"
                    title="Việc làm Chăm sóc sức khỏe"
                  >
                    Việc làm Chăm sóc sức khỏe
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/van-chuyen-giao-nhan-kho-van-c33-vi.html"
                    title="Việc làm Giao nhận"
                  >
                    Việc làm Giao nhận
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hang-hai-c61-vi.html"
                    title="Việc làm Hàng hải"
                  >
                    Việc làm Hàng hải
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/kien-truc-c6-vi.html"
                    title="Việc làm Kiến trúc"
                  >
                    Việc làm Kiến trúc
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/luat-phap-ly-c24-vi.html"
                    title="Việc làm Luật"
                  >
                    Việc làm Luật
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/hanh-chinh-thu-ky-c3-vi.html"
                    title="Việc làm Thư ký"
                  >
                    Việc làm Thư ký
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thu-vien-c57-vi.html"
                    title="Việc làm Thư viện"
                  >
                    Việc làm Thư viện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/det-may-da-giay-thoi-trang-c39-vi.html"
                    title="Việc làm Thời trang"
                  >
                    Việc làm Thời trang
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/thuc-pham-do-uong-c21-vi.html"
                    title="Việc làm Thực phẩm &amp; Đồ uống"
                  >
                    Việc làm Thực phẩm &amp; Đồ uống
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tiep-thi-marketing-c4-vi.html"
                    title="Việc làm Tiếp thị"
                  >
                    Việc làm Tiếp thị
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/truyen-hinh-bao-chi-bien-tap-c66-vi.html"
                    title="Việc làm Truyền hình"
                  >
                    Việc làm Truyền hình
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tu-van-c9-vi.html"
                    title="Việc làm Tư vấn"
                  >
                    Việc làm Tư vấn
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/to-chuc-su-kien-c68-vi.html"
                    title="Việc làm Tổ chức sự kiện"
                  >
                    Việc làm Tổ chức sự kiện
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/tai-chinh-dau-tu-c59-vi.html"
                    title="Việc làm Đầu tư"
                  >
                    Việc làm Đầu tư
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/trac-dia-dia-chat-c54-vi.html"
                    title="Việc làm Địa Chất"
                  >
                    Việc làm Địa Chất
                  </a>
                </li>
                <li>
                  <a
                    href="https://careerviet.vn/viec-lam/giao-duc-dao-tao-c13-vi.html"
                    title="Việc làm Đào tạo"
                  >
                    Việc làm Đào tạo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default InfoJob;
