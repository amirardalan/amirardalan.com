import { FC, useState } from 'react';
import { css } from '@emotion/react';
import { uploadImage } from '@/lib/blog';

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

  const handleImageUpload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (selectedFile.file) {
      setIsUploading(true);
      try {
        const url = await uploadImage(selectedFile.file);
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          className="buttonCompact"
          onClick={handleImageUpload}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </label>
    </div>
  );
};

export default BlogImageUpload;
