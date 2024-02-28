import { Checkbox, Col, Form, Row, Spin } from "antd";
import NotifyClient from "../../../components/clients/notify";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import "./emailSuggestions.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { emailCheckOne, emailCheckTwo } from "./js/options";
import { changeEmailSuggestions } from "../../../services/clients/user-userApi";
import { UpdateDataAuthClient } from "../../../update-data-reducer/clients/updateDataClient";
import { useDispatch, useSelector } from "react-redux";
function EmailSuggestions() {
  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );
  
  const emailCheckOneValues = useMemo(
    () => new Set(emailCheckOne.map((element) => element.value)),
    [emailCheckOne]
  );
  const emailCheckTwoValues = useMemo(
    () => new Set(emailCheckTwo.map((element) => element.value)),
    [emailCheckTwo]
  );
  useEffect(() => {
    //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
    const { infoUser } = authenMainClient;
    const checkBoxOne = infoUser?.emailSuggestions?.filter((item) =>
      emailCheckOneValues.has(item)
    );
    const checkBoxTwo = infoUser?.emailSuggestions?.filter((item) =>
      emailCheckTwoValues.has(item)
    );
    form.setFieldsValue({
      ["email-check-one"]: checkBoxOne,
      ["email-check-two"]: checkBoxTwo,
    });
  }, [authenMainClient]);

  const handleForm = async (valueForm) => {
    try {
      setLoading(true);
      const emailCheck = valueForm["email-check-one"].concat(
        valueForm["email-check-two"]
      );
      const result = await changeEmailSuggestions({ emailCheck });
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
          <h1>Cài đặt kênh thông báo qua email</h1>
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
            <div className="box-sub">
              Đánh dấu <FontAwesomeIcon icon={faCheck} /> vào những lựa chọn bạn
              muốn nhận thông báo từ hệ thống
            </div>
            <Form layout="vertical" form={form} onFinish={handleForm}>
              <Form.Item
                label="1. Email Thông báo từ hệ thống"
                name="email-check-one"
              >
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    {emailCheckOne.map((item, index) => (
                      <Col key={index} span={24}>
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                label="2. Email Nhận cơ hội việc làm"
                name="email-check-two"
              >
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    {emailCheckTwo.map((item, index) => (
                      <Col key={index} span={24}>
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
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
export default EmailSuggestions;
