import { Input } from "antd";
import "./filterDropdownCustom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
function FilterDropdownCustom(props) {
  const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;
  return (
    <div className="custom-filter-dropdown">
        <div className="title mb-1">
            Tìm kiếm nhanh
        </div>
      <div className="custom-filter-dropdown__input mb-3">
        <Input
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
        />
      </div>
      <div className="custom-filter-dropdown__button">
        <button className="search-t" onClick={confirm}>
          Tìm kiếm
        </button>
        <button
          className="reset-t"
          onClick={() => {
            clearFilters();
            confirm();
          }}
        >
          Hoàn tác
        </button>
      </div>
    </div>
  );
}
const MemoizedFilterDropdownCustom = memo(FilterDropdownCustom);
export default MemoizedFilterDropdownCustom;
