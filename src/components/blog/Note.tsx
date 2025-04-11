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
    note: { icon: <IconNote />, label: 'Note' },
    tip: { icon: <IconTip />, label: 'Tip' },
    warn: { icon: <IconWarn />, label: 'Warning' },
  };

  const { icon, label } = noteConfig[noteType];

  return (
    <div className="note relative my-8 flex rounded-lg border border-zinc-300 dark:border-zinc-700">
      <div className="absolute left-4 top-2.5 text-xxs uppercase">
        <div className="mt-1.5 flex items-center gap-1">
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
