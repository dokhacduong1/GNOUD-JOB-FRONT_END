import {  Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import NotifyClient from "../../../components/clients/notify";
import {

  faInfo,
  faMobileScreenButton,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeInfoUser } from "../../../services/clients/user-userApi";
import { UpdateDataAuthClient } from "../../../update-data-reducer/clients/updateDataClient";

function InfoUserClient() {
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );

  useEffect(() => {
    //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
    const { infoUser } = authenMainClient;

    form.setFieldsValue({
      fullName: infoUser?.fullName,
      email: infoUser?.email,
      phone: infoUser?.phone,
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenMainClient]);

  const handleForm = async (valueForm) => {
    try {
      setLoading(true);
      const fullName = valueForm.fullName;
      const phone = valueForm.phone;
      if (fullName === "" || phone === "") {
        setMessage("Vui lòng nhập đầy đủ thông tin!");
        setNoti(false);
        return;
      }
      const result = await changeInfoUser(valueForm);
      if (result.code === 200) {
        await UpdateDataAuthClient(dispatch);
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
          <h1>Cài đặt thông tin cá nhân</h1>
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
            <Form layout="vertical" onFinish={handleForm} form={form}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ tên!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <FontAwesomeIcon
                      style={{ padding: "0 10px 0 0" }}
                      icon={faInfo}
                    />
                  }
                />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input
                  prefix={
                    <FontAwesomeIcon
                      style={{ padding: "0 10px 0 0" }}
                      icon={faMobileScreenButton}
                    />
                  }
                />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}>
                <Input
                  type="email"
                  disabled
                  prefix={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ padding: "0 10px 0 0" }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item>
                <button className="button-submit" type="submit">
                  Đổi thông tin
                </button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}
export default InfoUserClient;
