import { Modal } from "antd";
import moment from "moment";
import { memo, useEffect, useState } from "react";

function ModalIntroducingLetter({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastName, setLastName] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (data) {
      const nameParts = data?.idUser?.fullName.split(" ");
      const lastName1 = nameParts
        ? nameParts[nameParts.length - 1]
        : data?.fullName;
      setLastName(lastName1);
    }
  }, [data]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>Mở thư giới thiệu</div>
      <Modal
        className="reset-button-employer"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <div className="mailbox">
          <div className="mailbox-header">
            <h2>Thư của {lastName}</h2>
          </div>
          <div className="message">
            <div className="message-header">
              <h3>Thư từ: {data?.idUser?.fullName}</h3>
              <span className="date">
                {moment(data.dateTime).format("DD MMM YYYY")}
              </span>
            </div>
            <div className="message-content">
              {data?.introducing_letter ? (
                <p style={{ whiteSpace: "pre-line" }}>
                  {data?.introducing_letter}
                </p>
              ) : (
                <p style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                  CV này chưa có thư giới thiệu
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

const MemoizedModalIntroducingLetter = memo(ModalIntroducingLetter);
export default MemoizedModalIntroducingLetter;
