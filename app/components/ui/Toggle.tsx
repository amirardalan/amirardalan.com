'use client';
import Tooltip from '@/components/ui/Tooltip';
import { useState } from 'react';

export default function Toggle() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex align-middle">
      <Tooltip pos="r" text="Toggle Me">
        <button className="m-0 p-0">
          <label className="relative inline-flex cursor-pointer items-center align-top">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 transition-all duration-300 ease-in-out after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary dark:bg-gray-700 after:dark:bg-dark" />
          </label>
        </button>
      </Tooltip>
    </div>
  );
}
