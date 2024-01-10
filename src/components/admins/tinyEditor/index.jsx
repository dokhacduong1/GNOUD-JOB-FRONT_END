import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const TinyMce = forwardRef((props, ref) => {

  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef(null);
  useEffect(() => {
    //Nếu có nội dung truyền vào thì coi như người dùng đang chỉnh sửa
    if (props?.value) {
      setEditorContent(props.value)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  useImperativeHandle(ref, () => ({
    getContent: () => {
      return editorContent;
    },
  }), [editorContent]);

  return (
    <Editor
      onInit={(evt, editor) => editorRef.current = editor}
      apiKey='9yecvyh5m7fyb3z4mofetyifuc2ktpz5de78j55h483do465'

      value={editorContent}
      init={{
        images_upload_url: "http://localhost:3001/api/v1/uploads/image",
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
          'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
          'media', 'table', 'emoticons', 'template', 'help'
        ],
        toolbar: 'undo redo | styles | fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
      }}
      onEditorChange={(content) => setEditorContent(content)}
    />
  );
});

export default TinyMce;
