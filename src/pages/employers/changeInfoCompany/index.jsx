/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Select, Spin, message } from "antd";
import MemoizedTinyMce from "../../../components/admins/tinyEditor";
import {  useEffect, useRef, useState } from "react";
import { getContentTiny } from "../../../helpers/getContentTinymce";
import "./changeInfoCompany.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchApi } from "./js/fetchApi";
import { dataNumberOfWorkers } from "./js/options";
import { phoneCheck } from "../../admins/addJobs/js/validate";
import { removeAccents } from "../../../helpers/removeAccents";
import { useDebounce } from "use-debounce";
import { loadCity, loadCityDeletai } from "./js/loadCity";
import { useDispatch, useSelector } from "react-redux";
import { changeInfoCompany } from "../../../services/employers/employer-userApi";
import { UpdateDataAuthEmployer } from "../../../update-data-reducer/employers/updateDataEmployers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";

import { handleFileChangeCustom } from "../../../helpers/imagesHelper";
import { convertThumbUrl } from "../../../helpers/convertThumbUrl";
function ChangeInfoCompany() {
  const tinyMceRef = useRef(null);
  const [form] = Form.useForm();
  const [jobCategories, setJobCategories] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [imageLogo, setImageLogo] = useState(
    "https://res.cloudinary.com/dmmz10szo/image/upload/v1710149283/GNOUD_2_pxldrg.png"
  );

  //Đây là khai báo state địa chỉ phường/xã, quận/huyện, tỉnh/thành phố
  const [textAddres, setTextAddress] = useState("");
  const [addressCompany, setAddressCompany] = useState([]);
  const [selectAddress, setSelectAddress] = useState("");
  const [valueDebounceAddress] = useDebounce(textAddres, 300);

  //Đây là khai báo state địa chỉ chi tiết công ty
  const [textSpecificAddress, setTextSpecificAddress] = useState("");
  const [specifiAddressCompany, setSpecifiAddressCompany] = useState([]);
  const [valueDebounceSpecificAddress] = useDebounce(textSpecificAddress, 300);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const authenMainEmployer = useSelector(
    (status) => status.authenticationReducerEmployer
  );
  //gọi một lần lấy dữ liệu lĩnh vực hoạt động
  useEffect(() => {
    if (authenMainEmployer?.status) {
      const { infoUserEmployer } = authenMainEmployer;

      if (infoUserEmployer?.logoCompany) {
        setImageLogo(infoUserEmployer?.logoCompany);
      }

      if (
        typeof infoUserEmployer?.specificAddressCompany === "string" &&
        infoUserEmployer?.specificAddressCompany.includes("-")
      ) {
        infoUserEmployer.specificAddressCompany =
          infoUserEmployer.specificAddressCompany.split("-")[0];
      }

      form.setFieldsValue(infoUserEmployer);
    }
    fetchApi(setJobCategories);
  }, []);

  //Lấy địa chỉ chi tiết
  useEffect(() => {
    loadCityDeletai(
      setSpecifiAddressCompany,
      selectAddress,
      valueDebounceSpecificAddress
    );
  }, [valueDebounceSpecificAddress]);

  //Lấy địa chỉ xã/phường, quận/huyện, tỉnh/thành phố
  useEffect(() => {
    loadCity(setAddressCompany, valueDebounceAddress);
  }, [valueDebounceAddress]);

  //Đây là check người dùng ghi vào địa chỉ chi tiết
  const changeValueSpecificAddress =  (input) => {
    if (input === "") return;
    setTextSpecificAddress(input);
  };

  //Đây là check người dùng ghi vào địa chỉ xã/phường, quận/huyện, tỉnh/thành phố
  const changeValueAddress = async (input) => {
    if (input === "") return setAddressCompany([]);
    setTextAddress(input);
  };

  //Khi người dùng chọn địa chỉ xã/phường, quận/huyện, tỉnh/thành phố thì sẽ set giá trị cho selectAddress để khi người dùng ghi vào địa chỉ chi tiết thì mới lấy dữ liệu
  const handleSelectAddress = (value) => {
    setSelectAddress(value);
    setSpecifiAddressCompany([]);
    form.setFieldsValue({
      specificAddress: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  //Hàm này để lấy dữ liệu từ form
  const handleForm = async (valueForm) => {
    try {
      if (inputFile?.current?.files[0]) {
        const file = inputFile.current.files[0];
        const fileToBase64 = await handleFileChangeCustom(file);
        const base64Convert = await convertThumbUrl(fileToBase64);
        valueForm.thumbUrl = base64Convert;
      }

      setLoading(true);
      //Hàm này để lấy dữ liệu từ tinymce
      if (getContentTiny(tinyMceRef)) {
        valueForm.descriptionCompany = getContentTiny(tinyMceRef);
      }
      const result = await changeInfoCompany(valueForm);
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
        await UpdateDataAuthEmployer(dispatch);
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
  //Hàm này để mở file input lấy ảnh
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  //Hàm này để lấy ảnh từ file input show ra ngoài giao diện
  const handleFileChange = async (e) => {
    setImageLogo(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="mt-4">
      {contextHolder}
      <div className="change-info-company">
        <div className="form-info">
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
            <Form
              onFinish={handleForm}
              className="row"
              layout="vertical"
              form={form}
              name="form-info-company"
            >
              <Form.Item className="col-12 text-center ">
                <div className="upload-image-form">
                  <div className="upload-image-form__preview">
                    <img src={imageLogo} alt="logo" />

                    <div className="upload-image-form__button">
                      <a href="#!" onClick={onButtonClick}>
                        <FontAwesomeIcon icon={faCamera} />
                      </a>
                      <input
                        onChange={handleFileChange}
                        type="file"
                        id="file"
                        ref={inputFile}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                className="col-6"
                name="taxCodeCompany"
                label={
                  <>
                    Mã số thuế{" "}
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã số thuế!",
                  },
                ]}
              >
                <Input placeholder="Nhập mã số thuế" />
              </Form.Item>
              <Form.Item
                className="col-6"
                name="companyName"
                label={
                  <>
                    Tên công ty{" "}
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên công ty!",
                  },
                ]}
              >
                <Input placeholder="Nhập tên công ty" />
              </Form.Item>
              <Form.Item className="col-6" name="website" label="Website">
                <Input placeholder="Nhập website" />
              </Form.Item>
              <Form.Item
                className="col-6"
                name="activityFieldList"
                label={
                  <>
                    Lĩnh vực hoạt động{" "}
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn lĩnh vực hoạt động!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn lĩnh vực hoạt động"
                  mode="multiple"
                  showSearch
                  maxTagCount={3}
                  maxTagTextLength={10}
                  maxCount={3}
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  options={jobCategories}
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
                name="numberOfWorkers"
                label={
                  <>
                    Quy mô{" "}
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn quy mô công ty!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn quy mô công ty"
                  showSearch
                  filterOption={(input, option) =>
                    removeAccents(option.label)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase()) ||
                    removeAccents(option.value)
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  options={dataNumberOfWorkers}
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
                name="addressCompany"
                label={
                  <>
                    Tỉnh/thành phố,{""} Quận/huyện,{""} Phường/xã{" "}
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    required: true,

                    message: "Vui lòng nhập địa chỉ!",
                  },
                ]}
              >
                <Select
                  showSearch
                  onSelect={handleSelectAddress}
                  placeholder="Nhập địa chỉ công ty"
                  value={addressCompany[0]?.value || ""}
         
                  onSearch={(input) => changeValueAddress(input)}
                  options={addressCompany}
              
                />
              </Form.Item>
              <Form.Item
                className="col-6"
                name="emailCompany"
                label={
                  <>
                    Email{" "}
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input placeholder="Nhập email" type="email" />
              </Form.Item>
              <Form.Item
                className="col-6"
                name="phoneCompany"
                label={
                  <>
                    Số điện thoại{" "}
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    validator: async (_, value) => {
                      await phoneCheck(value);
                    },
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                className="col12"
                name="specificAddressCompany"
                label={
                  <>
                    Địa chỉ chi tiết
                    <strong style={{ color: "red", marginLeft: "4px" }}>
                      *
                    </strong>
                  </>
                }
                rules={[
                  {
                    required: true,

                    message: "Vui lòng nhập địa chỉ chi tiết!",
                  },
                ]}
              >
                <Select
                  size="large"
                  disabled={!selectAddress}
                  showSearch
                  placeholder="Nhập địa chỉ chi tiết công ty"
                  value={specifiAddressCompany[0]?.value || ""}
                  onSearch={(input) => changeValueSpecificAddress(input)}
                  options={specifiAddressCompany}
               
                />
              </Form.Item>
              <Form.Item
                className="col-12"
                label="Mô Tả"
                name="descriptionCompany"
              >
                <MemoizedTinyMce height={180} ref={tinyMceRef} />
              </Form.Item>

              <Form.Item>
                <button className="button-submit" type="submit">
                  Lưu
                </button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}
export default ChangeInfoCompany;
