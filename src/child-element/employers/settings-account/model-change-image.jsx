import { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlined } from "@ant-design/icons";
import "./model-change-image.scss";

import { convertThumbUrl } from "../../../helpers/convertThumbUrl";

import { useDispatch } from "react-redux";

import { handleFileChangeCustom } from "../../../helpers/imagesHelper";
import { UpdateDataAuthEmployer } from "../../../update-data-reducer/employers/updateDataEmployers";
import { uploadAvatarEmployer } from "../../../services/employers/employer-userApi";

function ModelChangeImage(props) {
  const { avatar } = props;

  const [isModal, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageChange, setImageChange] = useState(avatar);
  const [loadingButton, setLoadingButton] = useState(false);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const onChange = ({ fileList }) => {
    if (fileList.length === 0) return;

    const file = fileList[0].originFileObj;

    // Kiểm tra xem file có phải là ảnh hay không
    if (!file.type.startsWith("image/")) {
      setMessage("Vui lòng chọn một file ảnh!");

      setFileList([]); // Xóa file khỏi danh sách
      return;
    }
    setMessage("");
    // Nếu là ảnh, tiếp tục xử lý
    const imageUrl = URL.createObjectURL(file);
    setImageChange(imageUrl);
    setFileList(fileList);
  };
  const changeModel = () => {
    setIsModalOpen(!isModal);
  };
  const deleteImage = () => {
    if (imageChange === "") return;
    setImageChange("");
    setFileList([]);
  };

  const submitForm = async () => {
    if (fileList.length === 0) return;

    setLoadingButton(true);
    // const resizedImage = await resizeImage(fileList[0].originFileObj);
    const noResize = await handleFileChangeCustom(fileList[0].originFileObj);
    const base64Convert = await convertThumbUrl(noResize);
    const valueForm = {
      thumbUrl: base64Convert,
    };
    const result = await uploadAvatarEmployer(valueForm);
    if (result.code === 200) {
      setImageChange("");
      setFileList([]);
      await UpdateDataAuthEmployer(dispatch);
      changeModel();
    }else{
      setMessage(result.error);
    }
    setLoadingButton(false);
  };
  return (
    <div>
      {/* //Do đoạn này ta truyển form và record lên ta sẽ không cần setDefaultForm nữa vì bên handleUpdateDataJobs đã setDefaultForm rồi */}
      <a onClick={changeModel} className="change-avatar-employer" href="#!">
        <FontAwesomeIcon icon={faCameraRetro} />
        <span>Đổi Avatar</span>
      </a>

      <Modal
        style={{}}
        className="text-center model-change-image-employer"
        title={
          <span>
            <strong>CHỈNH SỬA ẢNH ĐẠI DIỆN</strong>
          </span>
        }
        open={isModal}
        onCancel={changeModel}
        footer={null}
      >
        {message !== "" && (
          <div style={{ marginBottom: "5px", color: "red" }}>{message}</div>
        )}
        <div className="row align-items-center justify-content-center gx-5">
          <div className="model-change-image-employer__avatar col-8">
            <h4>Chọn ảnh</h4>
            <Upload listType="picture" maxCount={1} onChange={onChange}  accept=".jpg,.jpeg,.png,.gif">
              <button>
                {imageChange ? "Đổi ảnh đã chọn" : "Chọn ảnh tải lên"}
              </button>
            </Upload>
          </div>
          <div className="model-change-image-employer__submit col-4">
            <h4>Ảnh đại diện</h4>
            <div className="image">
              <img src={imageChange !== "" ? imageChange : avatar} alt="ok" />
              <DeleteOutlined onClick={deleteImage} />
            </div>

            <Button
              loading={loadingButton}
              disabled={imageChange ? false : true}
              onClick={submitForm}
            >
              Lưu
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ModelChangeImage;
