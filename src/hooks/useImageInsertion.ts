import { useState, useRef, useCallback } from 'react';
import { formatImage } from '@/utils/format-image';

interface CursorPosition {
  start: number;
  end: number;
}

export function useImageInsertion(
  content: string,
  setContent: (content: string) => void,
  closeGallery?: () => void // Add optional callback to close the gallery modal
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null!);
  const [cursorPosition, setCursorPosition] = useState<
    CursorPosition | undefined
  >(undefined);

  const handleTextAreaSelect = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      setCursorPosition({
        start: target.selectionStart,
        end: target.selectionEnd,
      });
    },
    []
  );

  const insertImageAtCursor = useCallback(
    (url: string, position?: CursorPosition) => {
      const imageCode = formatImage(url);

      if (position && position.start >= 0) {
        const newContent =
          content.substring(0, position.start) +
          imageCode +
          content.substring(position.end);

        setContent(newContent);

        // Set cursor after the inserted image code
        setTimeout(() => {
          if (textareaRef.current) {
            const newPosition = position.start + imageCode.length;
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(newPosition, newPosition);
          }
        }, 0);
      } else {
        // Fallback to appending at the end
        setContent(`${content}\n${imageCode}`);
      }

      // Close the gallery modal if a callback was provided
      if (closeGallery) {
        closeGallery();
      }

      return true; // Return true to indicate successful insertion
    },
    [content, setContent, closeGallery]
  );

  return {
    textareaRef,
    cursorPosition,
    handleTextAreaSelect,
    insertImageAtCursor,
  };
}
