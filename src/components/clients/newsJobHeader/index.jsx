import { memo } from "react";
import "./newsJobHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import banner from "./image/banner.png";
function NewsJobHeader({ title, description, listTag = [] }) {
  

  return (
    <div className="news__job-header">
      <div className="box-item">
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
        <div className="label-tag ">
          {listTag.length > 0 &&
            listTag.map((item, index) => (
              <label key={index} className="label-tag-remove">
                <FontAwesomeIcon icon={faCheck} />
                {item.name}
              </label>
            ))}
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
