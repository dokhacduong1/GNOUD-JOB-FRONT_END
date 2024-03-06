import { Form, Input, Modal, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./modelVerify.scss";
import {
  sendEmsPhoneEmployer,
  verifyPassword,
  verifyPhoneEmployer,
} from "../../../services/employers/employer-userApi";
import { LoadingOutlined } from "@ant-design/icons";
import FormSubmitCode from "../../../components/employers/formSubmitCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UpdateDataAuthEmployer } from "../../../update-data-reducer/employers/updateDataEmployers";
import { useDispatch } from "react-redux";
function ModelVerify({ openModel, phone, setOpen }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [veriPassword, setVeriPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(openModel);
  }, [phone, setOpen]);

  const handleCancel = () => {
    setOpen(false);
    setVeriPassword(false);
  };

  const showMessage = useCallback((type, content) => {
    messageApi.open({
      type,
      content,
      icon: (
        <span className={`icon-message-employer-${type}`}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
      ),
    });
  }, [messageApi]);

  const handleForm = async (values) => {
    setLoading(true);
    if (isSending) return;
    const result = await verifyPassword(values);
    if (result.code === 200) {
      if (isSending) return;
      const resultSendSms = await sendEmsPhoneEmployer({ phone: phone });
      if (resultSendSms.code === 200) {
        setVeriPassword(true);
      } else {
        showMessage("error", resultSendSms.error);
      }
      setLoading(false);
    } else {
      showMessage("error", result.error);
    }
  };

  const handleFormVerifycode = async (values) => {
    setLoading(true);
    const code =
      values["number-1"] +
      values["number-2"] +
      values["number-3"] +
      values["number-4"] +
      values["number-5"] +
      values["number-6"];
    if (isSending) return;
    setIsSending(true);
    const result = await verifyPhoneEmployer({ code: code, phone: phone });
    setIsSending(false);
    if (result.code === 200) {
      showMessage("success", result.success);
      UpdateDataAuthEmployer(dispatch);
      setOpen(false);
      setVeriPassword(false);
    } else {
      showMessage("error", result.error);
    }
    setLoading(false);
  };

  const handleSendSmsAgain = async () => {
    if (isSending) return;
    setIsSending(true);
    const result = await sendEmsPhoneEmployer({ phone: phone });
    setIsSending(false);
    if (result.code === 200) {
      showMessage("success", result.success);
    } else {
      showMessage("error", result.error);
    }
  };
  return (
    <>
      {contextHolder}
      {veriPassword ? (
        <>
          <Modal
            width={500}
            open={openModel}
            footer={null}
            maskClosable={false}
            onCancel={handleCancel}
            className="model-verify"
          >
            <div className="model-verify__password">
              <div className="heading mb-4">
                <h5>Xác thực số điện thoại</h5>
              </div>
              <div className="desc mb-4">
                <p>
                  Mã OTP đã gữi về số điện thoại {phone} <br />
                  Vui lòng nhập mã vào ô bên dưới để được xác thực số điện
                  thoại.
                </p>
              </div>
              <div className="form-verify">
                <Spin
                  spinning={loading}
                  size="large"
                  tip={
                    <span style={{ color: "#fda4c8", fontSize: "20px" }}>
                      Vui Lòng Đợi...
                    </span>
                  }
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 36,
                        color: "#fda4c8",
                      }}
                      spin
                    />
                  }
                >
                  <FormSubmitCode
                    handleForm={handleFormVerifycode}
                    handleCancel={handleCancel}
                  />
                </Spin>
              </div>
              <div className="send-again">
                <p>
                  Bạn chưa nhận được mã OTP ?{" "}
                  {isSending ? (
                    <span style={{ color: "#fda4c8" }}>Đang gửi mã...</span>
                  ) : (
                    <span
                      onClick={handleSendSmsAgain}
                      style={{ color: "#fda4c8", cursor: "pointer" }}
                    >
                      <strong>Gửi lại mã</strong>
                    </span>
                  )}
                </p>
              </div>
              <hr />
              <div className="box-contact">
                <div>
                  Mọi thắc mắc xin liên hệ Phòng Vận hành Dịch vụ để được hỗ
                  trợ:
                </div>
                <ul>
                  <li>Hotline CSKH: (0879) 279 678 | (0936) 944 075</li>
                  <li>Email: dokhacduong3@gmail.com</li>
                </ul>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <Modal
          width={800}
          open={openModel}
          footer={null}
          maskClosable={false}
          onCancel={handleCancel}
          className="model-verify"
        >
          <div className="model-verify__password">
            <div className="heading mb-4">
              <h5>Hãy chắc chắn bạn muốn thực hiện hàng động này</h5>
            </div>
            <div className="desc mb-4">
              <p>
                Nhằm đảm bảo an toàn cho tài khoản của bạn, <br /> vui lòng nhập
                mật khẩu tài khoản để xác nhận việc thực hiện hành động này
              </p>
            </div>
            <div className="form-verify">
              <Spin
                spinning={loading}
                size="large"
                tip={
                  <span style={{ color: "#fda4c8", fontSize: "20px" }}>
                    Vui Lòng Đợi...
                  </span>
                }
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 36,
                      color: "#fda4c8",
                    }}
                    spin
                  />
                }
              >
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  onFinish={handleForm}
                >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Mật khẩu của bạn"
                    />
                  </Form.Item>
                  <div className="button-form">
                    <div className="button-cance">
                      <button onClick={handleCancel} className="cancel-veri">
                        Hủy
                      </button>
                    </div>
                    <Form.Item>
                      <button className="submit-veri" type="submit">
                        Xác Thực
                      </button>
                    </Form.Item>
                  </div>
                </Form>
              </Spin>
            </div>
            <hr />
            <div className="box-contact">
              <div>
                Mọi thắc mắc xin liên hệ Phòng Vận hành Dịch vụ để được hỗ trợ:
              </div>
              <ul>
                <li>Hotline CSKH: (0879) 279 678 | (0936) 944 075</li>
                <li>Email: dokhacduong3@gmail.com</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
export default ModelVerify;
