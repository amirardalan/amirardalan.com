'use client';

import Button from '@/components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  confirmDisabled?: boolean;
}

export default function Modal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  confirmDisabled = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50/80 dark:bg-zinc-950/80">
      <div className="w-full max-w-md rounded-lg bg-light p-6 shadow-xl dark:bg-zinc-800">
        <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">
          {title}
        </h3>
        <p className="mb-6 text-sm text-zinc-700 dark:text-zinc-300">
          {message}
        </p>
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            onClick={onCancel}
            text="Cancel"
            variant="secondary"
          />
          <Button
            type="button"
            onClick={onConfirm}
            text={confirmText}
            disabled={confirmDisabled}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
}
