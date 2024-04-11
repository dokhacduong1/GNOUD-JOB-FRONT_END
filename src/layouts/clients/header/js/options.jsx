import {
  faAddressCard,
  faFile,
  faHeart,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faDisplay,
  faLocationDot,
  faMagnifyingGlass,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const searchJob = [
  {
    label: (
      <Link
        className="item-ok"
       
        rel="noopener noreferrer"
        to={"/viec-lam/tat-ca-viec-lam"}
      >
        <div className="item-flex">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Việc làm mới nhất</span>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
    ),
    key: "/viec-lam/tat-ca-viec-lam",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a
        className="item-ok"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
      >
        <div className="item-flex">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>Ngành nghề / Địa điểm</span>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </a>
    ),
    key: "1",
  },
  
  {
    label: (
      <a
        className="item-ok"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
      >
        <div className="item-flex">
          <FontAwesomeIcon icon={faHeart} />
          <span>Việc làm đã lưu</span>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </a>
    ),
    key: "2",
  },

  {
    type: "divider",
  },
  {
    label: (
      <a
        className="item-ok"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
      >
        <div className="item-flex">
          <FontAwesomeIcon icon={faSquareCheck} />
          <span>Việc làm phù hợp</span>
          <div className="item-ok-hot">
            HOT
          </div>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </a>
    ),
    key: "3",
  },
  {
    label: (
      <a
        className="item-ok"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
      >
        <div className="item-flex">
          <FontAwesomeIcon icon={faDisplay} />
          <span>Việc làm IT</span>
          <div className="item-ok-new">
            MỚI
          </div>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </a>
    ),
    key: "4",
  },
  {
    label: (
      <a
        className="item-ok"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
      >
        <div className="item-flex">
          <FontAwesomeIcon icon={faAddressCard} />
          <span>Thực tập sinh</span>
          <div className="item-ok-new">
            MỚI
          </div>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </a>
    ),
    key: "5",
  },
];

export const searchCv = [
  {
    label: (
      <Link
        className="item-ok"
       
        rel="noopener noreferrer"
        to={"/cv/quan-ly-cv"}
      >
        <div className="item-flex">
        <FontAwesomeIcon icon={faFile} />
          <span>Quản lý CV</span>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
    ),
    key: "/cv/quan-ly-cv",
  },
  {
    label: (
      <Link
        className="item-ok"
       
        rel="noopener noreferrer"
        to={"/cv/upload-cv"}
      >
        <div className="item-flex">
        <FontAwesomeIcon icon={faUpload} />
          <span>Tải CV lên</span>
        </div>
        <div className="item-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
    ),
    key: "/cv/upload-cv",
  },
]