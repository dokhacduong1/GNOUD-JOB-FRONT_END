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