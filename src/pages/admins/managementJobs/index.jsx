import { Card, Popconfirm, Space, Table, Tag, notification } from "antd";

import { useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDate } from "../../../helpers/formartDate";
import "./managementJobs.scss";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { changeSingleStatusId } from "./changeSingleStatus";
import { deleteSingleId } from "./deleteSingle";
import { fetchApiJobsManage } from "./js/fetchApi";
import ChangeMultipleBox from "../../../components/admins/changeMultipleBox";

import FilterBox from "../../../components/admins/filterBox";

import {
  optionsChangeMultiple,
  optionsFilterStartus,
  optionsSort,
} from "./js/options";
import SortBox from "../../../components/admins/sortBox";
import FormEdit from "./formEdit";
import { useSelector } from "react-redux";
import { changeMultipleJobs } from "../../../services/admins/jobsApi";
function MangaementJobs() {
  const [recordMain, setRecordMain] = useState([]);
  const [listDeleteId, setDeleteId] = useState([]);
  const [statuss, setStatus] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [keywords, setKeywords] = useState("");
  const [api, contextHolder] = notification.useNotification();
  //Lấy thông tin quyền từ store của  redux
  const userAdmin = useSelector(
    (dataCheck) => dataCheck.authenticationReducerAdmin
  );

  useEffect(() => {
    fetchApiJobsManage(setRecordMain, statuss, keywords, sortKey, sortValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Tiêu Đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Công Ty",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",

      render: (_, { createdAt }) => <span>{formatDate(createdAt)}</span>,
    },
    {
      title: "Ngày Cập Nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",

      render: (_, { updatedAt }) => <span>{formatDate(updatedAt)}</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",

      render: (_, { _id, status }) =>
        status === "active" ? (
          <Tag
            onClick={() =>
              changeSingleStatusId(
                _id,
                "inactive",
                fetchApiJobsManage,
                setRecordMain,
                api,
                statuss,
                keywords,
                sortKey,
                sortValue
              )
            }
            style={{ cursor: "pointer" }}
            icon={<CheckCircleOutlined />}
            color="success"
          >
            Hoạt Động
          </Tag>
        ) : status == "pending" ? (
          <div className="pending">
            <Popconfirm
              title="Phệ duyệt công việc"
              description="Bạn muốn phê duyệt công duyệt này chứ ?"
              okText="Phê duyệt"
              cancelText="Hủy"
              onConfirm={() =>
                changeSingleStatusId(
                  _id,
                  "active",
                  fetchApiJobsManage,
                  setRecordMain,
                  api,
                  statuss,
                  keywords,
                  sortKey,
                  sortValue
                )
              }
              onCancel={() =>
                changeSingleStatusId(
                  _id,
                  "refuse",
                  fetchApiJobsManage,
                  setRecordMain,
                  api,
                  statuss,
                  keywords,
                  sortKey,
                  sortValue
                )
              }
            >
              <Tag
                style={{ cursor: "pointer" }}
                icon={<CloseCircleOutlined />}
                color="warning"
              >
                Chờ phê duyệt
              </Tag>
            </Popconfirm>
          </div>
        ) : status == "refuse" ? (
          <Tag
            onClick={() =>
              changeSingleStatusId(
                _id,
                "active",
                fetchApiJobsManage,
                setRecordMain,
                api,
                statuss,
                keywords,
                sortKey,
                sortValue
              )
            }
            style={{ cursor: "pointer" }}
            icon={<CloseCircleOutlined />}
            color="#cd201f"
          >
            Đã bị từ chối
          </Tag>
        ) : (
          <Tag
            onClick={() =>
              changeSingleStatusId(
                _id,
                "active",
                fetchApiJobsManage,
                setRecordMain,
                api,
                statuss,
                keywords,
                sortKey,
                sortValue
              )
            }
            style={{ cursor: "pointer" }}
            icon={<CloseCircleOutlined />}
            color="error"
          >
            Dừng Hoạt Động
          </Tag>
        ),
    },
    {
      title: "Ảnh Công Ty",
      dataIndex: "companyImage",
      key: "companyImage",

      render: (_, { companyImage }) => (
        <img src={companyImage} alt={`${companyImage}.jpg`}></img>
      ),
    },
    {
      title: "Hành Động",
      key: "action",

      render: (_, record) => (
        <Space size="small">
          {
            //Kiểm tra xem người dùng có quyền edit hay không
            userAdmin?.status &&
              userAdmin.infoUser.permissions.includes("jobs-edit") === true && (
                <>
                  <FormEdit
                    record={record}
                    fetchApiLoad={() =>
                      fetchApiJobsManage(
                        setRecordMain,
                        statuss,
                        keywords,
                        sortKey,
                        sortValue
                      )
                    }
                  />
                </>
              )
          }
          {
            //Kiểm tra xem người dùng có quyền xóa hay không
            userAdmin?.status &&
              userAdmin.infoUser.permissions.includes("jobs-delete") ===
                true && (
                <>
                  <Popconfirm
                    title="Xóa Công Việc"
                    description="Bạn Có Muốn Xóa Công Việc Này Không ?"
                    okText="Ok"
                    cancelText="No"
                    onConfirm={() =>
                      deleteSingleId(
                        record._id,
                        fetchApiJobsManage,
                        setRecordMain,
                        api,
                        statuss,
                        keywords,
                        sortKey,
                        sortValue
                      )
                    }
                  >
                    <span className="button-delete">
                      <DeleteOutlined />
                    </span>
                  </Popconfirm>
                </>
              )
          }

          {
            //Kiểm tra xem người dùng có quyền xem hay không
            userAdmin?.status &&
              userAdmin.infoUser.permissions.includes("jobs-delete") ===
                true && (
                <>
                  <span className="button-eye">
                    <EyeOutlined />
                  </span>
                </>
              )
          }
        </Space>
      ),
    },
  ];

  //hàm này được gọi khi form submit lên
  const handleSubmitChangeMultiple = async (valueForm) => {
    let newRecord;
    //Check xem người dùng muốn gửi theo phương thức gì
    switch (valueForm.action) {
      case "deleted":
        newRecord = {
          ids: listDeleteId,
          key: "deleted",
        };

        break;
      case "inactive":
        newRecord = {
          ids: listDeleteId,
          key: "status",
          value: "inactive",
        };

        break;
      case "active":
        newRecord = {
          ids: listDeleteId,
          key: "status",
          value: "active",
        };

        break;
      default:
        break;
    }

    const result = await changeMultipleJobs(newRecord);
    if (result.code === 200) {
      api.success({
        message: `Success`,
        description: (
          <>
            <i>{result.success}</i>
          </>
        ),
      });
    } else {
      api.error({
        message: <span style={{ color: "red" }}>Failed</span>,
        description: (
          <>
            <i>{result.error}</i>
          </>
        ),
      });
    }
    fetchApiJobsManage(setRecordMain, statuss, keywords, sortKey, sortValue);
  };

  //Hàm này cho người dùng lọc những sản phẩm theo status
  const handleChangeStatus = async (value) => {
    const valueStatus = value.target.value;
  
    fetchApiJobsManage(
      setRecordMain,
      valueStatus,
      keywords,
      sortKey,
      sortValue
    );
    setStatus(valueStatus);
  };

  const handleSearchKeyword = async (value) => {
    const keyword = value;
    //Nếu value bằng rỗng thì gọi lại hàm vẽ ra dữ liệu
    fetchApiJobsManage(setRecordMain, statuss, keyword, sortKey, sortValue);
    setKeywords(keyword);
  };
  const handleSort = async (value) => {
    const sortKeySelect = value.split("-")[0];
    const sortValueSelect = value.split("-")[1];

    if (sortKeySelect === "tree") {
      fetchApiJobsManage(setRecordMain, statuss, keywords, "", "", "true");

      return;
    }
    fetchApiJobsManage(
      setRecordMain,
      statuss,
      keywords,
      sortKeySelect,
      sortValueSelect,
      "false"
    );

    setSortKey(sortKeySelect);
    setSortValue(sortValueSelect);
  };

  //hàm này để lấy các id mà người dụng chọn ở ô checkbox
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //Lấy ra danh sách id
      const listId = selectedRows.map((dataMap) => dataMap._id);
      //Lưu danh sách id đó vào mảng listId
      setDeleteId(listId);
    },
  };

  return (
    <Card>
      {contextHolder}
      <h2 className="title-main-admin">Quản Lý Công Việc</h2>
      <FilterBox
        optionsFilter={optionsFilterStartus}
        handleChange={handleChangeStatus}
        handleSearch={handleSearchKeyword}
      />
      <SortBox handleChange={handleSort} options={optionsSort} />
      <div className="managementCategories mt-3 box-card">
        <div className="managementCategories__head mb-2 card-header">
          <h2 className="title-header">
            <i>Công Việc</i>
          </h2>
        </div>
        <div className="managementCategories__body card-body mt-2">
          {/* Đoạn này là khối thực hiện nhiều hành động */}
          {
            //Kiểm tra xem người dùng có quyền edit hay không
            userAdmin?.status &&
              userAdmin.infoUser.permissions.includes("jobs-edit") === true && (
                <>
                  <ChangeMultipleBox
                    checkActiveButton={listDeleteId.length > 0 ? false : true}
                    options={optionsChangeMultiple}
                    handleSubmit={handleSubmitChangeMultiple}
                  />
                </>
              )
          }
          {/* Hết khối thực hiện nhiều hành động */}

          {/* Đoạn này về table */}
          <Table
            pagination={{
              pageSize: 7,
              position: ["bottomCenter"],
            }}
            scroll={{
              y: 600,
            }}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={recordMain}
          />
          {/* Hết Khối Table */}
        </div>
      </div>
    </Card>
  );
}
export default MangaementJobs;
