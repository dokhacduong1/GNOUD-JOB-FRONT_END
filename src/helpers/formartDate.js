export function formatDate(dateTimeString) {
    const dateObject = new Date(dateTimeString);
  
    // Lấy ngày, tháng, năm từ đối tượng Date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = dateObject.getDate();
  
    // Tạo định dạng ngày tháng năm
    const formattedDate = `${year}/${month}/${day}`;
  
    return formattedDate;
  }