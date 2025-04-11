import { ReactNode } from 'react';
import IconNote from '@/components/icons/IconNote';
import IconTip from '@/components/icons/IconTip';
import IconWarn from '@/components/icons/IconWarn';

type NoteType = 'note' | 'tip' | 'warn';

interface NoteProps {
  children: ReactNode;
  noteType?: NoteType;
}

export default function Note({ children, noteType = 'note' }: NoteProps) {
  const noteConfig = {
    note: {
      icon: <IconNote />,
      label: 'Note',
      color:
        'text-blue-500 fill-blue-500 dark:text-blue-400 dark:fill-blue-400',
    },
    tip: {
      icon: <IconTip />,
      label: 'Tip',
      color:
        'text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400',
    },
    warn: {
      icon: <IconWarn />,
      label: 'Warning',
      color: 'text-red-500 fill-red-500 dark:text-red-400 dark:fill-red-400',
    },
  };

  const { icon, label, color } = noteConfig[noteType];

  return (
    <div className="note relative my-8 flex rounded-lg border border-zinc-300 dark:border-zinc-700">
      <div className="absolute left-4 top-2.5 text-xxs uppercase">
        <div className={`mt-1.5 flex items-center gap-1 ${color}`}>
          <div className="h-4 w-4">{icon}</div>
          <div>{label}</div>
        </div>
      </div>
      <div className="mt-4 items-center justify-between px-4 pt-1">
        <div className="italic">{children}</div>
      </div>
    </div>
  );
}
