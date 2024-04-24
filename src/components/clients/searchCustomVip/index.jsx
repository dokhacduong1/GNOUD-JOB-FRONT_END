import { Input, Select } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import "./searchCustomVip.scss";
import { removeAccents } from "../../../helpers/removeAccents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
function SearchCustomVip(props) {
  const { options =[], value = "", defaultValueOk="" } = props;

  const [items, setItems] = useState(options);

  //lần đầu vào sẽ set giá trị mặc định
  const onChange = (checkedValues) => {
    props.onChange(checkedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    //Đoạn này lần đầu vào sẽ set default value
    if (value === undefined) {
      props.onChange(defaultValueOk);
    }
    if(options.length > 0){
      setItems(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const handleSearch = useCallback(
    (inputSearch) => {
      const input = inputSearch.target.value;
      //Bắt đầu lọc các input nhập vào
      const filterOptions = options.filter(({ label, value }) => {
        return (
          removeAccents(label)
            .toLowerCase()
            .includes(removeAccents(input).toLowerCase()) ||
          removeAccents(value)
            .toLowerCase()
            .includes(removeAccents(input).toLowerCase())
        );
      });
      setItems(filterOptions);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [options]
  );
  return (
    <Select
    
      options={items}
      style={{ width: "100%" }}
      onChange={onChange}
      value={value}
      size="large"
      suffixIcon={<FontAwesomeIcon icon={faCaretDown} />}
      dropdownRender={(menu) => {
        return (
          <>
            <Input  className="search-custom-vip" onChange={handleSearch}></Input>
            <div className="box-item__search-custom">
              <span className="item">{menu}</span>
            </div>
           
          </>
        );
      }}
    />
  );
}
const MemoizedSearchCustomVip = memo(SearchCustomVip);
export default MemoizedSearchCustomVip;
