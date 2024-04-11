import { memo, useCallback, useEffect, useState } from "react";
import { getPdfToDriver } from "../../../services/employers/jobsApi";
import { convertFileCvDriverToUrl } from "../../../helpers/convertFileCvDriverToUrl";
import { Spin } from "antd";
import catLoading from "./images/cat.gif";
import { Viewer, Worker } from "@react-pdf-viewer/core";

function CvProfileUser({ record, setLinkCv, linkCv }) {
  // dùng state linkCv để lưu trữ link cv cho đỡ bị render lại nhiều lần
  const [loadingCv, setLoadingCv] = useState(true);

  const fetchApi = useCallback(async () => {
    const cv = record?.cv[0] || "";
    const idFile = cv?.idFile || "";

    if (idFile && linkCv === "") {
      const result = await getPdfToDriver({ id_file: idFile });
      if (result.code === 200) {
        const url = convertFileCvDriverToUrl(result.data);
        setLinkCv(url);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkCv]);
  useEffect(() => {
    if (Object.keys(record).length > 0) {
      if (record?.cv.length > 0) {
        fetchApi();
      } else {
        setLoadingCv(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  const handleDocumentLoad = () => {
    setLoadingCv(false);
  };
  return (
    <div>
      <div className="title mb-3">CV PROFILE USER</div>
      <div
        className="model-view-cv-info model-view-cv"
        style={{ width: "100%", height: loadingCv ? "474px" : "100%" }}
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
        >
          {linkCv ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer
                defaultScale={1.2}
                onDocumentLoad={handleDocumentLoad}
                fileUrl={linkCv}
              />
            </Worker>
          ) : (
            <div>{!loadingCv && <>Người dùng chưa có CV</>}</div>
          )}
        </Spin>
      </div>
    </div>
  );
}
const MemoizedCvProfileUser = memo(CvProfileUser);
export default MemoizedCvProfileUser;
