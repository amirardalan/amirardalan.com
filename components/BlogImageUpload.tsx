import { FC, useState } from 'react';
import { css } from '@emotion/react';

interface BlogImageUploadProps {
  handleUpload: (file: File) => Promise<string>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const styleImageUploader = css({
  fontFamily: 'var(--font-secondary)',
  fontSize: 13,
  input: {
    marginLeft: '.5rem',
  },
});

const BlogImageUpload: FC<BlogImageUploadProps> = ({
  handleUpload,
  textareaRef,
}) => {
  const [selectedFile, setSelectedFile] = useState<{
    file: File | null;
    name: string | null;
  }>({ file: null, name: null });
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile({
        file: event.target.files[0],
        name: event.target.files[0].name,
      });
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile.file) {
      setIsUploading(true);
      const imageUrl = await handleUpload(selectedFile.file);
      setIsUploading(false);
      if (imageUrl && textareaRef.current) {
        const markdown = `\n![Uploaded image](${imageUrl})`;
        textareaRef.current.value = textareaRef.current.value + markdown;
      }
    }
  };

  return (
    <div>
      <label css={styleImageUploader}>
        Image:
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          className="buttonCompact"
          onClick={handleUploadClick}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </label>
    </div>
  );
};

export default BlogImageUpload;
