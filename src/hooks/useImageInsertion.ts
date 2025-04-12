import { useState, useRef, useCallback } from 'react';
import { formatImage } from '@/utils/format-image';

interface CursorPosition {
  start: number;
  end: number;
}

export function useImageInsertion(
  content: string,
  setContent: (content: string) => void,
  closeGallery?: () => void
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

        // Store the desired cursor position before updating content
        const newCursorPosition = position.start + imageCode.length;

        // Update content
        setContent(newContent);

        // Set cursor position after React has updated the DOM
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
              newCursorPosition,
              newCursorPosition
            );
          }
        }, 0);
      } else {
        // Fallback to appending image to end of content
        setContent(`${content}\n${imageCode}`);
      }

      // Close the gallery modal if a callback was provided
      if (closeGallery) {
        closeGallery();
      }

      return true;
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
