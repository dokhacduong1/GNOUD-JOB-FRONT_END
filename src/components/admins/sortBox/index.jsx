import { Select } from "antd"

import "./sortBox.scss"
import { memo } from "react";
function SortBox(props) {
    const {options,handleChange} = props;

    return (
        <>
            <div className="sortBox box-card mt-3">
                <div className="card-header">
                    <h2 className="title-header"><i>Sắp Xếp</i></h2>
                </div>
                <div className="card-body row justify-content-center align-items-center">
                    <div className="card-filter col-12">
                        <Select
                        onChange={handleChange}
                            defaultValue="Tất Cả"
                            style={{
                                width: 200,
                            }}
                  
                            options={options}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

const MemoizedSortBox = memo(SortBox);
export default MemoizedSortBox;