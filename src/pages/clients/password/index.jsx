import { Checkbox, Form, Input, Spin } from "antd";
import { KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import "./password.scss";
import Cookies from "js-cookie";
import { useState } from "react";
import NotifyClient from "../../../components/clients/notify";
import { changePassword } from "../../../services/clients/user-userApi";

function PasswordClient() {
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleForm = async (valueForm) => {

    try {
      setLoading(true);
      const newPassword = valueForm.newPassword;
      const reEnterPassword = valueForm.reEnterPassword;
      if (newPassword !== reEnterPassword) {
        setMessage("Mật khẩu mới không khớp!");
        setNoti(false);
        return;
      }

      const result = await changePassword(valueForm);

      if (result.code === 200) {
        if(result.tokenNew !== ""){
          Cookies.set("token-user", result.tokenNew, { expires: 3 });
     
        }
        setMessage(result.success);
        setNoti(true);
      } else {
        setMessage(result.error);
        setNoti(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setMessage("Lỗi server. Vui lòng thử lại sau!");
      setNoti(false);
     
    }
  };
  return (
    <div className="col-8 ">
      <div className="box-settings-info">
        <div className="box-settings-info__title">
          <h1>Thay đổi mật khẩu</h1>
        </div>
        {message !== "" && <NotifyClient noti={noti}>{message}</NotifyClient>}
        <div className="box-settings-info__form">
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
                label="Mật khẩu hiện tại"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu hiện tại!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                />
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="reEnterPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lại mật khẩu mới!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                />
              </Form.Item>
              <Form.Item name="accept" valuePropName="checked">
                <Checkbox>Đăng xuất ra khỏi thiết bị khác</Checkbox>
              </Form.Item>
              <Form.Item>
                <button className="button-submit" type="submit">
                  Đổi mật khẩu
                </button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}
export default PasswordClient;
