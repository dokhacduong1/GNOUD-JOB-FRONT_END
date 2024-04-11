import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Spin,
  Tag,
} from "antd";
import TinyMce from "../../../components/admins/tinyEditor";
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { decData } from "../../../helpers/decData";
import {
  handleCancel,
  handleUpdateDataJobs,
} from "../../../helpers/modelHelper";
import "./managementJobs.scss";

import ModelMapAddress from "../../../components/admins/modelMapAddress";
import BoxGoogleMap from "../../../components/admins/mapView/boxGoogleMap";
import ModelVideoYoutube from "../../../components/admins/modelVideoYoutube";

import CheckBoxCustom from "../../../components/admins/checkBoxCustom";
import {
  dataDegree,
  dataExperience,
  dataJobType,
  dataLevel,
  dataProfileRequirement,
  dataReceiveEmail,
  dataWelfare,
} from "../addJobs/js/dataAddJobs";
import moment from "moment";
import TourCustom from "../../../components/admins/tourCustom";
import Search from "antd/es/input/Search";
import { getContentTiny } from "../../../helpers/getContentTinymce";

import { getCity } from "../../../services/admins/headerApi";
import { phoneCheck, salaryCheck } from "../../admins/addJobs/js/validate";
import { getAllJobsCategories } from "../../../services/employers/jobsCategoriesApi";
import { editJobsEmployer } from "../../../services/employers/jobsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function FormEdit(props) {
  const { record, fetchApiLoad, messageApi, dataStatus } = props;

  //Notification

  //Sate
  const [tags, setTags] = useState(record.listTagName);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(record.address.linkMap);
  const [isModal, setIsModalOpen] = useState(false);
  const [optionsSelectTreeJobCategories, setOptionsSelectTree] = useState([]);

  const [city, setCity] = useState([]);
  //Khai báo một biến ref để lấy dữ liệu cho tinymece
  const tinyMceRefDescription = useRef(null);
  const [inputLinkYoutube, setInputLinkYoutube] = useState("");
  const tinyMceRefDetailWorkExperience = useRef(null);
  //Form
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
  //Function fetch api
  const fetchApi = async () => {
    try {
      const [recordJobsCategory, recordCity] = await Promise.all([
        getAllJobsCategories(),
        getCity(),
      ]);
      //Lấy danh mục công việc
      if (recordJobsCategory.code === 200) {
        const convertData = decData(recordJobsCategory.data).map((item) => ({
          value: item._id,
          label: item.title,
        }));
        setOptionsSelectTree(convertData);
      }

      if (recordCity.code === 200) {
        const options = recordCity.data.map((item) => {
          return {
            value: `${parseInt(item.code)}&${item.slug}&${item.name}`,
            label: item.name,
          };
        });
        setCity(options);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

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

  //Function handleForm
  const handleForm = useCallback(
    async (valueForm) => {
      try {
        //Lấy ra id của record
        const id = record._id;
        //   //Khi mới chạy vào cho loading = true
        setLoading(true);
        //Hàm này để lấy dữ liệu từ tinymce
        if (getContentTiny(tinyMceRefDescription)) {
          valueForm.description = getContentTiny(tinyMceRefDescription);
        }
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
          const [code, slug, name] = valueForm.city.split("&");
          valueForm.city = {
            slug: slug,
            code: parseInt(code),
            name: name,
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

        const result = await editJobsEmployer(id, valueForm);
        if (result.code === 200) {
          form.resetFields();
          messageApi.open({
            type: "success",
            content: result.success,
            icon: (
              <span className="icon-message-employer-success">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            ),
          });
          fetchApiLoad();
          setIsModalOpen(false);
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

      // //Khi chạy xong ta cho loading = false
      setLoading(false);
    },
    [fetchApiLoad, form, location, messageApi, record._id, tags]
  );
  //Hàm này để lấy link youtube
  const changeLinkYoutube = (value) => {
    setInputLinkYoutube(value.target.value);
  };

  return (
    <>
      {dataStatus === "active" || dataStatus === "inactive" ? (
        <span
          style={{ fontWeight: "500" }}
          //Do đoạn này ta truyển form và record lên ta sẽ không cần setDefaultForm nữa vì bên handleUpdateDataJobs đã setDefaultForm rồi
          onClick={() => handleUpdateDataJobs(form, setIsModalOpen, record)}
        >
          Sửa tin tuyển dụng
        </span>
      ) : (
        <span style={{ fontWeight: "500" }}>Sửa tin tuyển dụng</span>
      )}

      <Modal
        style={{
          top: 65,
        }}
        width={"80%"}
        title="Chỉnh Công Việc"
        open={isModal}
        onCancel={() => handleCancel(form, setIsModalOpen)}
        footer={null}
      >
        <Card className="reset-button-employer">
          <div className="row justify-content-center align-items-center">
            <Spin
              spinning={loading}
              size="large"
              tip={
                <span style={{ color: "#f77bac", fontSize: "20px" }}>
                  Vui Lòng Đợi...
                </span>
              }
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 36,
                    color: "#f77bac",
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
                // initialValues={defaultValueForm}
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
                        <ModelMapAddress
                          color={"#f77bac"}
                          setLocation={setLocation}
                        />
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

                  <Form.Item name="description" label="Mô Tả Công Việc">
                    <TinyMce ref={tinyMceRefDescription} />
                  </Form.Item>

                  <Form.Item
                    name="detailWorkExperience"
                    label="Yêu Cầu Công Việc"
                  >
                    <TinyMce ref={tinyMceRefDetailWorkExperience} />
                  </Form.Item>

                  <Form.Item
                    label={
                      <>
                        <span>Link Youtube Giới Thiệu Công Việc</span>
                        <ModelVideoYoutube
                          color={"#f77bac"}
                          link={inputLinkYoutube}
                        />
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
                    label={<TourCustom color={"#f77bac"} tourData={tourData} />}
                  >
                    <div>
                      <Search
                        placeholder="Tag Name..."
                        enterButton={
                          <Button
                            style={{
                              backgroundColor: "#f77bac",
                              borderColor: "#f77bac",
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
                    <Input placeholder="Nhập Email" />
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

                <Form.Item className=" col-12">
                  <button
                    className="button-submit-admin"
                    type="submit"
                    style={{ width: "100%", background: "#f77bac" }}
                  >
                    Sửa tin tuyển dụng
                  </button>
                </Form.Item>
              </Form>
            </Spin>
          </div>
        </Card>
      </Modal>
    </>
  );
}

const MemoizedFormEdit = memo(FormEdit);
export default MemoizedFormEdit;
