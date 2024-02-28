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
 export function formatTimeDifferenceMongoDb(mongodbTime) {
    var timeDate = new Date(mongodbTime);
    var now = new Date();
    var diffMilliseconds = now - timeDate;
    var diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    
    if (diffMinutes < 60) {
        return diffMinutes + " phút";
    } else if (diffMinutes < (60 * 24)) {
        var diffHours = Math.floor(diffMinutes / 60);
        return diffHours + " giờ";
    } else if (diffMinutes < (60 * 24 * 30)) {
        var diffDays = Math.floor(diffMinutes / (60 * 24));
        return diffDays + " ngày";
    } else if (diffMinutes < (60 * 24 * 30 * 12)) {
        var diffMonths = Math.floor(diffMinutes / (60 * 24 * 30));
        return diffMonths + " tháng";
    } else {
        var diffYears = Math.floor(diffMinutes / (60 * 24 * 30 * 12));
        return diffYears + " năm";
    }
}
export function formatTimeRemainingMongoDb(mongodbTime) {
  var targetDate = new Date(mongodbTime);
  var now = new Date();
  var diffMilliseconds = targetDate - now;

  // Tính số giờ còn lại
  var diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));

  if (diffHours < 24) {
      return diffHours + " giờ";
  } else {
      // Tính số ngày còn lại
      var diffDays = Math.floor(diffHours / 24);
      
      if (diffDays <= 30) {
          return diffDays + " ngày";
      } else if (diffDays <= 365) {
          var diffMonths = Math.floor(diffDays / 30);
          return diffMonths + " tháng";
      } else {
          var diffYears = Math.floor(diffDays / 365);
          return diffYears + " năm";
      }
  }
}

//Tính toán ngày làm việc đầu vào sẽ là ngày muốn tính hàm này sẽ tính ngày làm việc và bỏ qua ngày nghỉ cuối tuần gồm (Thứ 7 và Chủ Nhật)
export function addWorkingDates(fromDate, days) {
    var count = 0;
    while (count < days) {
      fromDate.setDate(fromDate.getDate() + 1);
      if (fromDate.getDay() != 0 && fromDate.getDay() != 6)
        // Skip weekends
        count++;
    }
    return fromDate;
  }
  
//   addWorkingDates(new Date(),5)