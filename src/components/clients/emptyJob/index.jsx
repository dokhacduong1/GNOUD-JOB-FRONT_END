import imageEmpty from "./images/empty.png";
import "./emptyJob.scss";
function EmptyJob() {
  return (
    <div className="empty">
      <div className="image-empty mb-2">
        <img src={imageEmpty} alt="empty apply" />
      </div>
      <h3 className="title">Bạn chưa ứng tuyển công việc nào!</h3>
      <div className="caption">
        <p>Bạn chưa ứng tuyển công việc nào!</p>
        <p>
          Bắt đầu sự nghiệp mơ ước với hàng nghìn việc làm chất lượng tại TopCV
        </p>
      </div>
      <div className="button-empty">
        <a href="#!">Tìm việc ngay</a>
      </div>
    </div>
  );
}
export default EmptyJob;
