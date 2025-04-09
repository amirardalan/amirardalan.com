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
      className="flex items-center text-zinc-500 dark:text-zinc-400"
      aria-label="Share on X"
    >
      <IconX size={20} aria-hidden="true" />
      <span className="ml-2 text-xs">Share on X</span>
    </button>
  );
}
