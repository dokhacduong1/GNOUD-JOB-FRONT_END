import "./notFound.scss";
import image from "./images/image.png";
import { Link } from "react-router-dom";
import { memo } from "react";
function NotFound() {
  return (
    <div className="cb-section not-found-employer">
      <div className="not-found-ok">
          <h1 className="content">
            <Link to="/nha-tuyen-dung"><span>404 NOT FOUND</span></Link>
            <img src={image} alt="404" />
          
          </h1>
         
      </div>
     
    </div>
  );
}
const MemoizedNotFound = memo(NotFound);
export default MemoizedNotFound;
