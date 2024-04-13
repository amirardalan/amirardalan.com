// Calculate estimated "read time"

const calculateReadTime = (content: string) => {
  const wpm = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  const readTime = time + ' ' + 'min read';
  return readTime;
};

export default calculateReadTime;
