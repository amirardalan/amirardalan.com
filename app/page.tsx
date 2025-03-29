'use client';

import HomeContent from '@/components/content/HomeContent';
import CanvasLoader from '@/components/content/CanvasLoader';

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh-160px)] flex-1">
      <CanvasLoader />
      <HomeContent />
    </div>
  );
}
