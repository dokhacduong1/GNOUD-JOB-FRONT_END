import { useEffect, useState } from "react";
import "./rightChatBox.scss"
import { getCvApplyAccept } from "../../../services/employers/cvsApi";
import { Link } from "react-router-dom";
function RightChatBox() {
  const [cvApply, setCvApply] = useState([]);
  //Lấy danh sách cv đã được chấp nhận
  useEffect(() => {
    const fetchDataCvApply = async () => {
      const result = await getCvApplyAccept();
      if(result.code === 200){
        setCvApply(result.data);
      }
    };
    fetchDataCvApply();
  }, []);

  return <div className="right-chat px-4 pt-2">
    <div className="right-chat__header">
      <h4>ỨNG VIÊN KHÁC</h4>
      <div className="">Ứng tuyển vào tin tuyển dụng của bạn trong 7 ngày qua</div>
    </div>
    <div className="right-chat__body">
      <div className="list-cv">
        {cvApply.length > 0 && cvApply.map((item, index) => (
          <Link to={`/nha-tuyen-dung/app/chat-box/t/${item?._id}`} className="item-cv mt-3" key={index}>
            <div className="avatar">
              <img src={item?.avatar} alt="" />
            </div>
            <div className="info">
              <div className="name">{item?.fullName}</div>
              <div className="email-c">{item?.email}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>;
}
export default RightChatBox;
