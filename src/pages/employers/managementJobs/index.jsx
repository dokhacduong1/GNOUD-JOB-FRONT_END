import { Link } from "react-router-dom";
import "./managementJobs.scss";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Select, Switch, Table, Tag, message } from "antd";
import { options } from "./js/options";

import { useEffect, useState } from "react";
import { changeStatusSingleJobsEmployer } from "../../../services/employers/jobsApi";

import { formatDate } from "../../../helpers/formartDate";
import FilterDropdownCustom from "../../../components/employers/filterDropdownCustom";
import { removeAccents } from "../../../helpers/removeAccents";
import { fetchApi } from "./js/fetchApi";
import MemoizedFormEdit from "./formEdit";
function ManagementJobsEmployer() {
  const [dataFull, setData] = useState([]);
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [statuss, setStatus] = useState("");
  const [keywords, setKeywords] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchApi(setData, statuss, keywords);
  }, []);

  const onChangeSwitch = async (checked, id) => {
    try {
      setLoading(true);
      const objectNew = {
        status: checked ? "active" : "inactive",
      };
      const result = await changeStatusSingleJobsEmployer(id, objectNew);
      if (result.code === 200) {
        messageApi.open({
          type: "success",
          content: result.success,
          icon: (
            <span className="icon-message-employer-success">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ),
        });
        fetchApi(setData, statuss, keywords);
      } else {
        messageApi.open({
          type: "error",
          content: result.error,
          icon: (
            <span className="icon-message-employer-error">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Lỗi không xác định",
        icon: (
          <span className="icon-message-employer-error">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        ),
      });
    }
  };

  const columns = [
    {
      title: "Chiến dịch tuyển dụng",
      dataIndex: "recruitment-campaign",
      key: "recruitment-campaign",
      render: (_, data) => {
        return (
          <>
            <div className="box-recruitment-campaign">
              <div className="box-recruitment-campaign__switch">
                <Switch
                  loading={loading}
                  onChange={(checked) => onChangeSwitch(checked, data._id)}
                  disabled={
                    data.status === "refuse" || data.status === "pending"
                  }
                  defaultChecked={data.status === "active"}
                />
              </div>
              <div>
                <div className="box-recruitment-campaign__content mb-2">
                  <div className="id">#{data?._id}</div>
                  <div className="title mb-1">{data?.title}</div>
                  <div className="cv ">
                    <div className="box-text">Chưa có CV nào</div>
                    {/* <div className="box-text mb-1">Đã có 3 CV</div>
                    <div className="box-image">
                      <img src="https://i.imgur.com/izYKFLd.jpeg" alt="" />
                      <img src="https://i.imgur.com/iCvRTEQ.jpeg" alt="" />
                      <img
                        src="https://i.imgur.com/HJh4fPz_d.webp?maxwidth=760&fidelity=grand"
                        alt=""
                      />
                    </div> */}
                  </div>
                </div>
                <div className="box-recruitment-campaign__detail">
                  <div className="content-1">
                    <a href="#!">
                      {" "}
                      <MemoizedFormEdit
                        dataStatus={data.status}
                        messageApi={messageApi}
                        fetchApiLoad={() => {
                          fetchApi(setData, statuss, keywords);
                        }}
                        record={data}
                      />
                    </a>
                    <Link to={`../detail-jobs/${data._id}/?active_tab=job`}>
                      Xem báo cáo
                    </Link>
                  </div>
                  <Link
                    to={`../detail-jobs/${data._id}/?active_tab=apply_cv`}
                    className="content2"
                  >
                    Xem CV ứng tuyển
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
      },

      filterDropdown: (props) => {
        return <FilterDropdownCustom {...props} />;
      },
      onFilter: (value, record) => {
        return (
          removeAccents(record.title)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase()) ||
          removeAccents(record.title)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase())
        );
      },
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",

      render: (_, { createdAt }) => <span>{formatDate(createdAt)}</span>,
      sorter: (a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày Hết Hạn",
      dataIndex: "end_date",
      key: "end_date",

      render: (_, { end_date }) => <span>{formatDate(end_date)}</span>,
      sorter: (a, b) => {
        return new Date(a.end_date) - new Date(b.end_date);
      },
    },
    {
      title: "Tin tuyển dụng",
      dataIndex: "recruitment",
      key: "recruitment",
      render: (_, data) => {
        return (
          <>
            {data?.status === "pending" ? (
              <Tag color="rgb(49 133 213)">Đang chờ xét duyệt</Tag>
            ) : data.status === "inactive" ? (
              <Tag color="error">Tin dừng hoạt động</Tag>
            ) : data.status === "refuse" ? (
              <Tag color="#cd201f">Tin đã bị từ chối</Tag>
            ) : (
              <Tag color="#f77bac">Tin đang hoạt động</Tag>
            )}
          </>
        );
      },
    },

    {
      title: "Dịch vụ đang sử dụng",
      dataIndex: "service-in-use",
      key: "service-in-use",
      render: () => {
        // Change the duplicate underscore variable names to unique names
        return (
          <Link to={"#!"} className="button-add">
            Thêm
          </Link>
        );
      },
    },
  ];
  //Hàm này để cái select nó chọn để lọc trạng thái
  const handleChangeStatus = async (value) => {
    setStatus(value);
    fetchApi(setData, value, keywords);
  };
  //Hàm này để search từ khóa
  const handleSearch = (value) => {
    setKeywords(value);
    fetchApi(setData, statuss, value);
  };
  return (
    <>
      {contextHolder}
      <div className="container-fluid page-content mt-4 management-jobs reset-button-employer">
        <div className="title title-employer-setting  mb-4 ">
          <h3>Quản lý tin tuyển dụng</h3>
          <Link to={"../add-jobs-employer"}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Thêm chiến dịch</span>
          </Link>
        </div>
        <div className="search-form mb-3">
          <Search
           
            onSearch={handleSearch}
            size="large"
            addonBefore={
              <Select
                onChange={handleChangeStatus}
                className="select-management-job"
                defaultValue=""
                options={options}
                dropdownRender={(menu) => {
                  return (
                    <>
                      <div className="search-custom-jobs">
                        <span className="item">{menu}</span>
                      </div>
                    </>
                  );
                }}
              />
            }
          />
        </div>
        <div className="table-form">
          <Table
            showSorterTooltip={false}
            columns={columns}
            dataSource={dataFull}
            rowKey="_id"
          />
        </div>
      </div>
    </>
  );
}
export default ManagementJobsEmployer;
