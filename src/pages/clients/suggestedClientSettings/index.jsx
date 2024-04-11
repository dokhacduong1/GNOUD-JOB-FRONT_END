import { DatePicker, Form, Radio, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";
import NotifyClient from "../../../components/clients/notify";
import { faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";
import { optionsSalary, optionsYearsOfExperience } from "./js/options";

import { fetchApi, loadApi } from "./js/fetchApi";
import { removeAccents } from "../../../helpers/removeAccents";
import banner from "./images/banner.png";
import { changeJobSuggestions } from "../../../services/clients/user-userApi";

import { UpdateDataAuthClient } from "../../../update-data-reducer/clients/updateDataClient";
import moment from "moment";
function SuggestedClientSettings() {
  const [message, setMessage] = useState("");
  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);
  const [jobCategoires, setJobCategories] = useState([]);
  const [skill, setSkill] = useState([]);
  const [jobPosition, setJobPosition] = useState([]);
  const [text, setText] = useState("");

  const MAX_COUNT = 5;

  const [contentSelect, setContentSelect] = useState(
    "Vui lòng nhập tối thiểu 2 ký tự để tìm kiếm!"
  );
  const dispatch = useDispatch();
  const [valueDebounce] = useDebounce(text, 300);
  const [form] = Form.useForm();

  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );

  useEffect(() => {
    fetchApi(setCity, setSkill, setJobCategories);
    //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
    const { infoUser } = authenMainClient;
    //Nếu đã đăng nhập thì sẽ set giá trị mặc định cho form
    setJobPosition(infoUser?.job_position);

    const objectVlue = {
      ...infoUser,
      job_position: infoUser?.job_position.map((item) => item.value),
    };
    if(infoUser?.dateOfBirth){
      objectVlue.dateOfBirth = moment(infoUser?.dateOfBirth);
    }
    form.setFieldsValue(objectVlue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenMainClient]);
  useEffect(() => {
    loadApi(setJobPosition, valueDebounce);
  }, [valueDebounce]);

  const handleForm = async (valueForm) => {
    try {
   
     //Chuyển đổi thành dạng date của moment
      //Chuyển đổi thành dạng iso
      valueForm.dateOfBirth= valueForm.dateOfBirth.toISOString();
    
      setLoading(true);

      const result = await changeJobSuggestions(valueForm);
      if (result.code === 200) {
        await UpdateDataAuthClient(dispatch);
        setMessage(result.success);
        setNoti(true);
      } else if (result.code === 401) {
        setMessage(result.error);
        setNoti(false);
      } else {
        setMessage("Cập nhật thất bại!");
        setNoti(false);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setMessage("Lỗi server. Vui lòng thử lại sau!");
      setNoti(false);
    }
  };

  const changeValue = useCallback(async (input) => {
    if (input.length > 1) {
      setText(input);
    } else {
      //Nếu input nhỏ hơn 2 ký tự thì set lại giá trị rỗng
      setText("");
      //Nếu input nhỏ hơn 2 ký tự thì set lại giá trị rỗng
      setContentSelect("Vui lòng nhập tối thiểu 2 ký tự để tìm kiếm!");
    }
  }, []);

  return (
    <div className="col-8 ">
      <div className="box-settings-info">
        <div className="box-settings-info__image">
          <img src={banner} alt="banner" />
        </div>
        <div className="box-settings-info__title2">
          <h1>Vui lòng hoàn thiện các thông tin dưới đây</h1>
          <p>(*) Các thông tin dưới đây đều là bắt buộc</p>
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
              <hr />
              <div className="box-settings-info__h2">
                <FontAwesomeIcon icon={faUser} />
                <h2 className="col-6">Thông tin cá nhân</h2>
              </div>

              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={1}>Nữ</Radio>
                  <Radio value={2}>Nam</Radio>
                  <Radio value={3}>Không xác định</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày sinh",
                  },
                ]}
              >
                <DatePicker
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                />
              </Form.Item>

              <hr />

              <div className="box-settings-info__h2">
                <FontAwesomeIcon icon={faBriefcase} />
                <h2>Nhu cầu công việc</h2>
              </div>
              <Form.Item
                label="Vị trí công việc"
                name="job_position"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập vị trí công việc",
                  },
                ]}
              >
                <Select
                  maxTagCount={3}
                  maxTagTextLength={10}
                  maxCount={MAX_COUNT}
                  mode="multiple"
                  showSearch
                  onSearch={(input) => changeValue(input)}
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  placeholder="Nhập vị trí công việc"
                  size="large"
                  options={jobPosition}
                  notFoundContent={contentSelect}
                />
              </Form.Item>
              <Form.Item
                label="Ngành nghề"
                name="job_categorie_id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngành nghề",
                  },
                ]}
              >
                <Select
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  showSearch
                  placeholder="-- Chọn ngành nghề mong muốn của bạn --"
                  size="large"
                  options={jobCategoires}
                />
              </Form.Item>
              <Form.Item
                label="Kỹ năng"
                name="skill_id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn kỹ năng",
                  },
                ]}
              >
                <Select
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  mode="multiple"
                  maxTagCount={3}
                  maxTagTextLength={10}
                  maxCount={MAX_COUNT}
                  showSearch
                  placeholder="-- Chọn kỹ năng của bạn --"
                  size="large"
                  options={skill}
                />
              </Form.Item>
              <Form.Item
                label="Kinh nghiệm"
                name="yearsOfExperience"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn kinh nghiệm",
                  },
                ]}
              >
                <Select
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  showSearch
                  placeholder="-- Chọn kinh nghiệm làm việc mong muốn --"
                  size="large"
                  options={optionsYearsOfExperience}
                />
              </Form.Item>
              <Form.Item
                label="Mức lương"
                name="desiredSalary"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn mức lương",
                  },
                ]}
              >
                <Select
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  showSearch
                  placeholder="-- Chọn mức lương mong muốn --"
                  size="large"
                  options={optionsSalary}
                />
              </Form.Item>
              <Form.Item
                label="Địa điểm làm việc"
                name="workAddress"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn địa điểm làm việc",
                  },
                ]}
              >
                <Select
                  placeholder="-- Chọn địa điểm làm việc mong muốn --"
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  maxTagCount={3}
                  maxTagTextLength={10}
                  maxCount={MAX_COUNT}
                  mode="multiple"
                  showSearch
                  size="large"
                  options={city}
                />
              </Form.Item>
              <Form.Item>
                <button className="button-submit" type="submit">
                  Cập nhật
                </button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}
export default SuggestedClientSettings;
