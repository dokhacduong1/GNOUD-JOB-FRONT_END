export const convertThumbUrl = (data)=>{
    if(data){
        return data.split("base64,")[1];
    }
    return "";
}
export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };