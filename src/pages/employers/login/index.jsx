import { Form, Input, Spin } from "antd";
import { KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./login.scss";

import banner from "./images/banner.png";
import { Link } from "react-router-dom";

import { useState } from "react";
import NotifyClient from "../../../components/clients/notify";
import Cookies from "js-cookie";
import { loginUserEmployer } from "../../../services/employers/employer-userApi";
function LoginEmployers() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const handleForm = async (valueForm) => {
    try {
      setLoading(true);
      const result = await loginUserEmployer(valueForm);
      if (result.code === 200) {
        Cookies.set("token-employer", result.token, { expires: 3 }); // expires: số ngày cookie sẽ hết hạn
        
        window.location.href = "/nha-tuyen-dung/app/dashboard";
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
      <div className="employers-login">
        <div className="row  align-items-center">
          <div className="col-7">
            <div className="employers-login__form content-container">
              <h2 className="title">Chào mừng bạn quay trở lại</h2>
              <p className="description">
                Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công
                nghệ mới
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
                      autoComplete="off"
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
                  
                      autoComplete="off"
                      prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                    />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "right" }}>
                    <Link
                      to={"/nha-tuyen-dung/forgot-password"}
                      style={{ color: "rgb(233 98 152)" }}
                      href=""
                    >
                      Quên mật khẩu
                    </Link>
                  </Form.Item>

                  <Form.Item className="mb-4">
                    <button className="button-submit" type="submit">
                      Đăng nhập
                    </button>
                  </Form.Item>
                </Form>
              </Spin>

              <div className="box-register">
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to={"/nha-tuyen-dung/register"}
                    style={{ color: "rgb(233 98 152)" }}
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
              <hr />
            </div>
          </div>
          <div className="col-5">
            <div className="sticky-item-ok">
              <div className="employer-login__image sitcky-item">
                <img src={banner} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginEmployers;
