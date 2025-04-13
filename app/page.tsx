'use client';

import HomeContent from '@/components/content/HomeContent';
import TerrainCanvas from '@/components/content/TerrainCanvas';

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh-85px)] flex-1 overflow-hidden">
      <TerrainCanvas />
      <HomeContent />
    </div>
  );
}
