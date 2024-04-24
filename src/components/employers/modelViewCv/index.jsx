import { Button, Input, Modal, Popover, Spin, Tag } from "antd";
import { useEffect, useRef, useState } from "react";

import "./modelViewCv.scss";
import { coutViewCv, getPdfToDriver } from "../../../services/employers/jobsApi";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import catLoading from "./images/cat.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMobileScreen,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ModalIntroducingLetter from "./modalIntroducingLetter";
import { TwitterOutlined } from "@ant-design/icons";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { memo } from "react";
import { convertFileCvDriverToUrl } from "../../../helpers/convertFileCvDriverToUrl";
function ModelViewCv({ record, dataFull,fetchApi }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkPdf, setLinkPdf] = useState("");
  const [loadingCv, setLoadingCv] = useState(true);
  const inputRef = useRef(null);
  const showModal = async () => {
    const idJob = dataFull?._id || "";
    const email = data?.email || "";
    const id_File = data?.id_file_cv;
    const objectNew = {
      idJob,
      email,
    };
    setIsModalOpen(true);
    if(email){
      const result = await coutViewCv(objectNew);

  }
    if (id_File) {
      const result = await getPdfToDriver({ id_file: id_File });
      if (result.code === 200) {
       const url = convertFileCvDriverToUrl(result.data);
        setLinkPdf(url);
      }
    }
   
   
  };

  const handleCancel = () => {
    fetchApi();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (Object.keys(record).length > 0) {
      setData(record);
    }
  }, [record]);
  const handleDocumentLoad = () => {
    setLoadingCv(false);
  };

  const handleCopy = () => {
    const input = inputRef.current;
    input.select();
    document.execCommand("copy");
  };
  const content = (
    <div className="share-model-popup">
      <div className="share-link-via mb-1">
        <div className="title-share  mb-2">Chia sẻ qua mạng xã hội</div>
        <div className="box-icon">
          <a
            href={`http://www.facebook.com/sharer/sharer.php?u=https://drive.google.com/file/d/${data?.id_file_cv}`}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=https://drive.google.com/file/d/${data?.id_file_cv}`}
            target="_blank"
            rel="noreferrer"
          >
            <TwitterOutlined />
          </a>
          <a
            href={`https://www.linkedin.com/cws/share?url=https://drive.google.com/file/d/${data?.id_file_cv}`}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
      <div className="share-copy">
        <div className="title-share  mb-2">Hoặc copy đường dẫn</div>
        <div className="box-item">
          <Input
            ref={inputRef}
            defaultValue={`https://drive.google.com/file/d/${data?.id_file_cv}`}
            prefix={
              <FontAwesomeIcon style={{ color: "#fda4c8" }} icon={faCopy} />
            }
          />
          <button onClick={handleCopy}>Copy</button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Button onClick={showModal}>Xem CV</Button>

      <Modal
        title="Cv Ứng Viên"
        open={isModalOpen}
        className="model-view-cv reset-button-employer"
        onOk={handleCancel}
        onCancel={handleCancel}
        width={1200}
        height={700}
        okText="Hoàn Thành"
        footer={[
          <Button key="submit" type="primary" onClick={handleCancel}>
            Đã xem
          </Button>,
        ]}
        style={{
          top: "70px",
        }}
      >
        <div className="full-info">
          <div
            className="view-cv"
            style={{ width: "100%", height: loadingCv ? "680px" : "100%" }}
          >
            <Spin
              indicator={
                <img
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                  src={catLoading}
                />
              }
              spinning={loadingCv}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {linkPdf && (
                <Worker
                  style={{ width: "100%", height: "750px" }}
                  workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
                >
                  <Viewer
                    style={{ width: "100%", height: "750px" }}
                    defaultScale={1.2}
                    onDocumentLoad={handleDocumentLoad}
                    fileUrl={linkPdf}
                  />
                </Worker>
              )}
            </Spin>
          </div>
          <div className="info-user">
            <div className="head">
              <div className="logo">GNOUD</div>
            </div>
            <div className="body-user">
              <div className="info  mb-2">
                <div className="avatar">
                  <img src={data?.idUser?.avatar} alt="avatar2" />
                </div>
                <div className="content">
                  <div className="name">{data?.idUser?.fullName}</div>
                  <div className="contact">
                    <a href={`mailto:${data?.email}`} className="email-cv mb-1">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span>{data?.email}</span>
                    </a>
                    <a href={`tel:${data.phone}`} className="phone-cv">
                      <FontAwesomeIcon icon={faPhone} />
                      {data?.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="status-cv mb-2">
                <div className="status-cv-c mb-2">Trạng thái CV</div>
                <table>
                  <tbody>
                    <tr>
                      <th>Trạng thái</th>
                      <th>
                        {data?.status === "pending" && (
                          <Tag icon={<SyncOutlined spin />} color="warning">
                            Đang chờ duyệt
                          </Tag>
                        )}
                        {data?.status === "refuse" && (
                          <Tag icon={<CloseCircleOutlined />} color="error">
                            Đã từ chối
                          </Tag>
                        )}
                        {data?.status === "success" && (
                          <Tag icon={<CheckCircleOutlined />} color="success">
                            Đã phê duyệt
                          </Tag>
                        )}
                      </th>
                    </tr>
                    <tr>
                      <th>Nguồn</th>
                      <th>Tìm việc</th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="introducing-letter mb-2">
                <div className="status-cv-c ">Thư giới thiệu</div>
                <ModalIntroducingLetter data={data} />
              </div>
              <hr />
              <div className="box-button">
                <div className="change-status mb-2">
                  <button>Đổi trạng thái CV</button>
                </div>
                <div className="box-cv">
                  <Popover
                    content={content}
                    title="Chia sẻ liên kết"
                    trigger="click"
                  >
                    <button>Chia sẻ CV</button>
                  </Popover>

                  <button>
                    {" "}
                    <a
                      href={linkPdf}
                      download={`CV-${data?.fullName}-${data?.email}.pdf`}
                    >
                      Tải CV PDF
                    </a>
                  </button>
                </div>
              </div>
              <hr />
              <div className="info-job">
                <div className="status-cv-c mb-1">Chiến dịch</div>
                <div className="id-job mb-1" title={dataFull?._id}>
                  <span>#{dataFull?._id}</span>{" "}
                </div>
                <div className="title-job">
                  <span title={dataFull?.title}>{dataFull?.title}</span>
                </div>
              </div>
              <hr />
              <div className="info-contact-job">
                <div className="status-cv-c mb-2">
                  Thông tin liên hệ công việc
                </div>
                <div className="content">
                  <div className="email-content mb-2">
                    <div className="box-tag">
                      <FontAwesomeIcon icon={faGoogle} />
                      <span>{dataFull?.email}</span>
                    </div>
                  </div>
                  <div className="phone-content">
                    <div className="box-tag">
                      <FontAwesomeIcon icon={faMobileScreen} />
                      <span>{dataFull?.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
const MemoizedModelViewCv = memo(ModelViewCv);
export default MemoizedModelViewCv;
