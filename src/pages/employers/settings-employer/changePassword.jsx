import { Checkbox, Form, Input, Spin, message } from "antd";
import { KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { changePasswordEmployer } from "../../../services/employers/employer-userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleForm = async (valueForm) => {
    try {
    setLoading(true);
      const result = await changePasswordEmployer(valueForm);
      if (result.code === 200) {
        if (result.tokenNew !== "") {
          Cookies.set("token-employer", result.tokenNew, { expires: 3 });
        }
        messageApi.open({
          type: "success",
          content: result.success,
          icon: (
            <span className="icon-message-employer-success">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ),
        });
        
      } else {
        messageApi.open({
          type: "error",
          content: result.error,
          icon: (
            <span className="icon-message-employer-error">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ),
        });
        
      }
      setLoading(false);
    } catch (error) {
        setLoading(false);
      messageApi.open({
        type: "error",
        content: "Lỗi không xác định",
        icon: (
          <span className="icon-message-employer-error">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        ),
      });
    }
  };
  return (
    <>
     <div className="pd-title title-settings ">Thay đổi mật khẩu</div>
    <div className="card-employer">
      {contextHolder}
      <div className="password-employer card-setting-form-employer card-body-employer">
       
        <div className="form-change-password">
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
            <Form onFinish={handleForm}>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                />
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu"
                name="reEnterPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                />
              </Form.Item>

              <Form.Item name="accept" valuePropName="checked">
                <Checkbox>Đăng xuất ra khỏi thiết bị khác</Checkbox>
              </Form.Item>
              <Form.Item>
                <button className="button-submit" type="submit">
                  Cập Nhật
                </button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
    </>
    
  );
}
export default ChangePassword;
