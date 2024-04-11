/* eslint-disable no-unused-vars */
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Select, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import ModelViewCv from "../../../components/employers/modelViewCv";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { memo } from "react";
import { actionCv } from "../../../services/employers/jobsApi";
import MemoizedFilterDropdownCustom from "../../../components/employers/filterDropdownCustom";
import { removeAccents } from "../../../helpers/removeAccents";

import { options } from "./js/options";

function ApplyCv({ record, fetchApi }) {
  const [statusCheck, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [dataFull, setDataFull] = useState([]);

  useEffect(() => {
    if (Object.keys(record)?.length > 0) {
  
      setData(record?.listProfileRequirement);
      setDataFull(record);
    }else{
      setData([]);
    }
  }, [record]);
  const handleActionCv = async (valueForm, status = "") => {
    const idJob = dataFull?._id || "";

    const email = valueForm?.email || "";
    const objectNew = {
      idJob,
      status,
      email,
    };
    const result = await actionCv(objectNew);
    if (result.code === 200) {
      
      fetchApi(statusCheck);
    }
  };
 
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
          removeAccents(record.fullName)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase()) ||
          removeAccents(record.fullName)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase())
        );
      },
    },
    {
      title: "Chiến dịch",
      dataIndex: "campaign",
      key: "campaign",
      render: (_, __) => {
        return (
          <div className="box-campaign">
            <div className="mb-2" title={dataFull?.title}>
              {dataFull?.title}
            </div>
            <div title={dataFull?._id}> #{dataFull?._id}</div>
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
              <span>{dataRecord?.email}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} />
              <span>{dataRecord?.phone}</span>
            </div>
          </div>
        );
      },
      filterDropdown: (props) => {
        return <MemoizedFilterDropdownCustom {...props} />;
      },
      onFilter: (value, record) => {
        const textConvert = record?.phone + "-" + record?.email;
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
            <span>{moment(record.dateTime).format("YYYY/MM/DD HH:mm")}</span>
          </div>
        </div>
      ),

      sorter: (a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
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
              <ModelViewCv
                record={record}
                dataFull={dataFull}
                fetchApi={()=>{fetchApi(status)}}

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
  
  const handleChangeStatus = async (value) => {
    setStatus(value);
    fetchApi(value);
  };
  return (
    <div className="apply-cv">
      <div className="search-form mb-3">
        <Select
          onChange={handleChangeStatus}
          className="select-management-job"
          defaultValue=""
          style={{width:"200px"}}
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
      </div>
      <Table
        showSorterTooltip={false}
        rowKey={"email"}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data}
      />
    </div>
  );
}

const MemoizedApplyCv = memo(ApplyCv);
export default MemoizedApplyCv;
