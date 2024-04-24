import moment from "moment";
import banner from "./images/banner.png"
function InfoProfileUser({ record}) {

    //lấy phone và email từ props nếu đã xác nhận thì mới hiển thị
  return (
    <div className="contact-infomation ">
      <div className="title mb-3">CONTACT INFOMATION</div>
      <div className="content  mb-3">
        <div className="phone">
          <span>Số điện thoại: </span>
          <span>{record?.phone || "Thông tin chưa cập nhật"}</span>
        </div>
        <div className="address">
          <span>Địa chỉ: </span>
          {record?.address?.district && record?.address?.city ? (
            <span>
              {record?.address?.district.split("/")[1] +
                ", " +
                record?.address?.city.split("/")[1] || ""}
            </span>
          ) : (
            "Thông tin chưa cập nhật"
          )}
        </div>
        <div className="email-c">
          <span>Email: </span>
          <span>{record?.email || "Thông tin chưa cập nhật"}</span>
        </div>
        <div className="job-categories">
          <span>Nghề nghiệp: </span>
          <span>{record?.job_categorie_id?.title || "Thông tin chưa cập nhật"}</span>
        </div>
      </div>
      <div className="title mb-3">BASIC INFOMATION</div>
      <div className="content mb-3">
        <div className="birthday">
          <span>Ngày sinh: </span>
          <span>{ moment(record.dateOfBirth).format("DD MMM YYYY") || "Thông tin chưa cập nhật"}</span>
        </div>
        <div className="gender">
          <span>Giới tính: </span>
          <span>{ (record?.gender=== 1 ? "Nam" : "Nữ") || "Không xác định"}</span>
        </div>
      </div>
      <div className="title mb-3">SHORT DESCRIPTION</div>
      <div className="short-des mb-3">
        <div className="dest">
          <span>{record?.description || "Thông tin chưa cập nhật"}</span>
        </div>
      </div>
      <div className="banner">
            <img src={banner} alt="" />
      </div>
    </div>
  );
}
export default InfoProfileUser;
