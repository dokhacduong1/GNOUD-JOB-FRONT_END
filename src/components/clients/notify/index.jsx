import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./notify.scss";
import { memo } from "react";
function NotifyClient({ children, noti }) {

  return (
    <>
      <div style={{margin:"10px 0"}} className={noti ? `box-notify-succes` : `box-notify-close`}>
        {noti ? (
          <div className="icon-succect">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ) : (
          <div className="icon-close">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}

        <div className="message">{children}</div>
      </div>
    </>
  );
}
const MemoizedNotifyClient = memo(NotifyClient);
export default MemoizedNotifyClient;
