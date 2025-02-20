import { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlined } from "@ant-design/icons";
import "./model-change-image.scss";

import { convertThumbUrl } from "../../../helpers/convertThumbUrl";
import { uploadAvatar } from "../../../services/clients/user-userApi";
import { CheckAuthClient } from "../../../helpers/checkAuthClient";
import { useDispatch } from "react-redux";
import { authenticationClient } from "../../../stores/clients/actions/auth";
import { handleFileChangeCustom } from "../../../helpers/imagesHelper";

function ModelChangeImage(props) {
  const { avatar } = props;
  const [message, setMessage] = useState("");

  const [isModal, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageChange, setImageChange] = useState(avatar);
  const [loadingButton, setLoadingButton] = useState(false);
  const dispatch = useDispatch();

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
    try {
      setLoadingButton(true);
      // const resizedImage = await resizeImage(fileList[0].originFileObj);
      const noResize = await handleFileChangeCustom(fileList[0].originFileObj);
      const base64Convert = await convertThumbUrl(noResize);
      const valueForm = {
        thumbUrl: base64Convert,
      };
      const result = await uploadAvatar(valueForm);
      if (result.code === 200) {
        setImageChange("");
        setFileList([]);
        //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
        const CheckAuth = await CheckAuthClient();
        dispatch(authenticationClient(true, CheckAuth.infoUser));
        changeModel();
      } else {
        setMessage(result.error);
      }

      setLoadingButton(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* //Do đoạn này ta truyển form và record lên ta sẽ không cần setDefaultForm nữa vì bên handleUpdateDataJobs đã setDefaultForm rồi */}
      <a onClick={changeModel} className="change-avatar" href="#!">
        <FontAwesomeIcon icon={faCamera} />
      </a>

      <Modal
        style={{}}
        className="text-center model-change-image"
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
          <div className="model-change-image__avatar col-8">
            <h4>Chọn ảnh</h4>
            <Upload
              listType="picture"
              maxCount={1}
              onChange={onChange}
              accept=".jpg,.jpeg,.png,.gif"
            >
              <button>
                {imageChange ? "Đổi ảnh đã chọn" : "Chọn ảnh tải lên"}
              </button>
            </Upload>
          </div>
          <div className="model-change-image__submit col-4">
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
