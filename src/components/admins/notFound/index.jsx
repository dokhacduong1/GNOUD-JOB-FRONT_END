import { memo } from "react";
import "./notFound.scss";

function NotFound() {
  return (
    <div className="not-found">
      <h1>401</h1>
      <h2>Bạn Không Có Quyền Truy Cập Vào Trang Này</h2>
    </div>
  );
}

const MemoizedNotFound = memo(NotFound);
export default MemoizedNotFound;