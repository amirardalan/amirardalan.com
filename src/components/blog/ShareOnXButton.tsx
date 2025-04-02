import IconX from '@/components/icons/IconX';

export default function ShareOnXButton() {
  const handleShare = () => {
    const url = window.location.href;
    const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="ml-6 flex items-center text-zinc-500 dark:text-zinc-400"
    >
      <IconX size={20} />
      <span className="ml-3 text-xs uppercase">Share on X</span>
    </button>
  );
}
