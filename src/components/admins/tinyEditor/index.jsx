import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DOMAIN } from '../../../utils/api-domain';

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
      apiKey='y33vw6bkvk5hh4dihg8cankmcrgrjm9hoy9z79w8p6a26z0v'
      value={editorContent}
      init={{
        images_upload_url: `${DOMAIN}/api/v1/admin/uploads/image`,
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