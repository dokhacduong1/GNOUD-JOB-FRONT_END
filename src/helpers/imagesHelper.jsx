import { convertFileToBase64 } from "./convertThumbUrl";

   //Sử lý file ảnh
export const handleFileChange = async (e,setFileImage,api) => {
    // Access the selected file using e.target.files[0]
    const file = e.target.files[0];

    if (file) {
        try {
            //Chuyển file vừa nhận về dạng base64
            const base64 = await convertFileToBase64(file);
            setFileImage(base64);
        } catch (error) {
            api.error({
                message: <span style={{ color: "red" }}>Failed</span>,
                description: (
                    <>
                        <i>Không Thể Convert Ảnh Sang Dạng base64!</i>
                    </>
                ),
            });
        }
    }
};
export const handleFileChangeCustom = async (files) => {
    // Access the selected file using e.target.files[0]
    const file = files;

    if (file) {
        try {
            //Chuyển file vừa nhận về dạng base64
            const base64 = await convertFileToBase64(file);
            return base64;
        } catch (error) {
          return "";
        }
    }
};
  //Hàm chỉnh kích thước ảnh thành 200x200px
export const resizeImage = (file,width,height) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const base64Image = canvas.toDataURL(file.type);
         resolve(base64Image);
        };
      };
    });
  };