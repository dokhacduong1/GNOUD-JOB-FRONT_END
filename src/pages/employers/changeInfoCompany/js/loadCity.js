

import { geAreaDetail, getDetailedAddress } from "../../../../services/locations/locationsApi";

export const loadCity = async (setAddress, keyword) => {
    if (!keyword) return;
    
    const objectNew = {
        keyword: keyword,
    };
    const resultCity = await geAreaDetail(objectNew);
    if (resultCity.code === 200) {
        const convertData = resultCity.data
            .filter(item => item?.ward?.value && item?.district?.value && item?.city?.value)
            .map(item => ({
                value: `${item?.ward?.value || ""}, ${item?.district?.value || ""}, ${item?.city?.value || ""}`,
                label: `${item?.ward?.value || ""}, ${item?.district?.value || ""}, ${item?.city?.value || ""}`
            }));
    
        setAddress(convertData);
    }
}

// Hàm loadCityDeletai nhận vào 3 tham số: setAddress (một hàm để set địa chỉ), selectAddress (địa chỉ đã chọn), và keyword (từ khóa tìm kiếm)
export const loadCityDeletai = async (setAddress, selectAddress, keyword) => {
    // Nếu không có địa chỉ đã chọn, hàm sẽ kết thúc ngay lập tức
    if (!selectAddress) return;
  
    // Tách địa chỉ đã chọn thành các phần tử ward, district, city và loại bỏ khoảng trắng ở đầu và cuối mỗi phần tử
    const [ward, district, city] = selectAddress.split(',').map(item => item.trim());
    // Nếu không có ward, district, hoặc city, hàm sẽ kết thúc ngay lập tức
    if (!ward || !district || !city) return;
  
    // Gọi hàm getDetailedAddress với object chứa ward, district, city, và keyword
    const resultCity = await getDetailedAddress({ ward, district, city, keyword });
  
    // Nếu mã trả về từ hàm getDetailedAddress là 200
    if (resultCity.code === 200) {
      // Tạo một mảng mới từ resultCity.data, chỉ lấy những phần tử mà description của chúng chứa ward, district, và city
      // Mỗi phần tử trong mảng mới sẽ là một object với value và label đều là description của phần tử đó
      let convertData = resultCity.data
        .filter(item => item.description.includes(ward) && item.description.includes(district) && item.description.includes(city))
        .map(item => ({ value: item.description + "-"+ item?.id, label: item.description }));
  
      // Nếu keyword không phải là chuỗi rỗng, thêm một object với value và label đều là keyword vào đầu mảng
      if (keyword !== "") {
        convertData = [{ value: keyword, label: keyword }, ...convertData];
      }
  
      // Gọi hàm setAddress với convertData
      setAddress(convertData);
    }
  }