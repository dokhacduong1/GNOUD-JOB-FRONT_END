import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

const TinyMce = forwardRef(function TinyMce({ value, height = 500 }, ref) {

  const [editorContent, setEditorContent] = useState('');

  const editorRef = useRef(null);
  useEffect(() => {
    if (value) {
      setEditorContent(value)
    }
  }, [value]);
 
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
        images_upload_url: "http://localhost:2709/api/v1/admin/uploads/image",
        height: height,
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

TinyMce.displayName = 'TinyMce';

const MemoizedTinyMce= memo(TinyMce);
export default MemoizedTinyMce;