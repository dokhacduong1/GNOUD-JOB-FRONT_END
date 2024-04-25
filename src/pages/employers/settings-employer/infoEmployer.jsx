import { memo, useCallback, useEffect, useState } from "react";
import ModelChangeImage from "../../../child-element/employers/settings-account/model-change-image";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, message } from "antd";
import { dataLevel } from "./js/options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { phoneCheck } from "../../admins/addJobs/js/validate";
import { Link } from "react-router-dom";
import { changeInfoEmployer } from "../../../services/employers/employer-userApi";
import { UpdateDataAuthEmployer } from "../../../update-data-reducer/employers/updateDataEmployers";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import icon_A from "./images/icon.png";
import icon_B from "./images/icon-2.png";
const genderOK = [
  {
    label: "Nam",
    value: "Nam",
  },
  {
    label: "Nữ",
    value: "Nữ",
  },
];
function InfoEmployer() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const authenMainEmployer = useSelector(
    (status) => status.authenticationReducerEmployer
  );
  const [infoUserEmployer, setInfoUserEmployer] = useState({});
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (authenMainEmployer?.status === true) {
      const { infoUserEmployer } = authenMainEmployer;

      form.setFieldsValue(infoUserEmployer);
      setAvatar(infoUserEmployer.image);
      setInfoUserEmployer(infoUserEmployer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenMainEmployer]);

  const handleForm = useCallback(async (values) => {
    try {
      const result = await changeInfoEmployer(values);
      if (result.code === 200) {
        messageApi.open({
          type: "success",
          content: result.success,
          icon: (
            <span className="icon-message-employer-success">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ),
        });
        UpdateDataAuthEmployer(dispatch);
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
    } catch (error) {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {contextHolder}
      {authenMainEmployer.status === true && (
        <>
          <div className="card-employer">
            <div className="demo-employer card-setting-form-employer card-body-employer">
              <div className="title-settings mb-3">
                
                Tài khoản xác thực:{" "}
                <strong style={{ color: "rgb(253, 109, 166)" }}>Cấp {infoUserEmployer?.countActive}/2</strong>
              </div>
              <div className="demo-employer__body">
                <div className="box-item">
                  <div className="icon">
                    <img src={icon_A} alt="icon" />
                  </div>
                  <div className="text">
                    Tài khoản quý khách đang đạt:{" "}
                    <strong style={{ color: "rgb(253, 109, 166)" }}>
                      Cấp {infoUserEmployer?.countActive}/2
                    </strong>
                  </div>
                </div>
                <div className="box-item">
                  <div className="icon">
                    <img src={icon_B} alt="icon" />
                  </div>
                  <div className="text">
                    Quyền lợi: Tận hưởng nhiều{" "}
                    <strong style={{ color: "rgb(253, 109, 166)" }}>
                      đặc quyền
                    </strong>{" "}
                    khi xác thực tài khoản.
                  </div>
                </div>
              </div>
              <div className="demo-employer__footer">
                <button className="button-left  button-all">
                  Cập nhật thông tin xác thực
                </button>
                <button className="button-right button-all">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
            <div className="info-employer card-setting-form-employer card-body-employer">
              <div className="title-settings mb-3">
                Cập nhật thông tin cá nhân
              </div>
              <div className="box-settings">
                <div className="row align-items-center justify-content-between">
                  <div className="col-6">
                    <div className="box-avatar">
                      <label>Avatar</label>
                      <img src={avatar} alt="avatar" />
                      <button>
                        <ModelChangeImage avatar={avatar} />
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="box-email">
                      <label>Email: {infoUserEmployer?.email}</label>
                    </div>
                  </div>
                </div>
                <div className="form-settings-employer mt-3">
                  <Form
                    onFinish={handleForm}
                    form={form}
                    layout="vertical"
                    className="row"
                  >
                    <Form.Item
                      className="col-6"
                      label="Họ và tên"
                      name="fullName"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ tên!" },
                      ]}
                    >
                      <Input style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      className="col-6"
                      label="Giới tính"
                      name="gender"
                    >
                      <Select
                        options={genderOK}
                        style={{ width: "100%" }}
                        dropdownRender={(menu) => {
                          return (
                            <>
                              <div className="search-custom-info-company">
                                <span className="item">{menu}</span>
                              </div>
                            </>
                          );
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="col-6"
                      label={
                        <div className="box-phone">
                          <label>Số điện thoại</label>
                          {infoUserEmployer?.activePhone === false && (
                            <div className="verify">
                              <Link to={"../account/phone-verify"}>
                                Cập nhật
                              </Link>
                              <Link to={"../account/phone-verify"}>
                                Xác thực
                              </Link>
                            </div>
                          )}
                        </div>
                      }
                      name="phoneNumber"
                      rules={[
                        {
                          validator: async (_, value) => {
                            await phoneCheck(value);
                          },
                        },
                      ]}
                    >
                      <Input disabled style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      className="col-6"
                      label="Vị trí"
                      name="level"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn vị trí làm việc!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn vị trí công tác của bạn"
                        options={dataLevel}
                        dropdownRender={(menu) => {
                          return (
                            <>
                              <div className="search-custom-info-company">
                                <span className="item">{menu}</span>
                              </div>
                            </>
                          );
                        }}
                      />
                    </Form.Item>
                    <hr />
                    <div className="mb-3" style={{ fontWeight: "650" }}>
                      Thông tin thêm
                    </div>
                    <Form.Item
                      label="Linkedin"
                      name="linkedin"
                      className="col-12"
                    >
                      <Input
                        size="large"
                        placeholder="Nhập địa chỉ linkedin của bạn"
                        prefix={
                          <FontAwesomeIcon
                            icon={faLinkedin}
                            style={{ padding: "0 10px 0 0" }}
                          />
                        }
                      />
                    </Form.Item>
                    <Form.Item className="col-12 button-v">
                      <button className="button-submit" type="submit">
                        Lưu thông tin
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const MemoizedInfoEmployer = memo(InfoEmployer);
export default MemoizedInfoEmployer;
