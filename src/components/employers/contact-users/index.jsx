import { Form, Input,  Select } from "antd";
import "./contact-users.scss";
import image1 from "./images/image1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCity } from "../../../services/admins/headerApi";
import { messageHelp } from "./js/options";
import { phoneCheck } from "../../../pages/admins/addJobs/js/validate";
function ContactUsers() {
    const [city, setCity] = useState([]);
    const fetchApi = async () => {
      const dataCity = await getCity();
      if (dataCity.code === 200) {
        const options = dataCity.data.map((item) => {
          return {
            value: item.name,
            label: item.name,
          };
        });
        setCity(options);
      }
    }
    useEffect(() => {
      fetchApi();
    },[])
    const handleFormSubmit = (values) => {
    
    }
  return (
    <div className="contact-users row gx-0">
      <div className="box-image col-6">
        <img src={image1} alt="image-1" />
      </div>
      <div className="box-content col-6">
        <div className="form-contact">
          <div className="text-heading">Đăng ký nhận tư vấn</div>
          <Form  onFinish={handleFormSubmit} layout="vertical" name="contact-users">
            <Form.Item

              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },
              ]}
            >
              <Input prefix={<FontAwesomeIcon icon={faUser} />} size="large" placeholder="Họ và tên" />
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
              <Input prefix={<FontAwesomeIcon icon={faMobileScreenButton} />} size="large" placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input prefix={<FontAwesomeIcon icon={faEnvelope} />} size="large" placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Tỉnh/Thành phố"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thành phố",
                },
              ]}
            >
              <Select options={city} size="large"  placeholder="Chọn thành phố"/>
            </Form.Item>
            <Form.Item
              label="Nhu cầu tư vấn"
              name="message"
              rules={[
                {
                  required: true,
                  message: "Vui chọn nội dung",
                },
              ]}
            >
              <Select options={messageHelp} size="large" placeholder="Chọn nhu cầu tư vấn"/>
            </Form.Item>
            <Form.Item className="form-submit">
              <button type="submit" >
                Gửi yêu cầu tư vấn
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default ContactUsers;
