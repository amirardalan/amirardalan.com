'use client';

import HomeContent from '@/components/content/HomeContent';
import CanvasLoader from '@/components/content/CanvasLoader';

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh-85px)] flex-1 overflow-hidden">
      <CanvasLoader />
      <HomeContent />
    </div>
  );
}
