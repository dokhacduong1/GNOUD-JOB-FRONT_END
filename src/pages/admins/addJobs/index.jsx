import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Spin,
  Tag,
  notification,
} from "antd";
import moment from "moment";
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { useCallback, useEffect, useRef, useState } from "react";
import TinyMce from "../../../components/admins/tinyEditor";

import "./addJobs.scss";
import BoxGoogleMap from "../../../components/admins/mapView/boxGoogleMap";

import { fetchApi } from "./js/fetchApi";
import ModelVideoYoutube from "../../../components/admins/modelVideoYoutube";
import { getContentTiny } from "../../../helpers/getContentTinymce";
import { phoneCheck, salaryCheck } from "./js/validate";
import TourCustom from "../../../components/admins/tourCustom";
import CheckBoxCustom from "../../../components/admins/checkBoxCustom";
import {
  dataDegree,
  dataExperience,
  dataJobType,
  dataLevel,
  dataProfileRequirement,
  dataReceiveEmail,
  dataWelfare,
} from "./js/dataAddJobs";
import { getListEmployers } from "../../../services/admins/employersApi";
import { decData } from "../../../helpers/decData";
import { createJobs } from "../../../services/admins/jobsApi";
import ModelMapAddress from "../../../components/admins/modelMapAddress";
import { useSelector } from "react-redux";
import NotFound from "../../../components/admins/notFound";
import { removeAccents } from "../../../helpers/removeAccents";

function AddJobs() {
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([0, 0]);
  const [tags, setTags] = useState([]);
  const [optionsSelectTreeJobCategories, setOptionsSelectTree] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [optionsEmployers, setOptionsEmployers] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [city, setCity] = useState([]);

  //Khai báo một biến ref để lấy dữ liệu cho tinymece
  const tinyMceRefDescription = useRef(null);
  //Lấy thông tin quyền từ store của  redux
  const userAdmin = useSelector(
    (dataCheck) => dataCheck.authenticationReducerAdmin
  );

  const tinyMceRefDetailWorkExperience = useRef(null);

  const [inputLinkYoutube, setInputLinkYoutube] = useState("");
  const [form] = Form.useForm();

  const tourData = {
    description: (
      <>
        <div>
          -Là các cụm từ xuất hiện trong hồ sơ ứng viên phù hợp cho nhu cầu
          tuyển dụng của quý công ty. <br />
          - Dựa vào resume tag name hệ thống sẽ tìm và gợi ý những hồ sơ ứng
          viên phù hợp với tag name mà quý công ty đã tạo. <br />- Lựa chọn các
          tag name phù hợp với vị trí tuyển dụng của quý công ty. <br />- Bạn
          được phép tạo tối đa 10 tag name cho một vị trí tuyển dụng.
        </div>
      </>
    ),
    title: "Resume Tag",
  };

  useEffect(() => {
    fetchApi(setOptionsSelectTree, setOptionsEmployers, setCity);
  }, []);

  const handleForm = useCallback(async (valueForm) => {
    try {
      setLoading(true);
      //Lấy thông tin từ tinymce về mô tả ngắn công việc
      if (getContentTiny(tinyMceRefDescription)) {
        valueForm.description = getContentTiny(tinyMceRefDescription);
      }
      //Lấy thông tin từ tinymce về chi tiết công việc
      if (getContentTiny(tinyMceRefDetailWorkExperience)) {
        valueForm.detailWorkExperience = getContentTiny(
          tinyMceRefDetailWorkExperience
        );
      }
      //Nếu vị trí tọa độ lớn hơn 0 thì mới gán vào
      if (location[0] > 0 && location[1] > 0) {
        valueForm.location = location;
      }
      //Nếu tags có dữ liệu thì mới gán vào
      if (tags.length > 0) {
        valueForm.listTagName = tags;
      }
      if (valueForm.city) {
        const [code, slug,name] = valueForm.city.split("&");
        valueForm.city = {
          slug: slug,
          code: parseInt(code),
          name: name
        };
      }
      valueForm.featured = valueForm.featured === "true" ? true : false;
      valueForm.end_date = valueForm.end_date.toISOString();
      //Xóa những trường không có dữ liệu
      for (const item in valueForm) {
        if (valueForm[item] === undefined) {
          delete valueForm[item];
        }
      }

      const result = await createJobs(valueForm);

      if (result.code === 201) {
        form.resetFields();
        api.success({
          message: `Success`,
          description: (
            <>
              <i>{result.success}</i>
            </>
          ),
        });
      } else {
        api.error({
          message: <span style={{ color: "red" }}>Failed</span>,
          description: (
            <>
              <i>{result.error}</i>
            </>
          ),
        });
      }
    } catch (error) {
      api.error({
        message: <span style={{ color: "red" }}>Failed</span>,
        description: (
          <>
            <i>Lỗi Gì Đó Rồi!</i>
          </>
        ),
      });
    }
    setLoading(false);
  },[]);
  //Hàm này để lấy link youtube
  const changeLinkYoutube = useCallback((value) => {
    setInputLinkYoutube(value.target.value);
  },[]);

  //Hàm này khi người dùng thêm tag thì sẽ chạy vào
  const addTag = (value) => {
    if (!tags.includes(value) && value !== "" && tags.length < 10) {
      const newTags = [...tags, value.trim()];
      setTags(newTags);
    }
    setInputValue(""); // Reset input value
  };

  //Hàm này khi người dùng xóa tag thì sẽ chạy vào
  const log = (_, __, index) => {
    const tempOne = tags.filter((item, i) => i !== index);
    setTags(tempOne);
  };
  const handleChangeCompany = useCallback(async (value) => {
    const response = await getListEmployers(value);
    if (response.code === 200) {
      const record = decData(response.data)[0];
      form.setFieldsValue({
        phone: record.phoneNumber,
        email: record.email,
      });
    }
  },[]);
  return (
    <div className={`addJobs`}>
      {userAdmin?.status &&
      userAdmin.infoUser.permissions.includes("jobs-create") === false ? (
        <NotFound />
      ) : (
        <>
          {contextHolder}
          <h2 className="title-main-admin">Thêm Công Việc</h2>
          <div className="row justify-content-center align-items-center">
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
              <Form
                layout="vertical"
                encType="multipart/form-data"
                onFinish={handleForm}
                form={form}
              >
                <Card className="card-form-admin">
                  <div
                    className="card-header-job"
                    style={{ borderBottom: "none !important" }}
                  >
                    <h2 className="title-header">
                      <strong>THÔNG TIN TUYỂN DỤNG</strong>
                    </h2>
                  </div>

                  <Form.Item
                    label="Chức Danh Tuyển Dụng"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Nhập Chức Danh Tuyển Dụng!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập tiêu đề danh mục" />
                  </Form.Item>

                  <Form.Item
                    label="Ngành Nghề"
                    name="job_categorie_id"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Ngành Nghề!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Chọn Ngành Nghề"
                      options={optionsSelectTreeJobCategories}
                    />
                  </Form.Item>

                  <Form.Item
                    className="col-4"
                    label="Tỉnh/Thành Phố"
                    name="city" // This is important
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Thành Phố!",
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
                      style={{
                        width: "100%",
                      }}
                      placeholder="Chọn địa chỉ..."
                      optionLabelProp="label"
                      options={city}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <>
                        <span>Nơi Làm Việc</span>
                        <ModelMapAddress setLocation={setLocation} />
                        {location[0] > 0 && location[1] > 0 && (
                          <p style={{ marginTop: "20px" }}>
                            <BoxGoogleMap
                              latitude={location[0]}
                              longitude={location[1]}
                            />
                          </p>
                        )}
                      </>
                    }
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Nhập Chi Tiết Địa Chỉ!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập Chi Tiết Địa Chỉ" />
                  </Form.Item>

                  <Form.Item
                    label="Công Ty"
                    name="employerId"
                    rules={[
                      {
                        required: true,
                        message: "Vui Chọn Công Ty!",
                      },
                    ]}
                  >
                    <Select
                      onChange={handleChangeCompany}
                      placeholder="Chọn Công Ty"
                      options={optionsEmployers}
                    />
                  </Form.Item>

                  <Form.Item label="Mô Tả Công Việc">
                    <TinyMce ref={tinyMceRefDescription} />
                  </Form.Item>

                  <Form.Item label="Yêu Cầu Công Việc">
                    <TinyMce ref={tinyMceRefDetailWorkExperience} />
                  </Form.Item>

                  <Form.Item
                    label={
                      <>
                        <span>Link Youtube Giới Thiệu Công Việc</span>
                        <ModelVideoYoutube link={inputLinkYoutube} />
                      </>
                    }
                    name="linkVideoAboutIntroducingJob"
                  >
                    <Input onChange={changeLinkYoutube} />
                  </Form.Item>

                  <Form.Item
                    label="Lương Tối Thiểu"
                    name="salaryMin"
                    style={{ display: "inline-block", marginRight: "10px" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui Nhập Lương!",
                      },
                      {
                        validator: async (_, value) => {
                          await salaryCheck(value);
                        },
                      },
                    ]}
                  >
                    <InputNumber min={1000000} placeholder="Tối Thiểu*" />
                  </Form.Item>

                  <Form.Item
                    label="Lương Tối Đa"
                    name="salaryMax"
                    style={{ display: "inline-block" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui Nhập Lương!",
                      },
                      {
                        validator: async (_, value) => {
                          await salaryCheck(value);
                        },
                      },
                    ]}
                  >
                    <InputNumber min={1000000} placeholder="Tối Đa*" />
                  </Form.Item>

                  <Form.Item
                    label="Hình Thức"
                    name="jobType"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Hình Thức Công Việc!",
                      },
                    ]}
                  >
                    <CheckBoxCustom data={dataJobType} col={6} />
                  </Form.Item>

                  <Form.Item
                    label="Hạn Nhận Hồ Sơ"
                    name="end_date"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Ngày Nhận Hồ Sơ!",
                      },
                    ]}
                  >
                    <DatePicker
                      disabledDate={(current) =>
                        current && current < moment().startOf("day")
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Ngôn Ngữ Trình Bày Hồ Sơ"
                    name="presentationLanguage"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Ngôn Ngữ Trình Bày Hồ Sơ!",
                      },
                    ]}
                  >
                    <CheckBoxCustom
                      data={dataProfileRequirement}
                      gutter={[20, 20]}
                      col={8}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<TourCustom tourData={tourData} />}
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Trạng Thái!",
                      },
                    ]}
                  >
                    <div>
                      <Search
                        placeholder="Tag Name..."
                        enterButton={
                          <Button
                            style={{
                              backgroundColor: "#5dcaf9",
                              borderColor: "#5dcaf9",
                              height: "39px",
                            }}
                          >
                            <span style={{ color: "white" }}>Thêm Tag</span>
                          </Button>
                        }
                        size="large"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onSearch={addTag}
                      />
                      {tags.length > 0 &&
                        tags.map((item, index) => (
                          <Tag
                            style={{ marginTop: "10px" }}
                            key={item} // Use item as key
                            closeIcon={<CloseCircleOutlined />}
                            onClose={(e) => log(e, item, index)}
                          >
                            {item}
                          </Tag>
                        ))}
                    </div>
                  </Form.Item>

                  <Form.Item
                    label="Trạng Thái"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Trạng Thái!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="active"> Hoạt Động </Radio>
                      <Radio value="inactive"> Dừng Hoạt Động </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Nổi Bật"
                    name="featured"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Nổi Bật!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="true"> Nổi Bật </Radio>
                      <Radio value="false"> Không Nổi Bật </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Card>

                <Card className="card-form-admin">
                  <div
                    className="card-header-job"
                    style={{ borderBottom: "none !important" }}
                  >
                    <h2 className="title-header">
                      <strong>PHÚC LỢI</strong>
                    </h2>
                  </div>
                  <Form.Item
                    name="welfare"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Phúc Lợi!",
                      },
                    ]}
                  >
                    <CheckBoxCustom
                      data={dataWelfare}
                      gutter={[20, 20]}
                      col={6}
                    />
                  </Form.Item>
                </Card>

                <Card className="card-form-admin">
                  <div
                    className="card-header-job"
                    style={{ borderBottom: "none !important" }}
                  >
                    <h2 className="title-header">
                      <strong>YÊU CẦU CHUNG</strong>
                    </h2>
                  </div>
                  <Form.Item
                    name="gender"
                    label="Giới Tính"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Giới Tính!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="all"> Nam/Nữ </Radio>
                      <Radio value="boy"> Nam </Radio>
                      <Radio value="girl"> Nữ </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <h3 style={{ marginBottom: "10px" }}>Tuổi</h3>
                  <Form.Item
                    name="ageMin"
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <InputNumber min={18} placeholder="Từ" />
                  </Form.Item>

                  <Form.Item name="ageMax" style={{ display: "inline-block" }}>
                    <InputNumber min={18} placeholder="Đến" />
                  </Form.Item>
                  <div className="row">
                    <Form.Item
                      name="workExperience"
                      label="Kinh Nghiệm"
                      className="col-5"
                      rules={[
                        {
                          required: true,
                          message: "Vui Lòng Chọn Kinh Nghiệm!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn Kinh Nghiệm"
                        options={dataExperience}
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="level"
                      label="Cấp Bậc"
                      className="col-4"
                      rules={[
                        {
                          required: true,
                          message: "Vui Lòng Chọn Cấp Bậc!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn Cấp Bậc"
                        options={dataLevel}
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="educationalLevel"
                      label="Bằng Cấp"
                      className="col-3"
                      rules={[
                        {
                          required: true,
                          message: "Vui Lòng Chọn Bằng Cấp!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn Bằng Cấp"
                        options={dataDegree}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Card>

                <Card className="card-form-admin">
                  <div
                    className="card-header-job"
                    style={{ borderBottom: "none !important" }}
                  >
                    <h2 className="title-header">
                      <strong>THÔNG TIN LIÊN HỆ</strong>
                    </h2>
                  </div>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Bằng Cấp!",
                      },
                    ]}
                  >
                    <Input type="email" placeholder="Nhập Email" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Số Điện Thoại"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Nhập Số Điện THoại!",
                      },
                      {
                        validator: async (_, value) => {
                          await phoneCheck(value);
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Nhập Số Điện Thoại" />
                  </Form.Item>
                  <Form.Item name="website" label="Website">
                    <Input placeholder="Nhập Website" />
                  </Form.Item>
                  <Form.Item
                    name="receiveEmail"
                    label="Nhận Nội Dung Email Ngôn Ngữ"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Chọn Ngôn Ngữ Gửi Email!",
                      },
                    ]}
                  >
                    <Select
                      options={dataReceiveEmail}
                      placeholder="Ngôn Ngữ Nhận Email"
                    />
                  </Form.Item>
                </Card>

                <div className="row justify-content-center align-items-center">
                  <Form.Item className="col-4">
                    <span
                      style={{ display: "inline-block" }}
                      onClick={() => window.scrollTo(0, 0)}
                      className="button-view-admin"
                    >
                      XEM LẠI TIN TUYỂN DỤNG
                    </span>
                  </Form.Item>
                  <Form.Item className=" col-4">
                    <button
                      className="button-submit-admin"
                      type="submit"
                      style={{ display: "inline-block" }}
                    >
                      LƯU & ĐĂNG TUYỂN
                    </button>
                  </Form.Item>
                </div>
              </Form>
            </Spin>
          </div>
        </>
      )}
    </div>
  );
}
export default AddJobs;
