import { faFile, faFolder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Form, Input, Modal, Spin, message } from "antd";
import { useRef, useState } from "react";
import uploadCloud from "./images/upload-cloud.webp";
import { phoneCheck } from "../../admins/addJobs/js/validate";
import { handleFileChangeCustom } from "../../../helpers/imagesHelper";
import { convertThumbUrl } from "../../../helpers/convertThumbUrl";

import { useNavigate } from "react-router-dom";
import { recruitmentJob } from "../../../services/clients/user-userApi";

function ModelJobSearch({ record, infoUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePdf, setFilePdf] = useState(null); // [1
  const [warning, setWarning] = useState(false); // [2
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false); // [3
  const refFile = useRef(null);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const naviagate = useNavigate();

  const showModal = () => {
    if (!infoUser) {
      naviagate("/login");
      return;
    }
    if (Object.keys(infoUser).length === 0) {
      naviagate("/login");
      return;
    }
    form.setFieldsValue(infoUser);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChanges = (e) => {
    if (e.target.files.length === 0) return;
    if (
      e.target.files[0].type !== "application/pdf" &&
      e.target.files[0].size > 5 * 1024 * 1024
    ) {
      setWarning(true);
      return;
    }
    setFilePdf(e.target.files[0]);
  };
  //Hàm này để mở file input lấy ảnh
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    refFile.current.click();
  };
  //Hàm này để xử lý kéo thả file vào ô input nó sẽ set file vào state chỉ một file duy nhất
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      for (var i = 0; i < 1; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();
          if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
            setFilePdf(e.dataTransfer.files[0]);
            // Note: refFile.current.files is read-only, so you can't directly assign new files to it
          } else {
            setWarning(true);
          }
        }
      }
    }
  };
  //
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleFormSubmit = async (valueForm) => {
    try {
      setLoading(true);
      if (!filePdf) {
        messageApi.open({
          type: "error",
          content: "Vui lòng chọn CV để ứng tuyển!",
        });
        setLoading(false);
        return;
      }
      if (filePdf) {
        const fileToBase64 = await handleFileChangeCustom(filePdf);

        const base64Convert = await convertThumbUrl(fileToBase64);
        valueForm.file = base64Convert;
      }
      if (record) {
        valueForm.idJob = record._id;
        valueForm.employerId = record.employerId;
      }
      
      const result = await recruitmentJob(valueForm);
      if (result.code === 201) {
        form.resetFields();
        messageApi.success({
            type: "error",
            content: result.success,
        });
      } else {
        messageApi.error({
            type: "error",
            content: result.error,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
        messageApi.error({
            type: "error",
            content: "Lỗi gì đó rồi!",
        });
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      {contextHolder}
      <button onClick={showModal}>
        <a>Nộp Đơn Ứng Tuyển</a>
      </button>
      <Modal
        open={isModalOpen}
        className="model-job-search"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={588}
      >
        <div className="box-title mb-3">
          <FontAwesomeIcon icon={faFolder} />
          <p>
            Chọn CV để ứng tuyển: <span>{record?.title}</span>{" "}
          </p>
        </div>
        <Spin spinning={loading}>
          <div className="box-upload">
            {warning && (
              <Alert
                className="mb-3"
                onClose={() => setWarning(false)}
                message="Thông báo"
                description="Bạn chỉ được upload file theo định dạng PDF và kích thước file nhỏ hơn 5MB."
                type="warning"
                showIcon
                closable
              />
            )}

            <div
              className="form-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                onChange={handleChanges}
                ref={refFile}
                type="file"
                style={{ display: "none" }}
              />
              <div className="box-css">
                <div className="headt mb-2">
                  <img src={uploadCloud} alt="upload-cloud" />
                  <span>Tải lên Cv từ máy tính, chọn kéo thả</span>
                </div>
                <div className="bodyt mb-2">
                  <span>Hỗ trợ định dạng PDF có kích thước dưới 5MB</span>
                </div>
                <div className="footert">
                  {filePdf && (
                    <div className="view-file mb-2">
                      <FontAwesomeIcon icon={faFile} />
                      <span>{filePdf?.name}</span>
                    </div>
                  )}

                  <button onClick={onButtonClick}>Chọn CV</button>
                </div>
              </div>
            </div>
            <div className="form-post">
              <div className="content">
                <span>Vui lòng nhập đầy đủ thông tin chi tiết</span>
                <span>(*) Thông tin bắt buộc</span>
              </div>
              <Form
                form={form}
                onFinish={handleFormSubmit}
                className="formjs"
                layout="vertical"
                name="basic"
              >
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
                  <Input disabled placeholder="Họ tên hiển thị với NTD" />
                </Form.Item>
                <div className="row">
                  <Form.Item
                    className="col-6"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email!",
                        type: "email",
                      },
                    ]}
                  >
                    <Input
                      type="email"
                      disabled
                      placeholder="Email hiển thị với NTD"
                    />
                  </Form.Item>
                  <Form.Item
                    className="col-6"
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
                    <Input placeholder="Số điện thoại hiển thị với NTD" />
                  </Form.Item>
                </div>
                <Form.Item label="Thư giới thiệu" name="introducing_letter">
                  <TextArea
                    rows={4}
                    placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
                  />
                </Form.Item>
                <div className="button-submito">
                  <Form.Item onClick={handleCancel}>
                    <span type="submit">Hủy</span>
                  </Form.Item>
                  <Form.Item className="">
                    <button type="submit">Nộp hồ sơ ứng tuyển</button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </Spin>

        <hr />
      </Modal>
    </div>
  );
}
export default ModelJobSearch;
