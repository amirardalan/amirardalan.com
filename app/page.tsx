'use client';

import HomeContent from '@/components/content/HomeContent';
import CanvasLoader from '@/components/content/CanvasLoader';

export default function Home() {
  return (
    <div
      className="relative flex flex-1"
      style={{ height: 'calc(100vh - 160px)' }}
    >
      <div className="absolute inset-0">
        <CanvasLoader />
      </div>
      <HomeContent />
    </div>
  );
}
