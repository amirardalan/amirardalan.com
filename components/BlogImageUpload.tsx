import { FC, useState, useRef } from 'react';
import { css } from '@emotion/react';

interface BlogImageUploadProps {
  uploadImage: (file: File) => Promise<string>;
  onUploadSuccess: (url: string) => void;
}

const styleImageUploader = css({
  fontFamily: 'var(--font-secondary)',
  fontSize: 13,
  input: {
    marginLeft: '.5rem',
  },
});

const BlogImageUpload: FC<BlogImageUploadProps> = ({
  uploadImage,
  onUploadSuccess,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageUpload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const selectedFile = selectedFileRef.current?.files?.[0];
    if (selectedFile) {
      setIsUploading(true);
      try {
        const url = await uploadImage(selectedFile);
        onUploadSuccess(url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      <label css={styleImageUploader}>
        Image:
        <input
          type="file"
          accept="image/*"
          onChange={() => {}}
          ref={selectedFileRef}
        />
        <button
          className="buttonCompact"
          onClick={handleImageUpload}
          disabled={!selectedFileRef.current || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </label>
    </div>
  );
};

export default BlogImageUpload;
