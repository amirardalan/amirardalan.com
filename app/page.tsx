'use client';

import HomeContent from '@/components/content/HomeContent';
import TerrainCanvas from '@/components/content/TerrainCanvas';

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh-52px)] flex-1 overflow-hidden md:h-[calc(100vh-85px)]">
      <TerrainCanvas />
      <HomeContent />
    </div>
  );
}
