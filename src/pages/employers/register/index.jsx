import { Checkbox, Form, Input, Radio, Select, Spin } from "antd";
import { KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  faBuilding,
  faEnvelope,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./register.scss";

import banner from "./images/banner.png";
import { Link } from "react-router-dom";
import {
  getCityApiDuong,
  getDistrictApiDuong,
} from "../../../services/clients/user-userApi";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NotifyClient from "../../../components/clients/notify";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { dataLevel } from "./js/options";
import { removeAccents } from "../../../helpers/removeAccents";
import { phoneCheck } from "../../admins/addJobs/js/validate";
import { registerUserEmployer } from "../../../services/employers/employer-userApi";

function RegisterEmployers() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const [city, setCity] = useState([]);

  const [district, setDistrict] = useState([]);
  const [form] = Form.useForm();
  const handleForm = async (valueForm) => {
    try {
      if (valueForm.accept === false) {
        setMessage("Vui lòng đọc và đồng ý với điều khoản của chúng tôi!");
        setNoti(false);
        return;
      }
      if (valueForm.password !== valueForm.reEnterPassword) {
        setMessage("Mật khẩu không khớp!");
        setNoti(false);
        return;
      }
      setLoading(true);
      valueForm.gender = valueForm.gender === 1 ? "Nam" : "Nữ";
      const city = valueForm.city.split("/")[1];
      const district = valueForm.district.split("/")[1];
      valueForm.address = {
        city,
        district,
      };
      const result = await registerUserEmployer(valueForm);
      if (result.code === 200) {
        Cookies.set("token-employer", result.token, { expires: 3 }); // expires: số ngày cookie sẽ hết hạn
        setMessage(result.success);
        setNoti(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          window.location.href = "/nha-tuyen-dung/app/dashboard";
        }, 1000);
      } else {
        setMessage(result.error);
        setNoti(false);
      }
      window.scrollTo(0, 0);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchApi = async () => {
    const cityResult = await getCityApiDuong();
    if (cityResult.code === 200) {
      const convertDatCity = cityResult.data.map((item) => ({
        label: item.name,
        value: `${item.code}/${item.slug}`,
      }));

      setCity(convertDatCity);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const hanleChangeCity = async (value) => {
    const code = value.split("/")[0];
    const result = await getDistrictApiDuong(code);
    if (result.code === 200) {
      const convertDataDistrict = result.data.map((item) => ({
        label: item.name,
        value: `${item.code}/${item.slug}`,
      }));
      form.setFieldsValue({ district: convertDataDistrict[0].value });
      setDistrict(convertDataDistrict);
    } else {
      form.setFieldsValue({ district: "" });
      setDistrict([]);
    }
  };
  return (
    <>
      <div className="employer-login  ">
        <div className="row ">
          <div className="col-7 ">
            <div className="employer-login__form content-container">
              <h2 className="title">Đăng ký tài khoản cho Nhà tuyển dụng</h2>
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
                  <span style={{ color: "#FDA4C8", fontSize: "20px" }}>
                    Vui Lòng Đợi...
                  </span>
                }
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 36,
                      color: "#FDA4C8",
                    }}
                    spin
                  />
                }
              >
                <Form form={form} layout="vertical" onFinish={handleForm}>
                  <div className="title-head">Tài khoản</div>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập email của bạn"
                      prefix={
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ padding: "0 10px 0 0" }}
                        />
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    placeholder="Nhập mật khẩu của bạn"
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
                      placeholder="Nhập mật khẩu của bạn"
                      prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Nhập lại mật khẩu"
                    name="reEnterPassword"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Nhập lại mật khẩu của bạn"
                      prefix={<KeyOutlined style={{ padding: "0 10px 0 0" }} />}
                    />
                  </Form.Item>
                  <div className="title-head mt-4">
                    Thông tin nhà tuyển dụng
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <Form.Item
                      className="col-5 "
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
                        placeholder="Nhập họ tên của bạn"
                        prefix={
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ padding: "0 10px 0 0" }}
                          />
                        }
                      />
                    </Form.Item>
                    <div className="empy col-2"></div>
                    <Form.Item
                      className="col-5"
                      label="Giới tính"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn giới tính!",
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value={1}>Nam</Radio>
                        <Radio value={2}>Nữ</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Số điện thoại cá nhân"
                    name="phoneNumber"
                    rules={[
                      {
                        validator: async (_, value) => {
                          await phoneCheck(value);
                        },
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập số điện thoại của bạn"
                      prefix={
                        <FontAwesomeIcon
                          icon={faPhone}
                          style={{ padding: "0 10px 0 0" }}
                        />
                      }
                    />
                  </Form.Item>
                  <div className="row justify-content-between align-items-center">
                    <Form.Item
                      className="col-5"
                      label="Công ty"
                      name="companyName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên công ty!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập tên công ty của bạn"
                        prefix={
                          <FontAwesomeIcon
                            icon={faBuilding}
                            style={{ padding: "0 10px 0 0" }}
                          />
                        }
                      />
                    </Form.Item>
                    <div className="empy col-2"></div>
                    <Form.Item
                      className="col-5"
                      label="Vị trí công tác"
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
                        size="large"
                      />
                    </Form.Item>
                  </div>
                  <div className="row justify-content-between align-items-center">
                    <Form.Item
                      className="col-5"
                      label="Địa điểm làm việc"
                      name="city"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn thành phố!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        filterOption={(input, option) =>
                          removeAccents(option.label)
                            .toLowerCase()
                            .includes(removeAccents(input).toLowerCase()) ||
                          removeAccents(option.value)
                            .toLowerCase()
                            .includes(removeAccents(input).toLowerCase())
                        }
                        placeholder="Chọn thành phố của bạn"
                        onChange={hanleChangeCity}
                        options={city}
                        size="large"
                      />
                    </Form.Item>
                    <div className="empy col-2"></div>
                    <Form.Item
                      placeholder="Chọn quận/huyện của bạn"
                      className="col-5"
                      label="Quận/huyện"
                      name="district"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập quận huyện!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        filterOption={(input, option) =>
                          removeAccents(option.label)
                            .toLowerCase()
                            .includes(removeAccents(input).toLowerCase()) ||
                          removeAccents(option.value)
                            .toLowerCase()
                            .includes(removeAccents(input).toLowerCase())
                        }
                        disabled={district.length <= 0}
                        options={district}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                  <Form.Item label="Linkedin" name="linkedin">
                    <Input
                      placeholder="Nhập địa chỉ linkedin của bạn"
                      prefix={
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          style={{ padding: "0 10px 0 0" }}
                        />
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    className="mt-4"
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
                      <span style={{ color: "rgb(233 98 152)" }}>
                        Điều khoản dịch vụ
                      </span>{" "}
                      và{" "}
                      <span style={{ color: "rgb(233 98 152)" }}>
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

              <div className="box-register">
                <p>
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to={"/nha-tuyen-dung/login"}
                    style={{ color: "rgb(233 98 152)" }}
                  >
                    Đăng nhập ngay
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
export default RegisterEmployers;
