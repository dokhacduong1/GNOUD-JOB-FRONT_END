import { useEffect, useState } from "react";
import MemoizedNewsJobHeader from "../../../components/clients/newsJobHeader";
import "./jobSaves.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Radio, message } from "antd";
import { jobSaveUser } from "../../../services/clients/jobsApi";
import { decData } from "../../../helpers/decData";
import { useQuery } from "../../../helpers/getQuery";
import { formatSalaryNoVND2 } from "../../../helpers/salaryConvert";
import { formatTimeDifferenceMongoDb } from "../../../helpers/formartDate";
import { saveJob } from "../../../services/clients/user-userApi";
import { UpdateDataAuthClient } from "../../../update-data-reducer/clients/updateDataClient";
import { Link, useNavigate } from "react-router-dom";
import EmptyJob from "../../../components/clients/emptyJob";
function JobSaves() {
  const [dataJob, setDataJob] = useState([]);
  const [countPagination, setCountPagination] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();
  const sort_key = query.get("sort_key") || "";
  const page = query.get("page") || "1";
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );
  const fetchApi = async () => {
    const result = await jobSaveUser(sort_key, page);
    if (result.code === 200) {
      setDataJob(decData(result.data));
      setCountPagination(result.countJobs);
    }
  };
  useEffect(() => {
    if (authenMainClient?.infoUser) {
      fetchApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenMainClient?.infoUser, sort_key, page]);

  const handleSaveJob = async (value, action = "delete") => {
    try {
      if (!value) return;
      const objectNew = {
        action: action,
        idJob: value,
      };
      const result = await saveJob(objectNew);
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

  const onChangeSort = (value) => {
    const sortValue = value.target.value;
    navigate(`?sort_key=${sortValue}&page=${1}`);
  };
  const handleChangePagination = (value) => {
    window.scrollTo(0, 0);
    navigate(`?sort_key=${sort_key}&page=${value}`);
  };
  return (
    <>
      {contextHolder}
      <div className="col-8 ">
        <div className="box-settings-info">
          <div className="job-saves">
            <div className="job-saves__header mb-3">
              <MemoizedNewsJobHeader
                title={"Việc làm đã lưu"}
                description={
                  "Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn."
                }
              />
            </div>
            <div className="job-saves__body">
              <div className="box-total">
                Danh sách <strong>1</strong> việc làm đã lưu
              </div>
              <hr />
              <div className="box-sort">
                <div className="text">Ưu tiên hiển thị:</div>
                <Radio.Group value={sort_key} onChange={onChangeSort}>
                  <Radio value={""}>Tất cả</Radio>
                  <Radio value={"updatedAt"}>Cập nhật gần đây</Radio>
                  <Radio value={"salary_max"}>Lương cao nhất</Radio>
                  <Radio value={"salary_min"}>Lương thấp nhất</Radio>
                </Radio.Group>
              </div>
              <hr />
              <div className="box-items">
                {dataJob.length > 0 ? (
                  dataJob.map((item, index) => (
                    <div key={index} className="item">
                      <div className="image-company">
                        <Link  to={`/tim-viec-lam/${item?.slug}`}>
                          <img
                            src={item?.employerId?.logoCompany}
                            alt="company"
                          />
                        </Link>
                      </div>
                      <div className="content">
                        <div className="title-job mb-2">
                          <Link to={`/tim-viec-lam/${item?.slug}`}>{item?.title}</Link>
                          <span>
                            {formatSalaryNoVND2(
                              item?.salaryMin,
                              item?.salaryMax
                            )}{" "}
                            triệu
                          </span>
                        </div>
                        <div className="name-company mb-2">
                          {item?.employerId?.companyName}
                        </div>
                        <div className="time-created mb-2">
                          Đã lưu:{" "}
                          {moment(item?.createdAtSave).format(
                            "DD-MM-YYYY hh:mm A"
                          )}
                        </div>
                        <div className="box-action">
                          <div className="box-tag">
                            <div>{item?.city?.name}</div>
                            <div>
                              Cập nhật{" "}
                              {formatTimeDifferenceMongoDb(item.updatedAt)}{" "}
                              trước
                            </div>
                          </div>
                          <div className="box-button">
                            <Link
                              to={`/tim-viec-lam/${item?.slug}?modal=show`}
                              className="apply"
                            >
                              Ứng tuyển
                            </Link>
                            <div
                              className="delete"
                              onClick={() => {
                                handleSaveJob(item?._id, "delete");
                              }}
                            >
                              Bỏ lưu
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyJob />
                )}
              </div>
            </div>
            <div className="pagination-save">
              <Pagination
                onChange={handleChangePagination}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
                current={page}
                total={countPagination * 10}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default JobSaves;
