/* eslint-disable no-unused-vars */
import { memo, useEffect, useState } from "react";
import "./itemBoxCustom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faClock,
  faLocationDot,
  faHeart as solidHeart
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { formatSalaryNoVND2 } from "../../../helpers/salaryConvert";
import {
  formatTimeDifferenceMongoDb,
  formatTimeRemainingMongoDb,
} from "../../../helpers/formartDate";
import { Link, useNavigate } from "react-router-dom";

import { getJobAdvancedSearch } from "../../../services/clients/jobsApi";
import { decData } from "../../../helpers/decData";
import { useDispatch, useSelector } from "react-redux";
import { saveJob } from "../../../services/clients/user-userApi";
import { UpdateDataAuthClient } from "../../../update-data-reducer/clients/updateDataClient";
import { message } from "antd";
function ItemBoxCustom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobByCategories, setJobByCategories] = useState("");
  const [recordItem, setRecordItem] = useState([]);
  const [dataUser, setDataUser] = useState({}); //[1

  const [messageApi, contextHolder] = message.useMessage();
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );

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

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getJobAdvancedSearch(
        "1",
        "6",
        "",
        "",
        "",
        jobByCategories
      );
      if (result.code === 200) {
        const convertData = decData(result.data);
        setRecordItem(convertData);
      }
    };

    fetchApi();
  }, [jobByCategories]);

  useEffect(() => {
    if (authenMainClient?.infoUser) {
      setJobByCategories(authenMainClient?.infoUser?.job_categorie_id);
      setDataUser(authenMainClient?.infoUser);
    }
  }, [authenMainClient?.infoUser]);

  return (
    <div className="items-box__newscustom col-md-12">
      {contextHolder}
      <h3 className="mb-3 title">Việc làm phù hợp với bạn</h3>
      {recordItem.length > 0 &&
        recordItem.map((item, index) => (
          <div key={index} className="items-box__newscustom-item ">
            <div className="items-box__avatar">
              <Link to={`/tim-viec-lam/${item?.slug}`}>
                <img
                  src={item?.logoCompany}
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
              <div className="updateAt">
                Cập nhật {formatTimeDifferenceMongoDb(item.updatedAt)} trước
              </div>
              <div className="info-job">
                <div className="time-line">
                  <div className="address">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{item?.city?.name}</span>
                  </div>
                  <div className="end_date">
                    <FontAwesomeIcon icon={faClock} />
                    <div>
                      Còn{" "}
                      <strong>
                        {formatTimeRemainingMongoDb(item?.end_date)}
                      </strong>{" "}
                      để ứng tuyển
                    </div>
                  </div>
                </div>
                <div className="button-line">
                  <Link
                    to={`/tim-viec-lam/${item?.slug}?modal=show`}
                    className="button-all"
                  >
                    Ứng tuyển
                  </Link>
                  { dataUser?.listJobSave?.some(job => item?._id === job.idJob)  ? (
                    <div
                      title="Bỏ lưu công việc"
                      onClick={() => {
                        handleSaveJob(item?._id, "delete");
                      }}
                      className="box-heart"
                    >
                      <FontAwesomeIcon icon={solidHeart} />
                    </div>
                  ) : (
                    <div
                      title="Lưu công việc"
                      onClick={() => {
                        handleSaveJob(item?._id, "save");
                      }}
                      className="box-heart"
                    >
                      <FontAwesomeIcon icon={regularHeart} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

const MemoizedItemBoxCustom = memo(ItemBoxCustom);

export default MemoizedItemBoxCustom;
