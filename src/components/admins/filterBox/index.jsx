import { Radio, Input } from "antd";
import "./filterBox.scss"
import { memo } from "react";

function FilterBox(props) {
    const { handleChange, handleSearch, optionsFilter } = props;
    const { Search } = Input;

    return (
        <>
            <div className="filterSearch filterBox box-card">
                <div className="card-header">
                    <h2 className="title-header"><i>Bộ Lọc Và Tìm Kiếm</i></h2>
                </div>
                <div className="card-body row justify-content-center align-items-center">
                    <div className="card-filter col-8">
                        <Radio.Group onChange={handleChange} defaultValue="" buttonStyle="solid">
                            {
                                optionsFilter?.length > 0 && (
                                    optionsFilter.map((data,index) => (
                                        <Radio.Button key={index} value={data.value}>{data.label}</Radio.Button>
                                    ))
                                )
                            }


           
                        </Radio.Group>
                    </div>
                    <div className="card-search col-4">
                        <Search
                            onSearch={handleSearch}
                            placeholder="Vui lòng nhập từ khóa..."
                            allowClear
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

const MemoizedFilterBox= memo(FilterBox);
export default MemoizedFilterBox;