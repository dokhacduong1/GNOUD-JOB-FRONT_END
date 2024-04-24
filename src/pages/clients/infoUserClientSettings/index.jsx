import { Form, Input, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useCallback, useEffect, useState } from "react";
import NotifyClient from "../../../components/clients/notify";
import {
  faInfo,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInfoUser,
  getCityApiDuong,
  getDistrictApiDuong,
} from "../../../services/clients/user-userApi";
import { UpdateDataAuthClient } from "../../../update-data-reducer/clients/updateDataClient";
import { removeAccents } from "../../../helpers/removeAccents";
import { phoneCheck } from "../../admins/addJobs/js/validate";

function InfoUserClient() {
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [city, setCity] = useState([]);

  const [district, setDistrict] = useState([]);
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );
  const fetchApi = async () => {
    const cityResult = await getCityApiDuong();
    if (cityResult.code === 200) {
      const convertDatCity = cityResult.data.map((item) => ({
        label: item.name,
        value: `${item.code}/${item.name}`,
      }));

      setCity(convertDatCity);
    }
  };
  useEffect(() => {
    //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
    const { infoUser } = authenMainClient;
    fetchApi();
    if (infoUser?.address?.city) {
      hanleChangeCity(infoUser?.address?.city, false);
    }

    form.setFieldsValue({
      fullName: infoUser?.fullName,
      email: infoUser?.email,
      phone: infoUser?.phone,
      description: infoUser?.description,
      city: infoUser?.address?.city,
      district: infoUser?.address?.district,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenMainClient]);

  const handleForm = async (valueForm) => {
    try {
      setLoading(true);

      valueForm.address = {
        city: valueForm.city,
        district: valueForm.district,
      };

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
  const hanleChangeCity = useCallback(
    async (value, setForm = true) => {
      const code = value.split("/")[0];
      const result = await getDistrictApiDuong(code);
      if (result.code === 200) {
        const convertDataDistrict = result.data.map((item) => ({
          label: item.name,
          value: `${item.code}/${item.name}`,
        }));
        if (setForm) {
          form.setFieldsValue({ district: convertDataDistrict[0].value });
        }

        setDistrict(convertDataDistrict);
      } else {
        form.setFieldsValue({ district: "" });
        setDistrict([]);
      }
    },
    [form]
  );

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

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    validator: async (_, value) => {
                      await phoneCheck(value);
                    },
                  },
                ]}
              >
                <Input
                  prefix={
                    <FontAwesomeIcon
                      style={{ padding: "0 10px 0 0" }}
                      icon={faMobileScreenButton}
                    />
                  }
                />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
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
              <div className="row justify-content-between align-items-center">
                <Form.Item
                  className="col-6"
                  label="Địa chỉ"
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
                <Form.Item
                  placeholder="Chọn quận/huyện của bạn"
                  className="col-6"
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
              <Form.Item label="Mô tả ngắn bản thân" name="description">
                <TextArea
                  rows={4}
                    placeholder="Nhập mô tả ngắn về bản thân bạn"
                  maxLength={300}
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
