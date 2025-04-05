import Button from '@/components/ui/Button';

interface PostFormControlsProps {
  isSubmitting: boolean;
  isDeleting?: boolean;
  showDiscard?: boolean;
  showDelete?: boolean;
  onDiscard?: () => void;
  onDelete?: () => void;
  onSubmitText: string;
  onDeleteText?: string;
  disableDelete?: boolean;
}

export default function PostFormControls({
  isSubmitting,
  isDeleting = false,
  showDiscard = false,
  showDelete = false,
  onDiscard,
  onDelete,
  onSubmitText,
  onDeleteText,
  disableDelete = false,
}: PostFormControlsProps) {
  return (
    <div className="flex justify-end space-x-2">
      {showDelete && onDelete && onDeleteText && (
        <Button
          type="button"
          onClick={onDelete}
          text={isDeleting ? 'Deleting...' : onDeleteText}
          disabled={isDeleting || isSubmitting || disableDelete}
          variant="danger"
        />
      )}
      {showDiscard && onDiscard && (
        <Button
          type="button"
          onClick={onDiscard}
          text="Discard"
          variant="danger"
        />
      )}
      <Button
        type="submit"
        text={isSubmitting ? `${onSubmitText}...` : onSubmitText}
        disabled={isSubmitting || isDeleting}
      />
    </div>
  );
}
