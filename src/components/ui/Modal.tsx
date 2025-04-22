import Button from '@/components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  confirmDisabled?: boolean;
  children?: React.ReactNode;
  buttons?: 'both' | 'cancel' | 'confirm';
  leftButton?: React.ReactNode;
}

export default function Modal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  confirmDisabled = false,
  children,
  buttons = 'both',
  leftButton,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50/80 dark:bg-zinc-950/80"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-lg bg-light p-6 shadow-xl dark:bg-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-light">
          {title}
        </h3>
        <p className="mb-6 text-sm text-zinc-700 dark:text-zinc-300">
          {message}
        </p>
        {children && <div className="mb-6">{children}</div>}{' '}
        <div className="flex justify-end space-x-3">
          <div>{leftButton}</div>
          <div className="flex space-x-3">
            {(buttons === 'both' || buttons === 'cancel') && (
              <Button
                type="button"
                onClick={onCancel}
                text={buttons === 'cancel' ? 'Close' : 'Cancel'}
                variant="secondary"
              />
            )}
            {buttons !== 'cancel' && (
              <Button
                type="button"
                onClick={onConfirm}
                text={confirmText}
                disabled={confirmDisabled}
                variant={buttons === 'both' ? 'danger' : 'primary'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
