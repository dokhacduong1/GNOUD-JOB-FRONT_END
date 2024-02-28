import { memo } from "react";
import "./newsJobHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import banner from "./image/banner.png";
function NewsJobHeader() {
  return (
    <div className="news__job-header">
      <div className="box-item">
        <h1 className="title">Việc làm mới nhất</h1>
        <p className="description">Nâng tầm sự nghiệp với các cơ hội việc làm mới nhất tại các công ty hàng đầu. Thu nhập xứng tầm, đãi ngộ hấp dẫn, trải nghiệm đáng giá, khám phá ngay!</p>
        <div className="label-tag ">
            <label className="label-tag-remove">
                <FontAwesomeIcon icon={faCheck} />
                Tài chính
            </label>
            <label className="label-tag-remove">
                <FontAwesomeIcon icon={faCheck} />
                Kinh doanh
            </label>
            <label className="label-tag-remove">
                <FontAwesomeIcon icon={faCheck} />
                Marketing
            </label>
            <label className="label-tag-remove ">
                <FontAwesomeIcon icon={faCheck} />
                Nhân sự
            </label>
        </div>
      </div>
      <div className="box-iamge">
        <img src={banner} alt="banne-header" />
      </div>
    </div>
  );
}
const MemoizedNewsJobHeader = memo(NewsJobHeader);
export default MemoizedNewsJobHeader;
