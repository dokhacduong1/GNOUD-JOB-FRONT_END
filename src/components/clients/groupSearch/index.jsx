import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./groupSearch.scss";
import {
  faBuilding,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import MemoizedSearchCustomVip from "../searchCustomVip";
import { useEffect, useRef, useState } from "react";
import { getCityApiDuong } from "../../../services/clients/user-userApi";
function GroupSearch({ onValueChange,valueCity="",valueKeyword="" }) {
  const [options, setOptions] = useState([]);
  const keywordRef = useRef("");
  useEffect(() => {
    keywordRef.current.value = valueKeyword;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [value, setValue] = useState(valueCity);
  const handleChangeSelect = (value) => {
    const keyword = keywordRef.current.value || "";

    if (onValueChange) {
      onValueChange({
        keyword,
        city: value,
      });
    }
    setValue(value);
  };
  const handleChangeInput = () => {
    const keyword = keywordRef.current.value || "";
    if (onValueChange) {
      onValueChange({
        keyword,
        city: value,
      });
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCityApiDuong();
      if (result?.code === 200) {
        const convertData = result?.data.map((item) => {
          return {
            label: item.name,
            value: item.slug,
          };
        });
        convertData.unshift({
          label: "Tất cả địa điểm",
          value: "",
        });
        setOptions(convertData);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="group-search">
      <div className="item item-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
        
        defaultValue={keywordRef}
          onChange={handleChangeInput}
          ref={keywordRef}
          type="text"
          placeholder="Vị trí tuyển dụng"
        />
      </div>
      <div className="item search-city">
        <FontAwesomeIcon icon={faLocationDot} />
        <MemoizedSearchCustomVip
          defaultValue={value}
          prefix={<FontAwesomeIcon icon={faBuilding} />}
          options={options}
          defaultValueOk={""}
          value={value}
          onChange={handleChangeSelect}
        />
      </div>
    </div>
  );
}
export default GroupSearch;
