import { FC, useState } from 'react';

interface BlogImageUploadProps {
  handleUpload: (file: File) => Promise<string>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const BlogImageUpload: FC<BlogImageUploadProps> = ({
  handleUpload,
  textareaRef,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      setIsUploading(true);
      const imageUrl = await handleUpload(selectedFile);
      setIsUploading(false);
      if (imageUrl && textareaRef.current) {
        const markdown = `\n![Uploaded image](${imageUrl})`;
        textareaRef.current.value = textareaRef.current.value + markdown;
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUploadClick}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default BlogImageUpload;
