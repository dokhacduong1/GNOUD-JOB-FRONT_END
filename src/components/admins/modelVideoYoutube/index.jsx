import { Modal } from "antd";
import { memo, useCallback, useEffect, useRef, useState } from "react";

//hàm kiểm tra định dạng link youtube
function validateYouTubeUrl(url) {
  const pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/watch\?v=.+/;
  return pattern.test(url);
}

function ModelVideoYoutube({ link,color="#5dcaf9" }) {
  const [validateYoutube, setValidateYoutube] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playerRef = useRef(null);
  const code = validateYoutube ? link.split("v=")[1] : "";

  const handleShowModal = useCallback(() => setIsModalOpen(true),[]);

  const handleCancel = useCallback (() => {
    if (playerRef.current && validateYoutube && code !== "") {
      playerRef.current.stopVideo();
      playerRef.current.destroy();
    }
    setIsModalOpen(false);
    setValidateYoutube(false);
  },[]);

  useEffect(() => {
    setValidateYoutube(validateYouTubeUrl(link));
    if (window.YT && isModalOpen && validateYoutube && code !== "") {
      playerRef.current = new window.YT.Player("player", {
        height: "315",
        width: "560",
        videoId: code,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isModalOpen, validateYoutube]);

  return (
    <>
      <span
        style={{
          marginLeft: "10px",
          color: color,
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={handleShowModal}
      >
        Xem Trước
      </span>
      <Modal
        style={{
          
        }}
        title="YouTube Video Player"
        width={600}
        height={400}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {validateYoutube ? (
          <div id="player"></div>
        ) : (
          <div>
            <p
              className="text-center"
              style={{ color: "red", fontSize: "30px" }}
            >
              Link Không Hợp Lệ
            </p>
            <p className="text-center" style={{ fontSize: "20px" }}>
              Vui Lòng Nhập Định Dạng Theo Mẫu Này:{" "}
              <strong>https://www.youtube.com/watch?v=code</strong>
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}


const MemoizedModelVideoYoutube = memo(ModelVideoYoutube);
export default MemoizedModelVideoYoutube;