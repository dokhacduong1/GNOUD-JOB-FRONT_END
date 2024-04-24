import { Button, ConfigProvider, Segmented, Table, Tag, Input } from "antd";
import { useEffect, useState } from "react";
import { getCvApply } from "../../../services/employers/cvsApi";
import MemoizedFilterDropdownCustom from "../../../components/employers/filterDropdownCustom";
import { removeAccents } from "../../../helpers/removeAccents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./managementCvs.scss";
import MemoizedModelViewCv from "../../../components/employers/modelViewCv";
import { actionCv } from "../../../services/employers/jobsApi";
function ManagementCvs() {
  const [data, setdata] = useState([]);
 
  const [statusApi, setStatusApi] = useState("");
const [keywordApi,setKeywordApi] = useState("")
  const { Search } = Input;
  const fetchApi = async (status="",keyword = "") => {
    const result = await getCvApply(status,keyword);
    if (result.code === 200) {
      setdata(result.data);
    }
  };

  useEffect(() => {
    fetchApi(statusApi,keywordApi);
  }, [statusApi,keywordApi]);
  const handleActionCv = async (valueForm, status = "") => {
    const idJob = valueForm?.idJob?._id || "";

    const email = valueForm?.email || "";
    const objectNew = {
      idJob,
      status,
      email,
    };
    const result = await actionCv(objectNew);
    if (result.code === 200) {
      fetchApi();
    }
  };
  const handleSearch = (value) => {
    setKeywordApi(value);
  }
  const columns = [
    {
      title: "Ứng viên",
      dataIndex: "candidate",
      key: "candidate",
      render: (_, dataRecord) => {
        return (
          <div className="box-candidate">
            <div className="images">
              <img src={dataRecord?.idUser?.avatar || ""} alt="avatr" />
            </div>
            <div className="box-content">
              <div>{dataRecord?.idUser?.fullName}</div>
              {dataRecord?.countView > 0 && (
                <div className="cv-seen">Đã xem</div>
              )}
              {dataRecord?.countView === 0 && (
                <div className="cv-no-seen">Chưa xem</div>
              )}
            </div>
          </div>
        );
      },
      filterDropdown: (props) => {
        return <MemoizedFilterDropdownCustom {...props} />;
      },
      onFilter: (value, record) => {
        return (
          removeAccents(record?.idUser?.fullName)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase()) ||
          removeAccents(record?.idUser?.fullName)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase())
        );
      },
    },
    {
      title: "Chiến dịch",
      dataIndex: "campaign",
      key: "campaign",
      render: (_, dataRecord) => {
        return (
          <div className="box-campaign">
            <div className="mb-2" title={dataRecord?.idJob?.title}>
              {dataRecord?.idJob?.title}
            </div>
            <div title={dataRecord?._id}> #{dataRecord?.idJob?._id}</div>
          </div>
        );
      },
    },
    {
      title: "Thông tin liên hệ",
      dataIndex: "contact",
      key: "contact",
      render: (_, dataRecord) => {
        return (
          <div className="box-contact">
            <div className="mb-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>{dataRecord?.idUser?.email}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} />
              <span>{dataRecord?.idUser?.phone}</span>
            </div>
          </div>
        );
      },
      filterDropdown: (props) => {
        return <MemoizedFilterDropdownCustom {...props} />;
      },
      onFilter: (value, record) => {
        const textConvert = record?.idUser?.phone + "-" + record?.idUser?.email;
        return (
          removeAccents(textConvert)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase()) ||
          removeAccents(textConvert)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase())
        );
      },
    },
    {
      title: "Insights",
      key: "insights",
      dataIndex: "insights",
      render: (_, record) => (
        <div className="box-insights">
          <div className="mb-2">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span>Tìm việc</span>
          </div>
          <div className="mb-2">
            <FontAwesomeIcon icon={faClock} />
            <span>{moment(record.createdAt).format("YYYY/MM/DD HH:mm")}</span>
          </div>
        </div>
      ),

      sorter: (a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <div className="box-status">
            {record?.status === "pending" && (
              <Tag icon={<SyncOutlined spin />} color="warning">
                Đang chờ duyệt
              </Tag>
            )}
            {record?.status === "refuse" && (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Đã từ chối
              </Tag>
            )}
            {record?.status === "accept" && (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Đã phê duyệt
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="box-action">
            <div className="mb-2  btn-seen-cv">
              <MemoizedModelViewCv
                record={record}
                dataFull={{
                  _id: record?.idJob?._id,
                  email: record?.idUser?.email,
                  phone: record?.idUser?.phone,
                  title: record?.idJob?.title,
                }}
                fetchApi={() => {
                  fetchApi(status);
                }}
              />
            </div>

            <div className="mb-2   btn-accept-cv">
              <Button
                onClick={() => {
                  handleActionCv(record, "accept");
                }}
                disabled={record?.status !== "pending"}
              >
                Chấp nhận
              </Button>
            </div>
            <div className="btn-reject-cv">
              <Button
                onClick={() => {
                  handleActionCv(record, "refuse");
                }}
                disabled={record?.status !== "pending"}
              >
                Từ chối
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container-fluid page-content mt-4 add-jobs-employer reset-button-employer">
      <div className="title title-employer-setting  mb-4">
        <h3>Quản lý CV</h3>
      </div>

      <div className="management-cvs">
        <div className="segemment mb-3">
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                
                    itemSelectedColor:"#F76197",
                    trackBg:"#fff"
                
                },
              },
              token: {
                boxShadow: "0px 0px 10px 0px #f0f0f0",
                fontSize: 14,
                fontWeightStrong:"600px"
        
              },
            }}
          >
            <Segmented
         
                size="large"
              value={statusApi}
              onChange={(value) => setStatusApi(value)}
              options={[
                {
                    label: "Tất cả",
                    value: "",
                  },
                {
                  label: "Đã phê duyệt",
                  value: "accept",
                },
                {
                  label: "Đang chờ duyệt",
                  value: "pending",
                },
              ]}
            />
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Input:{

                }
              },
              token: {
                borderRadius:99999,
                colorBorder:"#fff"
              },
            }}
          >
            <Search
            onSearch={handleSearch}
               size="large"
              placeholder="Nhập từ khóa"
              allowClear
            />
          </ConfigProvider>
        </div>
        <div className="table-cvs">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
}
export default ManagementCvs;
