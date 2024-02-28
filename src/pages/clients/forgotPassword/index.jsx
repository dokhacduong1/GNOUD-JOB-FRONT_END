import { Form, Input, Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./forgotPassword.scss";

import banner from "./images/banner.png";
import { Link } from "react-router-dom";
import { forgotPasswordUser } from "../../../services/clients/user-userApi";

import { useState } from "react";

import NotifyClient from "../../../components/clients/notify";
function ForgotPassword() {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const handleForm = async (valueForm) => {
    try {
      setLoading(true);
      const result = await forgotPasswordUser(valueForm);
      if (result.code === 200) {
        setMessage(result.success);
        setNoti(true);
      } else {
        setMessage(result.error);
        setNoti(false);
      }
      setLoading(false);
    } catch (error) {
      api.error({
        message: <span style={{ color: "red" }}>Thất bại</span>,
        description: (
          <>
            <i>{"Lỗi rồi"}</i>
          </>
        ),
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="cb-section client-login">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <div className="client-login__form">
                <h2 className="title">Quên mật khẩu</h2>
                {
                    message !== "" ? <NotifyClient noti={noti}>{message}</NotifyClient> : ""
                }
              
                <Spin
                  spinning={loading}
                  size="large"
                  tip={
                    <span style={{ color: "#35b9f1", fontSize: "20px" }}>
                      Vui Lòng Đợi...
                    </span>
                  }
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 36,
                        color: "#35b9f1",
                      }}
                      spin
                    />
                  }
                >
                  <Form layout="vertical" onFinish={handleForm}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập đúng định dạng email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ padding: "0 10px 0 0" }}
                          />
                        }
                      />
                    </Form.Item>

                    <Form.Item style={{ textAlign: "left",marginTop:"30px" }}>
                      <p href="">
                        Bằng việc thực hiện đổi mật khẩu, bạn đã đồng ý với{" "}
                        <a
                          style={{
                            color: "#25a6dd",
                            textDecoration: "underline ",
                          }}
                        >
                          Điều khoản dịch vụ
                        </a>{" "}
                        và{" "}
                        <a
                          style={{
                            color: "#25a6dd",
                            textDecoration: "underline ",
                          }}
                        >
                          Chính sách bảo mật
                        </a>{" "}
                        của chúng tôi
                      </p>
                    </Form.Item>

                    <Form.Item>
                      <button className="button-submit" type="submit">
                        Khôi phục mật khẩu
                      </button>
                    </Form.Item>
                  </Form>
                </Spin>

                <div className="row align-self-center justify-content-between">
                  <Link
                    className="col-6"
                    to={"/login"}
                    style={{ color: "#25a6dd", textAlign: "left" }}
                  >
                    Quay lại đăng nhập
                  </Link>
                  <Link
                    className="col-6"
                    to={"/register"}
                    style={{ color: "#25a6dd", textAlign: "right" }}
                  >
                    Đăng ký tài khoản mới
                  </Link>
                </div>
                <hr />
                <div className="box-helper">
                  <p>Bạn gặp khó khăn khi tạo tài khoản?</p>
                  <p>
                    Vui lòng liên hệ tới số{" "}
                    <a href="tel:+84879279678" style={{ color: "#69b5d6" }}>
                      (+84) 879279678
                    </a>{" "}
                    để được hỗ trợ
                  </p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="client-login__image">
                <img src={banner} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
