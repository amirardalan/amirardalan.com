'use client';

import HomeContent from '@/components/content/HomeContent';
import Tooltip from '@/components/ui/Tooltip';
import CanvasLoader from '@/components/content/CanvasLoader';

export default function Home() {
  return (
    <main className="relative flex items-baseline justify-center overflow-hidden">
      <div className="pointer-events-auto absolute inset-0 z-10">
        <Tooltip pos="cursor" text="Randomize terrain">
          <CanvasLoader />
        </Tooltip>
      </div>

      <HomeContent />
    </main>
  );
}
