import { getFullAddress } from "../../../../services/locations/locationsApi";

// Hàm loadCityDeletai nhận vào 3 tham số: setAddress (một hàm để set địa chỉ), selectAddress (địa chỉ đã chọn), và keyword (từ khóa tìm kiếm)
export const loadCityFull = async (setAddress, keyword) => {
    const objectNew = {
        input: keyword,
    }
    // Gọi hàm 
    const resultCity = await getFullAddress(objectNew);

    // Nếu mã trả về từ hàm getDetailedAddress là 200
    if (resultCity.code === 200) {
        // Tạo một mảng mới từ resultCity.data, chỉ lấy những phần tử mà description của chúng chứa ward, district, và city
        // Mỗi phần tử trong mảng mới sẽ là một object với value và label đều là description của phần tử đó
        let convertData = resultCity?.resultConvert.map((item) => ({ value: item?.description, label: item?.description }));
        // Nếu keyword không phải là chuỗi rỗng, thêm một object với value và label đều là keyword vào đầu mảng
        if (keyword !== "") {
            convertData = [{ value: keyword, label: keyword }, ...convertData];
        }
        // Gọi hàm setAddress với convertData
        setAddress(convertData);
    }
}