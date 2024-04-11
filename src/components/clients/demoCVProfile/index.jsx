import { Button, Modal, Spin } from "antd";
import { useState } from "react";

import { convertFileCvDriverToUrl } from "../../../helpers/convertFileCvDriverToUrl";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./demoCVProfile.scss";
import catLoading from "./images/cat.gif";
import { getPdfToDriverClient } from "../../../services/clients/jobsApi";
function DemoCvProfile({ record }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkPdf, setLinkPdf] = useState("");
  const [loadingCv, setLoadingCv] = useState(true);
  const [idFilBackup, setIdFilBackup] = useState("");
  const showModal = async () => {
    setIsModalOpen(true);
    const idFile = record?.idFile || "";
    if (idFilBackup === idFile) return;
    if (idFile) {
      setIdFilBackup(idFile);
      const result = await getPdfToDriverClient({ id_file: idFile });
      if (result.code === 200) {
        const url = convertFileCvDriverToUrl(result.data);
        setLinkPdf(url);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDocumentLoad = () => {
    setLoadingCv(false);
  };
  return (
    <>
      <span onClick={showModal}>Xem CV</span>
      <Modal
        title="CV Profile"
        open={isModalOpen}
        onOk={handleCancel}
        className="model-view-cv-client"
        onCancel={handleCancel}
        width={780}
        height={700}
        footer={[
          <Button
            style={{ background: "rgb(87, 213, 252)" }}
            key="submit"
            type="primary"
            onClick={handleCancel}
          >
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
        </div>
      </Modal>
    </>
  );
}
export default DemoCvProfile;
