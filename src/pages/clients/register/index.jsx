import { Checkbox, Form, Input, Spin } from "antd";
import { KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import "./register.scss";

import banner from "./images/banner.png";
import { Link } from "react-router-dom";
import { registerUser } from "../../../services/clients/user-userApi";
import { useState } from "react";
import Cookies from "js-cookie";
import NotifyClient from "../../../components/clients/notify";
function Register() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const handleForm = async (valueForm) => {
    try {
        setLoading(true);
      if (!valueForm.accept) {
        setMessage("Vui lòng đọc điều khoản");
        setNoti(false);
        return;
      }
      const result = await registerUser(valueForm);
      if (result.code === 200) {
        Cookies.set('token-user', result.token, { expires: 3 }); // expires: số ngày cookie sẽ hết hạn
        setMessage(result.success);
        setNoti(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        setMessage(result.error);
        setNoti(false);
      }
      setLoading(false);
    } catch (error) {
      setMessage("Lỗi rồi");
      setNoti(false);
    }
  };
  return (
    <>

      <div className="cb-section client-login">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <div className="client-login__form">
                <h2 className="title">
                  Chào mừng bạn đến với thế giới việc làm
                </h2>
                <p className="description">
                  Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự
                  nghiệp lý tưởng
                </p>
                {message !== "" && (
                  <NotifyClient noti={noti}>{message}</NotifyClient>
                )}
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
                      label="Họ và tên"
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ và tên!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ padding: "0 10px 0 0" }}
                          />
                        }
                      />
                    </Form.Item>
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

                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <KeyOutlined style={{ padding: "0 10px 0 0" }} />
                        }
                      />
                    </Form.Item>
                    
                    <Form.Item
                      name="accept"
                      valuePropName="checked"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng đọc điều khoản!",
                        },
                      ]}
                    >
                      <Checkbox>
                        Tôi đã đọc và đồng ý{" "}
                        <span style={{ color: "#25a6dd" }}>
                          Điều khoản dịch vụ
                        </span>{" "}
                        và{" "}
                        <span style={{ color: "#25a6dd" }}>
                          Chính sách bảo mật
                        </span>{" "}
                        của GNOUD
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <button className="button-submit" type="submit">
                        Đăng ký
                      </button>
                    </Form.Item>
                  </Form>
                </Spin>

                <p className="flast-login">Hoặc đăng nhập bằng</p>
                <div className="box-flast-login">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon google">
                        <FontAwesomeIcon icon={faGoogle} />
                        <span>Google</span>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="box-icon facebook">
                        <FontAwesomeIcon icon={faFacebookF} />
                        <span>Facebook</span>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="box-icon linkedin">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                        <span>Linkedin</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-register">
                  <p>
                    Bạn đã có tài khoản?{" "}
                    <Link to={"/login"} style={{ color: "#25a6dd" }}>
                      Đăng nhập ngay
                    </Link>
                  </p>
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
export default Register;
